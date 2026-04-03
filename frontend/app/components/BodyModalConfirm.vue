<script setup lang="ts">
const props = defineProps<{
	title: string;
	description?: string;
	onConfirm: () => void;
}>();

const modal = useModal();

const handleConfirm = () => {
	modal.close();
	props.onConfirm();
};
</script>

<template>
	<UModal
		:title="props.title"
		:close="{
			color: 'neutral',
			variant: 'solid',
		}"
	>
		<template #body>
			<article>
				<p v-if="props.description" class="text-sm">{{ props.description }}</p>
				<div class="flex gap-2 mt-4">
					<UButton color="error" @click="handleConfirm">Да, отписаться</UButton>
					<UButton color="neutral" variant="outline" @click="modal.close()">Отмена</UButton>
				</div>
			</article>
		</template>
	</UModal>
</template>
