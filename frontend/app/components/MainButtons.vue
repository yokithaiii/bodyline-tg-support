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
</script>

<template>
	<section class="l-buttons grid grid-cols-2 gap-1 mt-4">
		<UButton @click="openCardDetail('access', true)">Доступ к приложению 📱</UButton>
		<UButton @click="openCardDetail('marathon', true)">Доступ к марафону 🏆</UButton>
		<UButton @click="openCardDetail('qa')">Популярные вопросы ⁉️</UButton>
		<UButton @click="openCardDetail('ask', true)">Задать вопрос 📝</UButton>
	</section>
</template>
