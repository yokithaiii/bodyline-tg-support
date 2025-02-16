<script setup lang="ts">
const states = defineProps<{
	loading: boolean;
	errorText: null | string;
	showErrorBtn?: boolean;
}>();
const emits = defineEmits(['refresh']);
</script>

<template>
	<section>
		<template v-if="states.loading">
			<div class="w-full flex justify-center">
				<div class="spinner" />
			</div>
		</template>

		<template v-else-if="states.errorText !== null">
			<span class="text-red-400 max-w-[80%] block">{{ states.errorText }}</span>
			<UButton v-if="states.showErrorBtn" class="mt-2 block" @click="emits('refresh')">Попробовать еще</UButton>
		</template>

		<template v-else>
			<slot />
		</template>
	</section>
</template>
