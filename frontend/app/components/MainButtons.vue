<script setup lang="ts">
import { BodyModalEmail } from '#components';

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
	{
		id: 4,
		title: 'Задать вопрос 📝',
		state: 'ask',
	},
];
</script>

<template>
	<section class="l-buttons gap-1 mt-4">
		<UButton v-for="item in actionButtons" :key="item.id" size="lg" @click="openCardDetail(item.state)">
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
