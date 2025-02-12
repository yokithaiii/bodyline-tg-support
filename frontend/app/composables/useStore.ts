interface IStore {
	email: string | null;
}
export default function () {
	return useState<IStore>('base-store', () => {
		return {
			email: null,
		};
	});
}
