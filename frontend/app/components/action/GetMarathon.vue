<script setup lang="ts">
interface IListMarathon {
	coach: {
		firstname: string;
		id: string;
		lastname: string;
	};
	id: string;
	price: number;
	title: string;
}

const states = reactive({
	text: '',
	loading: false,
	errorText: null as null | string,
	data: null as null | IListMarathon[],
});

const getData = async () => {
	states.loading = true;
	try {
		const res = await $fetch.raw<IListMarathon[]>(useApi() + `/get-workouts`);

		if (res.status === 200 && res._data) {
			states.data = res._data;
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (err: any) {
		states.errorText = null;
		console.error(err);
		states.errorText = err.data.error || 'Что - то пошло не так, попробуйте еще';
	} finally {
		states.loading = false;
	}
};

onMounted(() => {
	getData();
});

const refresh = () => {
	states.errorText = null;
	getData();
};

const openMarathon = async (item: IListMarathon) => {
	states.loading = true;
	try {
		const res = await $fetch.raw<{ message: string }>(useApi() + '/unlock-workout', {
			method: 'POST',
			body: {
				email: useStore().value.email,
				workout_title: item.title,
			},
		});
		if (res.status === 200 && res._data) {
			useDrawer().value.isOpen = false;
			useToast().add({
				title: '✅' + res._data.message && '✅ Успешно!',
			});
		}
	} catch (err: any) {
		console.error(err);
		console.dir(err);
		useToast().add({
			title: err.data.error ?? '❌ Что-то пошло не так',
			close: false,
		});
	} finally {
		states.loading = false;
	}
};
</script>

<template>
	<div>
		<span class="text-2xl">Доступ к марафону 🏆</span>

		<div class="mt-2">
			<template v-if="states.loading">
				<div class="w-full flex justify-center">
					<div class="spinner" />
				</div>
			</template>

			<template v-else-if="states.errorText !== null">
				<span class="text-red-400">{{ states.errorText }}</span>
				<UButton class="mt-2 block" @click="refresh">Попробовать еще</UButton>
			</template>

			<template v-else>
				<ul class="grid grid-cols-1 gap-2">
					<li v-for="item in states.data" :key="item.id">
						<UButton class="block w-full h-full" @click="openMarathon(item)">{{ item.title }}</UButton>
					</li>
				</ul>
			</template>
		</div>
	</div>
</template>
