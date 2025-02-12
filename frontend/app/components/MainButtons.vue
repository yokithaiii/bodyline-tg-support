<script setup lang="ts">
const drawerContent = useState<{ isOpen: boolean; state: string | null }>('drawer-content');

const openCardDetail = (state: string) => {
	drawerContent.value.state = state;
	drawerContent.value.isOpen = true;
};
</script>

<template>
	<section class="l-buttons grid grid-cols-2 gap-1 mt-4">
		<UButton @click="openCardDetail('access')">Доступ к приложению 📱</UButton>
		<UButton @click="openCardDetail('marathon')">Доступ к марафону 🏆</UButton>
		<UButton @click="openCardDetail('qa')">Популярные вопросы ⁉️</UButton>
		<UButton @click="openCardDetail('ask')">Задать вопрос 📝</UButton>
	</section>
</template>
