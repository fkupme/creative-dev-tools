import { computed, ref, type Ref } from 'vue';
import type { GradientConfig } from '~/types';

type GradientPreset = {
	name: string;
	config: GradientConfig;
};

export const useGradientGenerator = () => {
	const config: Ref<GradientConfig> = ref({
		type: 'linear',
		angle: 90,
		colors: [
			{ color: '#0ea5e9', stop: 0 },
			{ color: '#8b5cf6', stop: 100 },
		],
	});

	const builtInPresets: GradientPreset[] = [
		// Linear
		{
			name: 'Sky to Violet',
			config: {
				type: 'linear',
				angle: 90,
				colors: [
					{ color: '#0ea5e9', stop: 0 },
					{ color: '#8b5cf6', stop: 100 },
				],
			},
		},
		{
			name: 'Sunset',
			config: {
				type: 'linear',
				angle: 135,
				colors: [
					{ color: '#ff7e5f', stop: 0 },
					{ color: '#feb47b', stop: 100 },
				],
			},
		},
		{
			name: 'Aqua Lime',
			config: {
				type: 'linear',
				angle: 45,
				colors: [
					{ color: '#06b6d4', stop: 0 },
					{ color: '#a3e635', stop: 100 },
				],
			},
		},
		{
			name: 'Hot Pink',
			config: {
				type: 'linear',
				angle: 120,
				colors: [
					{ color: '#f43f5e', stop: 0 },
					{ color: '#f59e0b', stop: 50 },
					{ color: '#a78bfa', stop: 100 },
				],
			},
		},
		{
			name: 'Metal',
			config: {
				type: 'linear',
				angle: 180,
				colors: [
					{ color: '#0f172a', stop: 0 },
					{ color: '#334155', stop: 50 },
					{ color: '#94a3b8', stop: 100 },
				],
			},
		},
		{
			name: 'Mint',
			config: {
				type: 'linear',
				angle: 60,
				colors: [
					{ color: '#22c55e', stop: 0 },
					{ color: '#a7f3d0', stop: 100 },
				],
			},
		},
		{
			name: 'Lavender',
			config: {
				type: 'linear',
				angle: 200,
				colors: [
					{ color: '#c084fc', stop: 0 },
					{ color: '#60a5fa', stop: 100 },
				],
			},
		},
		// Radial
		{
			name: 'Neon Pop',
			config: {
				type: 'radial',
				angle: 0,
				colors: [
					{ color: '#22c55e', stop: 0 },
					{ color: '#3b82f6', stop: 50 },
					{ color: '#a78bfa', stop: 100 },
				],
			},
		},
		{
			name: 'Glass Glow',
			config: {
				type: 'radial',
				angle: 0,
				colors: [
					{ color: '#ffffff', stop: 0 },
					{ color: '#e2e8f0', stop: 40 },
					{ color: '#94a3b8', stop: 100 },
				],
			},
		},
		// Conic
		{
			name: 'Heatmap',
			config: {
				type: 'conic',
				angle: 0,
				colors: [
					{ color: '#0ea5e9', stop: 0 },
					{ color: '#22c55e', stop: 25 },
					{ color: '#eab308', stop: 50 },
					{ color: '#ef4444', stop: 75 },
					{ color: '#8b5cf6', stop: 100 },
				],
			},
		},
		{
			name: 'Candy Wheel',
			config: {
				type: 'conic',
				angle: 45,
				colors: [
					{ color: '#f472b6', stop: 0 },
					{ color: '#f59e0b', stop: 33 },
					{ color: '#84cc16', stop: 66 },
					{ color: '#60a5fa', stop: 100 },
				],
			},
		},
		{
			name: 'Night Radar',
			config: {
				type: 'conic',
				angle: 180,
				colors: [
					{ color: '#0f172a', stop: 0 },
					{ color: '#1e293b', stop: 50 },
					{ color: '#334155', stop: 100 },
				],
			},
		},
	];

	const addColorStop = (color: string = '#ffffff', stop: number = 50) => {
		config.value.colors.push({ color, stop });
		config.value.colors.sort((a, b) => a.stop - b.stop);
	};

	const removeColorStop = (index: number) => {
		if (config.value.colors.length <= 2) return;
		config.value.colors.splice(index, 1);
	};

	const updateColorStop = (
		index: number,
		payload: Partial<{ color: string; stop: number }>
	) => {
		const item = config.value.colors[index];
		if (!item) return;
		config.value.colors[index] = { ...item, ...payload };
		config.value.colors.sort((a, b) => a.stop - b.stop);
	};

	const applyPreset = (preset: GradientPreset) => {
		config.value = JSON.parse(JSON.stringify(preset.config));
	};

	const generateGradientString = (cfg: GradientConfig): string => {
		const stops = cfg.colors
			.map(s => `${s.color} ${Math.max(0, Math.min(100, Math.round(s.stop)))}%`)
			.join(', ');
		if (cfg.type === 'linear') {
			return `linear-gradient(${cfg.angle}deg, ${stops})`;
		}
		if (cfg.type === 'radial') {
			return `radial-gradient(circle, ${stops})`;
		}
		return `conic-gradient(from ${cfg.angle}deg, ${stops})`;
	};

	const gradientString = computed(() => generateGradientString(config.value));
	const cssCode = computed(() => `background: ${gradientString.value};`);

	const copyToClipboard = async (): Promise<boolean> => {
		try {
			await navigator.clipboard.writeText(cssCode.value);
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	};

	const resetToDefault = () => {
		config.value = {
			type: 'linear',
			angle: 90,
			colors: [
				{ color: '#0ea5e9', stop: 0 },
				{ color: '#8b5cf6', stop: 100 },
			],
		};
	};

	return {
		config,
		gradientString,
		cssCode,
		builtInPresets,
		addColorStop,
		removeColorStop,
		updateColorStop,
		applyPreset,
		copyToClipboard,
		resetToDefault,
	};
};
