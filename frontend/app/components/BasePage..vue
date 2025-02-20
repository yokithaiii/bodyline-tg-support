<script setup lang="ts">
const states = defineProps<{
	loading: boolean;
	errorText: null | string;
	showErrorBtn?: boolean;
	showAccessBtn?: boolean;
}>();
const emits = defineEmits(['refresh']);

const startWithText = computed(() => {
	if (states.errorText === null) return false;
	return states.errorText.startsWith('Аккаунт уже открыт');
});
</script>

<template>
	<section>
		<template v-if="states.loading">
			<div class="w-full flex justify-center">
				<div class="spinner" />
			</div>
		</template>

		<template v-else-if="states.errorText !== null">
			<span class="max-w-[80%] block" :class="!startWithText ? 'text-red-400' : ''"
				>{{ states.errorText }} <span v-if="startWithText">✅</span></span
			>
			<div class="flex items-center gap-2">
				<UButton v-if="states.showErrorBtn" class="mt-2 block" @click="emits('refresh')">Попробовать еще</UButton>
				<UButton v-if="states.showAccessBtn" class="mt-2 block" @click="emits('refresh', 'buy_access')">Купить</UButton>
			</div>
			<span v-if="states.showAccessBtn" class="text-sm mt-1 block">
				Нажав на кнопку "Купить" вы оформляете подписку на того тренера, которую выбрали!
			</span>
		</template>

		<template v-else>
			<slot />
		</template>
	</section>
</template>
