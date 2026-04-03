<script setup lang="ts">
const states = reactive({
	text: '',
	loading: false,
	uploadingImage: false,
	errorText: null as null | string,
	imageUrl: null as null | string,
});

const fileInputRef = ref<HTMLInputElement | null>(null);

const handleFileChange = async (e: Event) => {
	const file = (e.target as HTMLInputElement).files?.[0];
	if (!file) return;

	states.uploadingImage = true;
	try {
		const formData = new FormData();
		formData.append('files[]', file);
		formData.append('folder', 'bugs');

		const res = await $fetch<{ data: { urls: { url: string }[] } }>(useApi() + '/upload', {
			method: 'POST',
			body: formData,
		});

		states.imageUrl = res.data.urls[0]?.url ?? null;
	} catch (err: unknown) {
		console.error(err);
		useToast().add({
			title: '❌ Не удалось загрузить фото',
			close: false,
		});
	} finally {
		states.uploadingImage = false;
	}
};

const removeImage = () => {
	states.imageUrl = null;
	if (fileInputRef.value) fileInputRef.value.value = '';
};

const sendReq = async () => {
	states.loading = true;
	try {
		const res = await $fetch<{ message: string }>(useApi() + `/send-question`, {
			method: 'POST',
			body: {
				email: useStore().value.email,
				question: states.text,
				username: useStore().value.username,
				image_url: states.imageUrl,
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
				:rows="10"
				:autofocus="false"
				noresize
				placeholder="Текст проблемы..."
			/>
			<span class="text-sm">Минимум 10 символов</span>

			<!-- Image upload -->
			<div class="mt-3">
				<input
					ref="fileInputRef"
					type="file"
					accept="image/*"
					class="hidden"
					@change="handleFileChange"
				/>

				<div v-if="states.imageUrl" class="relative inline-block mt-1">
					<img :src="states.imageUrl" class="max-h-32 rounded-md object-cover" alt="preview" />
					<UButton
						size="xs"
						color="error"
						variant="solid"
						class="absolute top-1 right-1"
						icon="i-lucide-x"
						@click="removeImage"
					/>
				</div>

				<UButton
					v-else
					size="sm"
					color="neutral"
					variant="outline"
					:loading="states.uploadingImage"
					class="mt-1"
					icon="i-lucide-image"
					@click="fileInputRef?.click()"
				>
					Прикрепить фото
				</UButton>
			</div>

			<UButton class="block mt-3" :disabled="textEmpty || states.uploadingImage" @click="sendReq">
				Отправить
			</UButton>
		</base-page>
	</div>
</template>
