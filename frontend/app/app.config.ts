export default defineAppConfig({
	ui: {
		colors: {
			primary: 'emerald',
			neutral: 'zinc',
		},

		carousel: {
			variants: {
				active: {
					true: {
						dot: 'bg-[var(--color-emerald-300)]',
					},
				},
			},
		},

		slideover: {
			slots: {
				overlay: '!pointer-events-none',
			},
		},
		toast: {
			slots: {
				root: '!pointer-events-none !top-4',
				position: '!top-4',
			},
		},
	},
});
