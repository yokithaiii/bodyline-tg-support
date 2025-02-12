interface IDrawer {
	isOpen: boolean;
	state: null | string;
}
export default function () {
	return useState<IDrawer>('drawer-content', () => {
		return {
			isOpen: false,
			state: null,
		};
	});
}
