UButton
<script setup lang="ts">
import { BodyModalEmail } from '#components';

const store = useStore();
const modal = useModal();
const drawerContent = useDrawer();

const openCardDetail = (state: string, shouldOpenModal = false) => {
	drawerContent.value.state = state;

	if (shouldOpenModal && !store.value.email) {
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
		modal: true,
	},
	{
		id: 2,
		title: 'Доступ к марафону 🏆',
		state: 'marathon',
		modal: true,
	},
	{
		id: 3,
		title: 'Часто задаваемые вопросы ⁉️',
		state: 'qa',
		modal: false,
	},
	{
		id: 4,
		title: 'Задать вопрос 📝',
		state: 'ask',
		modal: true,
	},
];
</script>

<template>
	<section class="l-buttons gap-1 mt-4">
		<UButton v-for="item in actionButtons" :key="item.id" size="lg" @click="openCardDetail(item.state, item.modal)">
			<span class="text-[10px] line-clamp-1"> {{ item.title }} </span>
		</UButton>
	</section>
</template>

<style scoped>
.l-buttons {
	display: grid;
	grid-template-columns: 1fr 1fr;
}
</style>
