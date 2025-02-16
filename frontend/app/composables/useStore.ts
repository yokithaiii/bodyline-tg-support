interface IStore {
	email: string | null;
	isValidateEmail: boolean;
	username: string | null;
}

export default function () {
	return useState<IStore>('base-store', () => {
		return {
			email: null,
			isValidateEmail: false,
			username: null,
		};
	});
}
