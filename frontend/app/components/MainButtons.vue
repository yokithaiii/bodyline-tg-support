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
	<section class="l-buttons gap-1 mt-4">
		<UButton size="lg" @click="openCardDetail('access', true)"> <span class="text-[11px]"> Доступ к приложению 📱 </span></UButton>
		<UButton size="lg" @click="openCardDetail('marathon', true)"> <span class="text-[11px]"> Доступ к марафону 🏆 </span></UButton>
		<UButton size="lg" @click="openCardDetail('qa')"> <span class="text-[11px]"> Популярные вопросы ⁉️ </span></UButton>
		<UButton size="lg" @click="openCardDetail('ask', true)"> <span class="text-[11px]"> Задать вопрос 📝 </span></UButton>
	</section>
</template>

<style scoped>
.l-buttons {
	display: grid;
	grid-template-columns: 1fr 1fr;
	/* grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); */
}
</style>
