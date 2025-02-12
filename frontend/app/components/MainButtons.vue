<script setup lang="ts">
const sizes = useScreenSize();
const modal = useModal();

const resolveModalContent = defineAsyncComponent(() => import('~/components/product/ModalContent.vue'));

const drawerContent = useState<{ isOpen: boolean; data: string }>('drawer-content');
// const selectedProduct = ref<IProduct | null>(null);

const openCardDetail = (data: string) => {
	if (sizes.isMobile) {
		drawerContent.value.data = 'dsadas';
		drawerContent.value.isOpen = true;
	} else {
		// selectedProduct.value = product;
		modal.open(resolveModalContent, {
			data: data,
		});
	}
};
</script>

<template>
	<section class="l-buttons grid grid-cols-2 gap-1 mt-4">
		<UButton @click="openCardDetail('dsa')">Доступ к приложению 📱</UButton>
		<UButton @click="openCardDetail('dsa')">Доступ к марафону 🏆</UButton>
		<UButton @click="openCardDetail('dsa')">Популярные вопросы ⁉️</UButton>
		<UButton @click="openCardDetail('dsa')">Задать вопрос 📝</UButton>
	</section>
</template>
