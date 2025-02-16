<script setup lang="ts">
interface IListSub {
	id: string;
	firstname: string;
	lastname: string;
	is_active: boolean;
}

const states = reactive({
	loading: false,
	errorText: null as null | string,
	data: null as null | IListSub[],
});

const getData = async () => {
	states.loading = true;
	try {
		const res = await $fetch<IListSub[]>(useApi() + `/get-subscriptions`, {
			query: {
				email: useStore().value.email,
			},
		});

		if (res) {
			states.data = res;
		}
	} catch (err: unknown) {
		states.errorText = null;
		console.error(err);
		states.errorText = '❌' + ((err as { data: { error: string } }).data.error || 'Что-то пошло не так');
	} finally {
		states.loading = false;
	}
};

onMounted(() => {
	getData();
});

// const refresh = () => {
// 	states.errorText = null;
// 	getData();
// };

const handleClickItem = async (item: IListSub) => {
	states.loading = true;
	try {
		const res = await $fetch(useApi() + `/unlock-subscription`, {
			method: 'POST',
			body: {
				email: useStore().value.email,
				subscription_id: item.id,
			},
		});

		if (res) {
			useDrawer().value.isOpen = false;
			useToast().add({
				title: '✅ Доступ успешно открыт!',
				close: false,
			});
		}
	} catch (err: unknown) {
		console.error(err);
		useToast().add({
			title: '❌' + ((err as { data: { error: string } }).data.error || 'Что-то пошло не так'),
			close: false,
		});
	} finally {
		states.loading = false;
	}
};
</script>

<template>
	<div>
		<span class="text-2xl">Открытие доступа к приложению</span>

		<base-page :loading="states.loading" :error-text="states.errorText" class="mt-2">
			<span class="text-[14px]">Выберите тренера, на которого хотите открыть доступ</span>

			<ul class="grid grid-cols-1 gap-2 mt-2">
				<li v-for="item in states.data" :key="item.id">
					<UButton class="block w-full h-full" @click="handleClickItem(item)">{{ item.firstname }}</UButton>
				</li>
			</ul>
		</base-page>
	</div>
</template>
