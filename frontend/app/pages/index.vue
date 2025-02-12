<script setup lang="ts">
const drawerContent = useDrawer();
</script>

<template>
	<section class="l-index">
		<div class="bg-emerald-100 dark:bg-zinc-800 rounded-[8px] mt-1">
			<div class="l-wrapper">
				<div class="py-4">
					<h1 class="text-3xl">
						Здравствуйте<span class="text-emerald-400">!</span>
						<br />
						Чем мы можем вам помочь<span class="text-emerald-400">?</span>
					</h1>

					<main-buttons />
				</div>
			</div>
		</div>

		<UDrawer v-model:open="drawerContent.isOpen">
			<template #content>
				<article class="my-4 h-screen overflow-y-auto">
					<div class="py-4">
						<template v-if="drawerContent.state === 'access'"> dsadsa </template>

						<template v-else-if="drawerContent.state === 'marathon'"> marathon </template>

						<template v-else-if="drawerContent.state === 'qa'"> qa </template>

						<template v-else-if="drawerContent.state === 'ask'"> ask </template>
					</div>
				</article>
			</template>
		</UDrawer>
	</section>
</template>
