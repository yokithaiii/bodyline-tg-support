<script setup lang="ts">
const states = reactive({
	text: '',
	loading: false,
	errorText: null as null | string,
	data: null,
});

const getData = async () => {
	states.loading = true;
	try {
		const res = await $fetch.raw<{ message: string }>(useApi() + `/get-sub`, {
			query: {
				email: useStore().value.email,
			},
		});

		if (res.status === 200 && res._data) {
			useDrawer().value.isOpen = false;
			useToast().add({
				title: res._data?.message || '✅ Успешно открыли доступ!',
			});
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (err: any) {
		states.errorText = null;
		console.error(err);
		states.errorText = err.data.error || 'Что - то пошло не так, попробуйте еще';
	} finally {
		states.loading = false;
	}
};

onMounted(() => {
	getData();
});

const refresh = () => {
	states.errorText = null;
	getData();
};
</script>

<template>
	<div>
		<span class="text-2xl">Открытие доступа к приложению</span>

		<div class="mt-2">
			<template v-if="states.loading">
				<div class="w-full flex justify-center">
					<div class="spinner" />
				</div>
			</template>

			<template v-else-if="states.errorText !== null">
				<span class="text-red-400">{{ states.errorText }}</span>
				<UButton class="mt-2 block" @click="refresh">Попробовать еще</UButton>
			</template>

			<template v-else> get acess </template>
		</div>
	</div>
</template>
