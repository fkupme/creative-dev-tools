import { defineStore } from 'pinia';

export interface Tool {
	id: string;
	name: string;
	description: string;
	icon: string;
	color: string;
	href: string;
	status: 'new' | 'coming' | 'active';
	disabled: boolean;
}

export interface AppState {
	tools: Tool[];
	currentTool: string | null;
	loading: boolean;
	error: string | null;
	favorites: string[];
}

export const useAppStore = defineStore('app', {
	state: (): AppState => ({
		tools: [
			{
				id: 'box-shadow',
				name: 'Box Shadow Generator',
				description:
					'Создавайте красивые тени для элементов с предпросмотром в реальном времени',
				icon: 'heroicons:squares-2x2',
				color: 'bg-blue-500',
				href: '/shadows',
				status: 'new',
				disabled: false,
			},
			{
				id: 'gradient',
				name: 'Gradient Generator',
				description:
					'Генерируйте линейные и радиальные градиенты с полным контролем',
				icon: 'heroicons:swatch',
				color: 'bg-purple-500',
				href: '/gradients',
				status: 'coming',
				disabled: true,
			},
			{
				id: 'color-palette',
				name: 'Color Palette',
				description:
					'Создавайте гармоничные цветовые палитры для ваших проектов',
				icon: 'heroicons:paint-brush',
				color: 'bg-pink-500',
				href: '/colors',
				status: 'coming',
				disabled: true,
			},
			{
				id: 'text-shadow',
				name: 'Text Shadow',
				description:
					'Добавляйте стильные тени к тексту с настраиваемыми параметрами',
				icon: 'heroicons:document-text',
				color: 'bg-green-500',
				href: '/text-shadows',
				status: 'new',
				disabled: false,
			},
			{
				id: 'border-radius',
				name: 'Border Radius',
				description:
					'Создавайте идеальные закругленные углы для любых элементов',
				icon: 'heroicons:square-3-stack-3d',
				color: 'bg-orange-500',
				href: '/border-radius',
				status: 'coming',
				disabled: true,
			},
			{
				id: 'animation',
				name: 'Animation Generator',
				description: 'Создавайте плавные CSS анимации и переходы',
				icon: 'heroicons:bolt',
				color: 'bg-yellow-500',
				href: '/animations',
				status: 'coming',
				disabled: true,
			},
		],
		currentTool: null,
		loading: false,
		error: null,
		favorites: [],
	}),

	getters: {
		getToolById: state => (id: string) => {
			return state.tools.find(tool => tool.id === id);
		},

		getActiveTool: state => {
			return state.currentTool
				? state.tools.find(tool => tool.id === state.currentTool)
				: null;
		},

		getAvailableTools: state => {
			return state.tools.filter(tool => !tool.disabled);
		},

		getComingTools: state => {
			return state.tools.filter(tool => tool.status === 'coming');
		},

		getFavoriteTools: state => {
			return state.tools.filter(tool => state.favorites.includes(tool.id));
		},
	},

	actions: {
		setCurrentTool(toolId: string) {
			this.currentTool = toolId;
		},

		clearCurrentTool() {
			this.currentTool = null;
		},

		toggleFavorite(toolId: string) {
			const index = this.favorites.indexOf(toolId);
			if (index > -1) {
				this.favorites.splice(index, 1);
			} else {
				this.favorites.push(toolId);
			}
		},

		setLoading(loading: boolean) {
			this.loading = loading;
		},

		setError(error: string | null) {
			this.error = error;
		},

		updateToolStatus(
			toolId: string,
			status: 'new' | 'coming' | 'active',
			disabled = false
		) {
			const tool = this.tools.find(t => t.id === toolId);
			if (tool) {
				tool.status = status;
				tool.disabled = disabled;
			}
		},
	},

	// Persistence будет обрабатываться вручную в компонентах
});
