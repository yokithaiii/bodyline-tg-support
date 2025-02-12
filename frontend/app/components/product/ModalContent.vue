<script setup lang="ts">
// import type { IProduct } from '@/types/product';
const modal = useModal();

const props = defineProps<{
	// data: IProduct;
	data: string;
}>();
</script>

<template>
	<UModal
		:title="props.data"
		:close="{
			color: 'neutral',
			variant: 'solid',
		}"
	>
		<template #body>
			<article>
				<header>header</header>

				<main class="py-4">
					<p>
						{{ props.data }}
					</p>
				</main>
			</article>
		</template>

		<template #footer>
			<UButton color="neutral" label="Close" @click="modal.close()" />
		</template>
	</UModal>
</template>

<style lang="css" scoped></style>
