<script setup lang="ts">
// const modal = useModal();
const store = useStore();
// const drawerContent = useDrawer();

const props = defineProps<{
	title: string;
}>();

const emailState = reactive({
	email: '',
	loading: false,
	isError: false,
});

const isNotValidEmail = ref(false);

const handleEmail = async () => {
	isNotValidEmail.value = false;
	const email = emailState.email.trim();

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (emailRegex.test(email)) {
		store.value.email = email;

		await getSub();
		// await modal.close();
		// drawerContent.value.isOpen = true;
		// store.value.isValidateEmail = true;
	} else {
		isNotValidEmail.value = true;
		// store.value.isValidateEmail = false;
	}
};

const getSub = async () => {
	emailState.loading = true;
	try {
		const res = await $fetch(useApi() + '/get-sub', {
			query: {
				email: emailState.email,
			},
		});

		console.dir(res);
	} catch (err) {
		console.error(err);
		emailState.isError = true;
	} finally {
		emailState.loading = false;
	}
};

// async function getSub(ctx) {
//     await ctx.reply('✅ Ищем Ваш аккаунт...');
//     try {
//         const response = await axios.get(`${process.env.BACKEND_API_URL}/get-sub?email=${ctx.message.text}`);
//         return response.data;
//     } catch (error) {
//         throw new Error(errorHandler(error));
//     }
// }
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
					<span>Для поиска вашего аккаунта напишите ваш email: </span>
				</header>
				<pre>{{ useApi() }}</pre>
				<pre>{{ useRuntimeConfig().public.test }}</pre>
				<pre>{{ useRuntimeConfig().public }}</pre>
				<pre>{{ useRuntimeConfig() }}</pre>
				<!-- <pre>{{ useAppConfig() }}</pre> -->

				<main class="py-4">
					<template v-if="emailState.loading">
						<div class="w-full flex justify-center">
							<div class="spinner" />
						</div>
					</template>

					<template v-else-if="emailState.isError"> error </template>

					<template v-else>
						<div>
							<UInput v-model="emailState.email" placeholder="Введите ваш email" class="w-full flex" />
							<span v-if="isNotValidEmail" class="text-red-400 text-[12px]"> Некорректный email</span>
						</div>

						<UButton class="mt-2" @click="handleEmail">Поиск</UButton>
					</template>
				</main>
			</article>
		</template>
	</UModal>
</template>
