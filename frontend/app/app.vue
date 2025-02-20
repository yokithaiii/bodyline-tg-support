<script setup lang="ts">
import { useWebAppViewport } from 'vue-tg'

onBeforeMount(() => {
	useWebAppViewport().expand()
})
</script>

<template>
	<UApp>
		<div class="bg-[var(--ui-bg)]" vaul-drawer-wrapper>
			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>
		</div>
	</UApp>
</template>
