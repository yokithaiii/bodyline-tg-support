<script setup lang="ts">
import { BodyModalEmail } from '#components';

interface IListFaq {
	question: string;
	answer: string;
	image_url: string | null;
	video_url: string | null;
	is_unsubscribe: boolean;
}

interface ErrorInterface {
	data: {
		error?: string;
		message?: string;
	};
}

const store = useStore();
const modal = useModal();
const drawerContent = useDrawer();

const openCardDetail = (state: string) => {
	drawerContent.value.state = state;

	if (!store.value.email) {
		modal.open(BodyModalEmail, {
			title: 'Поиск аккаунта',
		});
	} else {
		drawerContent.value.isOpen = true;
	}
};

const actionButtons = [
	{
		id: 1,
		title: 'Доступ к приложению 📱',
		state: 'access',
	},
	{
		id: 2,
		title: 'Доступ к марафону 🏆',
		state: 'marathon',
	},
	{
		id: 3,
		title: 'Часто задаваемые вопросы ⁉️',
		state: 'qa',
	},
];

const slideover = reactive({
	isOpen: false,
	data: null as null | IListFaq,
});

const loadSlideover = ref(false);
const handleUnsubscribe = async () => {

	// drawerContent.value.state = state;

	if (!store.value.email) {
		modal.open(BodyModalEmail, {
			title: 'Поиск аккаунта',
		});

		return
	}

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
	<section class="l-buttons gap-1 mt-4">
		<UButton v-for="item in actionButtons" :key="item.id" size="lg" @click="openCardDetail(item.state)">
			<span class="text-[10px] line-clamp-1"> {{ item.title }} </span>
		</UButton>
		<UButton size="lg" @click="handleUnsubscribe()">
			<span class="text-[10px] line-clamp-1"> Отменить подписку </span>
		</UButton>
	</section>
</template>

<style scoped>
.l-buttons {
	display: grid;
	grid-template-columns: 1fr 1fr;
}
</style>
