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
	max-width: 768px;
	padding: 0 4px;
	margin: 0 auto;
}
</style>
