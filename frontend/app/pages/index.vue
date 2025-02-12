<script setup lang="ts">
// definePageMeta({
// 	redirect: '/category/all',
// });

const drawerContent = useState<{ isOpen: boolean; state: string | null }>('drawer-content', () => {
	return {
		isOpen: false,
		state: null,
	};
});
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
					<main class="py-4">
						<p>
							{{ drawerContent.state }}
						</p>
					</main>
				</article>
			</template>
		</UDrawer>
	</section>
</template>
