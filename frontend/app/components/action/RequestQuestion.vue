<script setup lang="ts">
const states = reactive({
	text: '',
	loading: false,
	errorText: null as null | string,
});

const sendReq = async () => {
	states.loading = true;
	try {
		const res = await $fetch.raw(useApi() + `/request`, {
			method: 'POST',
			body: {
				email: useStore().value.email,
				request: states.text,
			},
		});

		if (res.status === 200) {
			useDrawer().value.isOpen = false;
			useToast().add({
				title: '✅ Ваше обращение успешно отправлено!',
				close: false,
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

const textEmpty = computed(() => states.text === '' || states.text.length < 10);
</script>

<template>
	<div>
		<span class="text-2xl">Опишите вашу проблему:</span>

		<div class="mt-2">
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
				<UTextarea v-model="states.text" class="w-full" :rows="12" :autofocus="false" noresize placeholder="Текст проблемы..." />

				<UButton class="block mt-2" :disabled="textEmpty" @click="sendReq"> Отправить </UButton>
			</template>
		</div>
	</div>
</template>
