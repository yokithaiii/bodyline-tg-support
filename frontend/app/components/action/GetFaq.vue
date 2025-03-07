<script setup lang="ts">
interface IListFaq {
	question: string;
	answer: string;
	image_url: string | null;
	video_url: string | null;
	is_unsubscribe: boolean;
}

const states = reactive({
	text: '',
	loading: false,
	errorText: null as null | string,
	listData: null as null | IListFaq[],
});

const getData = async () => {
	states.loading = true;
	try {
		const res = await $fetch<IListFaq[]>(useApi() + `/get-faq`);

		if (res) {
			states.listData = res;
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

const slideover = reactive({
	isOpen: false,
	data: null as null | IListFaq,
});

const refresh = () => {
	states.errorText = null;
	getData();
};

const openFaqDetail = async (item: IListFaq) => {
	slideover.data = null;
	slideover.isOpen = true;
	setTimeout(() => {
		slideover.data = item;
	}, 1000);
};

interface ErrorInterface {
	data: {
		error?: string;
		message?: string;
	};
}

const loadSlideover = ref(false);

const handleUnsubscribe = async () => {
	loadSlideover.value = true;
	try {
		const res = await $fetch<{ message: string }>(useApi() + '/unsubscribe', {
			method: 'POST',
			body: {
				email: useStore().value.email,
			},
		});
		if (res) {
			slideover.isOpen = false;
			useToast().add({
				title: '✅' + (res.message || 'Успешно!'),
				close: false,
			});
		}
	} catch (err) {
		console.error(err);
		const errorMessage = (err as ErrorInterface).data.error || (err as ErrorInterface).data.message;

		useToast().add({
			title: '❌ ' + errorMessage,
			close: false,
		});
	} finally {
		loadSlideover.value = false;
	}
};
</script>

<template>
	<div>
		<span class="text-2xl">Выберите ваш интересующий вопрос:</span>

		<base-page class="mt-2" :loading="states.loading" :error-text="states.errorText" :show-error-btn="true" @refresh="refresh">
			<ul class="grid grid-cols-1 gap-2">
				<li v-for="item in states.listData" :key="item.question">
					<UButton class="block w-full h-full" @click="openFaqDetail(item)">{{ item.question }}</UButton>
				</li>
			</ul>
		</base-page>

		<USlideover v-model:open="slideover.isOpen" title="Ответ">
			<template #body>
				<div v-if="loadSlideover || slideover.data === null" class="w-full flex justify-center">
					<div class="spinner" />
				</div>
				<template v-else>
					<p>{{ slideover.data?.answer }}</p>

					<UButton v-if="slideover.data?.is_unsubscribe" class="mt-2 block" @click="handleUnsubscribe"> Отписаться </UButton>

					<nuxt-img
						v-if="slideover.data?.image_url"
						:src="slideover.data?.image_url || ''"
						class="block mt-2 rounded-[10px]"
						loading="lazy"
					/>

					<div v-if="slideover.data?.video_url" class="mt-3">
						<nuxt-link :href="slideover.data?.video_url" class="text-amber-400" target="_blank" external
							>Ссылка на видео</nuxt-link
						>
						<video :src="slideover.data?.video_url || ''" controls class="block w-full mt-2 rounded-[10px]" />
					</div>
				</template>
			</template>
		</USlideover>
	</div>
</template>
