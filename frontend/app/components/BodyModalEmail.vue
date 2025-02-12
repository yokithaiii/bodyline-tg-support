<script setup lang="ts">
const store = useStore();
const drawerContent = useDrawer();

const props = defineProps<{
	title: string;
}>();

const handleEmail = (event: Event) => {
	const input = event.target as HTMLInputElement;
	const email = input.value.trim();

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (emailRegex.test(email)) {
		store.value.email = email;
		drawerContent.value.isOpen = true;
		// store.value.isValidateEmail = true;
	} else {
		// store.value.isValidateEmail = false;
	}
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
				<header>
					<span>Для поиска вашего аккаунта напишите ваш email: </span>
				</header>

				<main class="py-4">
					<UInput placeholder="Введите ваш email" class="w-full flex" @input="handleEmail($event)" />
				</main>
			</article>
		</template>
	</UModal>
</template>
