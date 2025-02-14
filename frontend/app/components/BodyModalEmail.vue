<script setup lang="ts">
import { useWebAppCloudStorage } from 'vue-tg';

const cloudStorage = useWebAppCloudStorage();
const modal = useModal();
const store = useStore();
const drawerContent = useDrawer();

const props = withDefaults(defineProps<{ title: string; descr?: string; state?: string }>(), {
	descr: 'Для начала напишите ваш email:',
	state: 'base',
});

const states = reactive({
	email: '',
	loading: false,
	errorText: null as null | string,
});

const isNotValidEmail = computed(() => {
	const email = states.email.trim();
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	return !emailRegex.test(email);
});

async function setEmailUser(val: string) {
	try {
		await cloudStorage.setStorageItem('user_email', val);
	} catch (err) {
		store.value.email = val;
		console.error(err);
	}
}

const handleEmail = async () => {
	if (isNotValidEmail.value) {
		return;
	}

	setEmailUser(states.email.trim());
	if (drawerContent.value.state === 'access' || drawerContent.value.state === 'ask' || drawerContent.value.state === 'marathon') {
		await modal.close();

		setTimeout(() => {
			drawerContent.value.isOpen = true;
		}, 500);
	}
};

const handleAcceptChange = () => {
	setEmailUser(states.email.trim());
	modal.close();
};
</script>

<template>
	<UModal
		:title="props.title"
		:close="{
			color: 'neutral',
			variant: 'solid',
		}"
	>
		<template #body>
			<article>
				<header>
					<span>{{ props.descr }} </span>
				</header>

				<main class="py-4">
					<template v-if="states.loading">
						<div class="w-full flex justify-center">
							<div class="spinner" />
						</div>
					</template>

					<template v-else-if="states.errorText !== null">
						<span class="text-red-400">{{ states.errorText }}</span>
						<UButton class="mt-2 block" @click="states.errorText = null">Попробовать еще</UButton>
					</template>
					<template v-else>
						<UInput v-model="states.email" placeholder="Введите ваш email" class="w-full flex" />
						<span v-if="isNotValidEmail && states.email.trim() !== ''" class="text-red-400 text-[12px]">
							Некорректный email
						</span>

						<UButton v-if="props.state === 'email'" class="mt-2 block" :disabled="isNotValidEmail" @click="handleAcceptChange">
							Принять
						</UButton>
						<UButton v-else class="mt-2 block" :disabled="isNotValidEmail" @click="handleEmail">Поиск</UButton>
					</template>
				</main>
			</article>
		</template>
	</UModal>
</template>
