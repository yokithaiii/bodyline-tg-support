<script setup lang="ts">
import { BodyModalEmail } from '#components';

const drawerContent = useDrawer();

const openModalEmail = () => {
	useModal().open(BodyModalEmail, {
		title: 'Смена почты',
		descr: ' Укажите новую почту:',
	});
};
</script>

<template>
	<section class="l-index">
		<div class="bg-emerald-100 dark:bg-zinc-800 rounded-[8px] mt-1">
			<div class="l-wrapper">
				<div class="py-4">
					<h1 class="text-3xl">
						Здравствуйте<span class="text-emerald-400">!</span>
						<br />
						Чем мы можем вам помочь<span class="text-emerald-400">?</span>
					</h1>

					<div v-if="useStore().value.email" class="mt-2">
						<span class="text-[14px]"
							>Указанная почта:
							<span class="text-emerald-400" @click="openModalEmail">
								{{ useStore().value.email }}
							</span>
						</span>
					</div>

					<main-buttons />
				</div>
			</div>
		</div>

		<UDrawer v-model:open="drawerContent.isOpen">
			<template #content>
				<article class="my-4 h-screen overflow-y-auto">
					<div class="py-4">
						<template v-if="drawerContent.state === 'access'"> dsadsa </template>

						<template v-else-if="drawerContent.state === 'marathon'"> marathon </template>

						<template v-else-if="drawerContent.state === 'qa'"> qa </template>

						<template v-else-if="drawerContent.state === 'ask'"> ask </template>
					</div>
				</article>
			</template>
		</UDrawer>
	</section>
</template>
