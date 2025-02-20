<script setup lang="ts"></script>

<template>
	<section class="layout">
		<main-header />

		<main class="content">
			<slot />
		</main>
	</section>
</template>

<style scoped>
.layout {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	padding: 0 4px;
}

.content {
	flex: 1;
}
</style>
