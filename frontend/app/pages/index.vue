<script setup lang="ts">
import { BodyModalEmail } from '#components';
import { useWebApp } from 'vue-tg';

const tma = useWebApp();
const drawerContent = useDrawer();

const openModalEmail = () => {
	useModal().open(BodyModalEmail, {
		title: 'Смена почты',
		descr: ' Укажите новую почту:',
		state: 'email',
	});
};
</script>

<template>
	<section class="l-index">
		<div class="bg-emerald-100 dark:bg-zinc-800 rounded-[8px] mt-1">
			<div class="l-wrapper">
				<div class="py-4">
					<h1 class="text-2xl">
						Здравствуйте
						<span v-if="tma.initDataUnsafe">
							{{ tma.initDataUnsafe?.user?.username }}
						</span>

						<span class="text-emerald-400">!</span>
						<br />
						Чем мы можем вам помочь<span class="text-emerald-400">?</span>
					</h1>

					<div v-if="useStore().value.email" class="mt-2">
						<span class="text-[14px]"
							>Указанная почта:
							<span class="text-emerald-400" @click="openModalEmail">
								{{ useStore().value.email }}
							</span>
							- тыкните чтобы изменить
						</span>
					</div>

					<main-buttons />
				</div>
			</div>
		</div>

		<UDrawer v-model:open="drawerContent.isOpen">
			<template #content>
				<article class="my-4 px-2 h-screen overflow-y-auto">
					<template v-if="drawerContent.state === 'access'">
						<action-get-access />
					</template>

					<template v-else-if="drawerContent.state === 'marathon'">
						<action-get-marathon />
					</template>

					<template v-else-if="drawerContent.state === 'qa'">
						<action-get-faq />
					</template>

					<template v-else-if="drawerContent.state === 'ask'">
						<action-request-question />
					</template>
				</article>
			</template>
		</UDrawer>
	</section>
</template>
