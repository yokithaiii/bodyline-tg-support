<script setup lang="ts">
interface IListFaq {
	question: string;
	answer: string;
	image_url: string | null;
	video_url: string | null;
}

const states = reactive({
	text: '',
	loading: false,
	errorText: null as null | string,
	listData: null as null | IListFaq[],
});

const getFaq = async () => {
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
	getFaq();
});

const slideover = reactive({
	isOpen: false,
	data: null as null | IListFaq,
});

const refresh = () => {
	states.errorText = null;
	getFaq();
};

const openFaqDetail = async (item: IListFaq) => {
	slideover.data = null;
	slideover.isOpen = true;
	setTimeout(() => {
		slideover.data = item;
	}, 1000);
};
</script>

<template>
	<div>
		<span>Выберите ваш интересующий вопрос:</span>

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

			<template v-else>
				<ul class="grid grid-cols-1 gap-2">
					<li v-for="item in states.listData" :key="item.question">
						<UButton class="block w-full h-full" @click="openFaqDetail(item)">{{ item.question }}</UButton>
					</li>
				</ul>
				<!-- <UButton class="block mt-2" @click="sendReq"> Отправить </UButton> -->
			</template>
		</div>

		<USlideover v-model:open="slideover.isOpen" title="Ответ">
			<template #body>
				<div v-if="slideover.data === null" class="w-full flex justify-center">
					<div class="spinner" />
				</div>
				<template v-else>
					<p>{{ slideover.data?.answer }}</p>

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
