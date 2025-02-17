<script setup lang="ts">
import { useWebAppNavigation } from 'vue-tg';

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
	buyLink: null as null | string,
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
		states.errorText = (err as { data: { error: string } }).data.error || 'Что - то пошло не так, попробуйте еще';
	} finally {
		states.loading = false;
	}
};

onMounted(() => {
	getData();
});

const handleRefreshPage = (state: string) => {
	console.dir(state);
	if (state === 'buy_access') {
		goToBuySub();
	}
	states.errorText = null;
	getData();
};

const goToBuySub = async () => {
	if (states.buyLink === null) return;
	try {
		// const res = await $fetch(states.buyLink);
		useWebAppNavigation().openLink(states.buyLink);
		// if (window.Telegram && window.Telegram.WebApp) {
		// 	window.Telegram.WebApp.openLink(states.buyLink);
		// } else {
		// 	window.open(states.buyLink, '_blank');
		// 	// useToast().add({
		// 	// 	title: 'Ошибка, окружение не телеграм мини аппс',
		// 	// 	close: false,
		// 	// });
		// 	console.error('Telegram WebApp API is not available');
		// }
	} catch (err: unknown) {
		console.error(err);
		useToast().add({
			title: '❌' + ((err as { data: { error: string } }).data.error || 'Что-то пошло не так'),
			close: false,
		});
	} finally {
		// states.loading = false;
	}
};

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
		states.errorText = null;
		console.error(err);
		states.errorText = (err as { data: { error: string } }).data?.error;
		states.buyLink = (err as { data: { buy_link: string } }).data?.buy_link;
		// useToast().add({
		// 	title: '❌' + ((err as { data: { error: string } }).data.error || 'Что-то пошло не так'),
		// 	close: false,
		// });
	} finally {
		states.loading = false;
	}
};
</script>

<template>
	<div>
		<span class="text-2xl">
			Открытие доступа к
			<br />
			приложению 📱
		</span>

		<base-page
			class="mt-2"
			:loading="states.loading"
			:error-text="states.errorText"
			:show-error-btn="true"
			:show-access-btn="true"
			@refresh="handleRefreshPage"
		>
			<span class="text-[14px]">Выберите тренера, на которого хотите открыть доступ</span>

			<ul class="grid grid-cols-1 gap-2 mt-2">
				<li v-for="item in states.data" :key="item.id">
					<UButton class="block w-full h-full" @click="handleClickItem(item)">{{ item.firstname }}</UButton>
				</li>
			</ul>
		</base-page>
	</div>
</template>
