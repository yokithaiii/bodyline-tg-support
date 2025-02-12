interface IStore {
	email: string | null;
	isValidateEmail: boolean;
}
export default function () {
	return useState<IStore>('base-store', () => {
		return {
			email: null,
			isValidateEmail: false,
		};
	});
}
