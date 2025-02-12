<script setup lang="ts">
const modal = useModal();
const store = useStore();
const drawerContent = useDrawer();

const props = withDefaults(defineProps<{ title: string; descr?: string }>(), {
	descr: 'Для начала напишите ваш email:',
});

const states = reactive({
	email: '',
	loading: false,
	errorText: null as null | string,
});

const isNotValidEmail = ref(false);

const handleEmail = async () => {
	isNotValidEmail.value = false;
	const email = states.email.trim();

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (emailRegex.test(email)) {
		store.value.email = email;

		if (drawerContent.value.state === 'access') {
			await getSub();
		} else if (drawerContent.value.state === 'ask') {
			await modal.close();

			setTimeout(() => {
				drawerContent.value.isOpen = true;
			}, 500);
		}
	} else {
		isNotValidEmail.value = true;
	}
};

const getSub = async () => {
	states.loading = true;
	try {
		const res = await $fetch(useApi() + '/get-sub', {
			query: {
				email: states.email,
			},
		});

		console.dir(res);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (err: any) {
		states.errorText = null;
		console.error(err);
		states.errorText = err.data.error || 'Что - то пошло не так, попробуйте еще';
	} finally {
		states.loading = false;
	}
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
						<span v-if="isNotValidEmail" class="text-red-400 text-[12px]"> Некорректный email</span>

						<UButton class="mt-2 block" @click="handleEmail">Поиск</UButton>
					</template>
				</main>
			</article>
		</template>
	</UModal>
</template>
