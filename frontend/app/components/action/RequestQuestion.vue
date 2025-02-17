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
const initCostul = ref(true);
onMounted(() => {
	setTimeout(() => {
		initCostul.value = false;
	}, 250);
});
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
			<UTextarea
				v-show="!initCostul"
				v-model="states.text"
				class="w-full"
				:rows="12"
				:autofocus="false"
				noresize
				placeholder="Текст проблемы..."
			/>
			<span class="text-sm">Минимум 10 символов</span>

			<UButton class="block mt-2" :disabled="textEmpty" @click="sendReq"> Отправить </UButton>
		</base-page>
	</div>
</template>
