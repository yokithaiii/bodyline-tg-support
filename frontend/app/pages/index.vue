<script setup lang="ts">
// definePageMeta({
// 	redirect: '/category/all',
// });

const drawerContent = useState<{ isOpen: boolean; data: any }>('drawer-content', () => {
	return {
		isOpen: false,
		data: null,
	};
});
</script>

<template>
	<section class="l-index">
		<div class="bg-emerald-100 dark:bg-zinc-800 rounded-[8px] mt-1">
			<div class="l-wrapper">
				<div class="py-4">
					<h1 class="text-3xl">
						Здравствуйте
						<span class="text-emerald-400">!</span>
						Чем мы можем вам помочь
						<span class="text-emerald-400">?</span>
					</h1>

					<main-buttons />
				</div>
			</div>
		</div>

		<UDrawer v-model:open="drawerContent.isOpen" should-scale-background>
			<template #content>
				<article class="my-4 h-screen overflow-y-auto">
					<main class="py-4">
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium, perferendis nihil soluta aliquam
							distinctio deleniti ullam. Quisquam dicta nostrum tempore cupiditate totam minima quis illum ad veniam!
							Possimus, officia perspiciatis.
						</p>
					</main>
				</article>
			</template>
		</UDrawer>
	</section>
</template>
