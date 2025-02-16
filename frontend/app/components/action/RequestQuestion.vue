<script setup lang="ts">
const states = reactive({
	text: '',
	loading: false,
	errorText: null as null | string,
});

const sendReq = async () => {
	states.loading = true;
	try {
		const res = await $fetch<{ message: string }>(useApi() + `/send-question`, {
			method: 'POST',
			body: {
				email: useStore().value.email,
				question: states.text,
				username: useStore().value.username,
			},
		});

		if (res) {
			useDrawer().value.isOpen = false;
			useToast().add({
				title: '✅' + (res.message || 'Успешно!'),
				close: false,
			});
		}
	} catch (err: unknown) {
		// states.errorText = null;
		console.error(err);
		useToast().add({
			title: '❌' + ((err as { data: { error: string } }).data.error || 'Что-то пошло не так'),
			close: false,
		});
		// states.errorText = err.data.error || 'Что - то пошло не так, попробуйте еще';
	} finally {
		states.loading = false;
	}
};

const textEmpty = computed(() => states.text === '' || states.text.length < 10);
</script>

<template>
	<div>
		<span class="text-2xl">Опишите вашу проблему:</span>

		<base-page
			class="mt-2 overflow-hidden relative"
			:loading="states.loading"
			:error-text="states.errorText"
			:show-error-btn="true"
			@refresh="states.errorText = null"
		>
			<input type="text" autofocus class="opacity-0 absolute left-[-1000px]" />
			<UTextarea v-model="states.text" class="w-full" :rows="12" :autofocus="false" noresize placeholder="Текст проблемы..." />

			<UButton class="block mt-2" :disabled="textEmpty" @click="sendReq"> Отправить </UButton>
		</base-page>
	</div>
</template>
