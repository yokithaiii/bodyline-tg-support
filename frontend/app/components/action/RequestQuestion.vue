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
		console.error(err);
		useToast().add({
			title: '❌' + ((err as { data: { error: string } }).data.error || 'Что-то пошло не так'),
			close: false,
		});
	} finally {
		states.loading = false;
	}
};

const textEmpty = computed(() => states.text === '' || states.text.length < 10);

onMounted(() => {
	setTimeout(() => {
		document.body.classList.add('loaded');
	}, 150);
});
onUnmounted(() => {
	document.body.classList.remove('loaded');
});
</script>

<template>
	<div>
		<span class="text-2xl">Опишите вашу проблему:</span>

		<base-page
			class="mt-2 overflow-hidden relative l-input"
			:loading="states.loading"
			:error-text="states.errorText"
			:show-error-btn="true"
			@refresh="states.errorText = null"
		>
			<UTextarea v-model="states.text" class="w-full" :rows="12" :autofocus="false" noresize placeholder="Текст проблемы..." />
			<span class="text-sm">Минимум 10 символов</span>

			<UButton class="block mt-2" :disabled="textEmpty" @click="sendReq"> Отправить </UButton>
		</base-page>
	</div>
</template>

<style scoped>
.l-input {
	pointer-events: none;
}
.loaded .l-input {
	pointer-events: all;
}
</style>
