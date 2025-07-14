import { useStorage } from '@vueuse/core';
import chroma from 'chroma-js';
import { computed, ref, type Ref } from 'vue';
import type {
	MultiTextShadowPreset,
	TextShadowConfig,
	TextShadowPreset,
} from '~/types';

interface TextShadowExportOptions {
	format: 'css' | 'scss' | 'less' | 'stylus';
	includeVendorPrefixes: boolean;
	minify: boolean;
}

export const useTextShadowGenerator = () => {
	// Reactive state для одиночной тени
	const shadowConfig: Ref<TextShadowConfig> = ref({
		x: 2,
		y: 2,
		blur: 4,
		color: '#000000',
		opacity: 50,
	});

	// Многослойные тени
	const shadowLayers: Ref<TextShadowConfig[]> = ref([]);
	const enableMultipleShadows = ref(false);

	// Storage for user presets
	const userPresets = useStorage<TextShadowPreset[]>(
		'text-shadow-generator-presets',
		[]
	);

	// Built-in multi-shadow presets
	const builtInMultiPresets: MultiTextShadowPreset[] = [
		{
			name: 'Burning Fire',
			description: 'Огненный эффект с градиентом от желтого к красному',
			layers: [
				{ x: 0, y: 0, blur: 20, color: '#fefcc9', opacity: 100 },
				{ x: 10, y: -10, blur: 30, color: '#feec85', opacity: 100 },
				{ x: -20, y: -20, blur: 40, color: '#ffae34', opacity: 100 },
				{ x: 20, y: -40, blur: 50, color: '#ec760c', opacity: 100 },
				{ x: -20, y: -60, blur: 60, color: '#cd4606', opacity: 100 },
				{ x: 0, y: -80, blur: 70, color: '#973716', opacity: 100 },
				{ x: 10, y: -90, blur: 80, color: '#451b0e', opacity: 100 },
				{ x: 1, y: 1, blur: 0, color: '#ffff00', opacity: 100 },
				{ x: 2, y: 2, blur: 0, color: '#ffa500', opacity: 100 },
				{ x: 3, y: 3, blur: 0, color: '#ff0000', opacity: 100 },
			],
		},
		{
			name: 'Vintage 3D',
			description: 'Винтажный 3D эффект с зеленым акцентом',
			layers: [
				{ x: 4, y: 4, blur: 0, color: '#d3d3d3', opacity: 100 },
				{ x: 6, y: 6, blur: 0, color: '#008000', opacity: 100 },
			],
		},
		{
			name: 'Neon Glow',
			description: 'Яркий неоновый эффект с множественным свечением',
			layers: [
				{ x: 0, y: 0, blur: 10, color: '#ffffff', opacity: 100 },
				{ x: 0, y: 0, blur: 20, color: '#ffffff', opacity: 100 },
				{ x: 0, y: 0, blur: 30, color: '#ff8800', opacity: 100 },
				{ x: 0, y: 0, blur: 40, color: '#ff4400', opacity: 100 },
				{ x: 0, y: 0, blur: 50, color: '#ff0000', opacity: 100 },
				{ x: 0, y: 0, blur: 60, color: '#ff0000', opacity: 100 },
				{ x: 0, y: 0, blur: 100, color: '#ff0000', opacity: 100 },
			],
		},
		{
			name: 'Retro Neon',
			description: 'Ретро неоновый эффект в синих тонах',
			layers: [
				{ x: 0, y: 0, blur: 15, color: '#0066ff', opacity: 90 },
				{ x: 0, y: 0, blur: 25, color: '#0066ff', opacity: 70 },
				{ x: 0, y: 0, blur: 35, color: '#0088ff', opacity: 50 },
			],
		},
		{
			name: 'Golden Emboss',
			description: 'Золотой тисненый эффект',
			layers: [
				{ x: 1, y: 1, blur: 0, color: '#000000', opacity: 40 },
				{ x: -1, y: -1, blur: 0, color: '#ffffff', opacity: 60 },
				{ x: 0, y: 0, blur: 5, color: '#ffd700', opacity: 30 },
			],
		},
		{
			name: 'Deep Shadow',
			description: 'Глубокая многослойная тень',
			layers: [
				{ x: 1, y: 1, blur: 0, color: '#000000', opacity: 80 },
				{ x: 2, y: 2, blur: 0, color: '#000000', opacity: 70 },
				{ x: 3, y: 3, blur: 0, color: '#000000', opacity: 60 },
				{ x: 4, y: 4, blur: 0, color: '#000000', opacity: 50 },
				{ x: 5, y: 5, blur: 0, color: '#000000', opacity: 40 },
				{ x: 6, y: 6, blur: 10, color: '#000000', opacity: 20 },
			],
		},
		{
			name: 'Rainbow Glow',
			description: 'Радужное свечение',
			layers: [
				{ x: 0, y: 0, blur: 5, color: '#ff0000', opacity: 80 },
				{ x: 0, y: 0, blur: 10, color: '#ff8800', opacity: 70 },
				{ x: 0, y: 0, blur: 15, color: '#ffff00', opacity: 60 },
				{ x: 0, y: 0, blur: 20, color: '#00ff00', opacity: 50 },
				{ x: 0, y: 0, blur: 25, color: '#0088ff', opacity: 40 },
				{ x: 0, y: 0, blur: 30, color: '#8800ff', opacity: 30 },
			],
		},
		{
			name: 'Ice Crystal',
			description: 'Ледяной кристаллический эффект',
			layers: [
				{ x: 0, y: 0, blur: 8, color: '#ffffff', opacity: 60 },
				{ x: 0, y: 0, blur: 15, color: '#e6f3ff', opacity: 50 },
				{ x: 0, y: 0, blur: 25, color: '#cce7ff', opacity: 40 },
				{ x: 1, y: 1, blur: 0, color: '#ffffff', opacity: 90 },
			],
		},
		{
			name: 'Electric Purple',
			description: 'Электрический фиолетовый эффект',
			layers: [
				{ x: 0, y: 0, blur: 5, color: '#ff00ff', opacity: 100 },
				{ x: 0, y: 0, blur: 10, color: '#8800ff', opacity: 80 },
				{ x: 0, y: 0, blur: 20, color: '#4400ff', opacity: 60 },
				{ x: 0, y: 0, blur: 30, color: '#2200aa', opacity: 40 },
			],
		},
		{
			name: 'Sunset Glow',
			description: 'Теплое закатное свечение',
			layers: [
				{ x: 0, y: 0, blur: 8, color: '#ff6b35', opacity: 80 },
				{ x: 0, y: 0, blur: 16, color: '#f7931e', opacity: 60 },
				{ x: 0, y: 0, blur: 24, color: '#ffd23f', opacity: 40 },
				{ x: 2, y: 2, blur: 0, color: '#ff4500', opacity: 50 },
			],
		},
	];

	// Built-in presets
	const builtInPresets: TextShadowPreset[] = [
		{
			name: 'None',
			x: 0,
			y: 0,
			blur: 0,
			color: '#000000',
			opacity: 0,
		},
		{
			name: 'Simple',
			x: 1,
			y: 1,
			blur: 1,
			color: '#000000',
			opacity: 30,
		},
		{
			name: 'Classic Drop',
			x: 2,
			y: 2,
			blur: 4,
			color: '#000000',
			opacity: 50,
		},
		{
			name: 'Soft Shadow',
			x: 0,
			y: 1,
			blur: 3,
			color: '#000000',
			opacity: 20,
		},
		{
			name: 'Hard Shadow',
			x: 3,
			y: 3,
			blur: 0,
			color: '#000000',
			opacity: 80,
		},
		{
			name: 'Distant',
			x: 5,
			y: 5,
			blur: 10,
			color: '#000000',
			opacity: 25,
		},
		{
			name: 'Close Proximity',
			x: 1,
			y: 1,
			blur: 2,
			color: '#000000',
			opacity: 60,
		},
		{
			name: 'Text Outline',
			x: 0,
			y: 0,
			blur: 1,
			color: '#ffffff',
			opacity: 100,
		},
		{
			name: 'Glow Effect',
			x: 0,
			y: 0,
			blur: 10,
			color: '#00ff88',
			opacity: 80,
		},
		{
			name: 'Neon Blue',
			x: 0,
			y: 0,
			blur: 15,
			color: '#0066ff',
			opacity: 90,
		},
		{
			name: 'Fire Glow',
			x: 0,
			y: 0,
			blur: 8,
			color: '#ff4500',
			opacity: 75,
		},
		{
			name: '3D Effect',
			x: 1,
			y: 1,
			blur: 0,
			color: '#666666',
			opacity: 100,
		},
		{
			name: 'Embossed',
			x: -1,
			y: -1,
			blur: 1,
			color: '#ffffff',
			opacity: 80,
		},
		{
			name: 'Retro',
			x: 3,
			y: 3,
			blur: 0,
			color: '#ff1493',
			opacity: 70,
		},
		{
			name: 'Elegant',
			x: 0,
			y: 2,
			blur: 8,
			color: '#000000',
			opacity: 15,
		},
	];

	// All presets (built-in + user)
	const allPresets = computed(() => [...builtInPresets, ...userPresets.value]);

	// Computed CSS values
	const computedTextShadow = computed(() => {
		if (enableMultipleShadows.value && shadowLayers.value.length > 0) {
			// Многослойные тени
			const shadows = shadowLayers.value
				.map(layer => {
					const { x, y, blur, color, opacity } = layer;
					if (opacity === 0) return '';

					const shadowColor = chroma(color)
						.alpha(opacity / 100)
						.css();
					return `${x}px ${y}px ${blur}px ${shadowColor}`;
				})
				.filter(Boolean);

			return shadows.length > 0 ? shadows.join(', ') : 'none';
		} else {
			// Одиночная тень
			const { x, y, blur, color, opacity } = shadowConfig.value;

			if (opacity === 0) return 'none';

			const shadowColor = chroma(color)
				.alpha(opacity / 100)
				.css();

			return `${x}px ${y}px ${blur}px ${shadowColor}`;
		}
	});

	const cssCode = computed(() => {
		return `text-shadow: ${computedTextShadow.value};`;
	});

	const scssCode = computed(() => {
		return `$text-shadow: ${computedTextShadow.value};\n\n.element {\n  text-shadow: $text-shadow;\n}`;
	});

	const lessCode = computed(() => {
		return `@text-shadow: ${computedTextShadow.value};\n\n.element {\n  text-shadow: @text-shadow;\n}`;
	});

	const stylusCode = computed(() => {
		return `text-shadow-value = ${computedTextShadow.value}\n\n.element\n  text-shadow: text-shadow-value`;
	});

	// Methods
	const applyPreset = (preset: TextShadowPreset) => {
		shadowConfig.value = {
			x: preset.x,
			y: preset.y,
			blur: preset.blur,
			color: preset.color,
			opacity: preset.opacity,
		};
	};

	const saveAsPreset = (name: string) => {
		const newPreset: TextShadowPreset = {
			name,
			...shadowConfig.value,
		};
		userPresets.value.push(newPreset);
	};

	const deletePreset = (index: number) => {
		userPresets.value.splice(index, 1);
	};

	const exportCode = (
		options: TextShadowExportOptions = {
			format: 'css',
			includeVendorPrefixes: false,
			minify: false,
		}
	) => {
		let code = '';

		switch (options.format) {
			case 'css':
				code = cssCode.value;
				break;
			case 'scss':
				code = scssCode.value;
				break;
			case 'less':
				code = lessCode.value;
				break;
			case 'stylus':
				code = stylusCode.value;
				break;
		}

		if (options.minify) {
			code = code.replace(/\s+/g, ' ').trim();
		}

		return code;
	};

	const copyToClipboard = async (
		format: 'css' | 'scss' | 'less' | 'stylus' = 'css'
	) => {
		const code = exportCode({
			format,
			includeVendorPrefixes: false,
			minify: false,
		});

		try {
			await navigator.clipboard.writeText(code);
			return true;
		} catch (err) {
			console.error('Failed to copy to clipboard:', err);
			return false;
		}
	};

	const resetToDefault = () => {
		applyPreset(builtInPresets[2]); // Classic Drop preset
	};

	const randomize = () => {
		shadowConfig.value = {
			x: Math.floor(Math.random() * 20) - 10,
			y: Math.floor(Math.random() * 20) - 10,
			blur: Math.floor(Math.random() * 20),
			color: chroma.random().hex(),
			opacity: Math.floor(Math.random() * 80) + 20,
		};
	};

	// Методы для работы с многослойными тенями
	const addShadowLayer = () => {
		shadowLayers.value.push({
			x: 2,
			y: 2,
			blur: 4,
			color: '#000000',
			opacity: 50,
		});
	};

	const removeShadowLayer = (index: number) => {
		shadowLayers.value.splice(index, 1);
	};

	const updateShadowLayer = (
		index: number,
		config: Partial<TextShadowConfig>
	) => {
		if (shadowLayers.value[index]) {
			shadowLayers.value[index] = { ...shadowLayers.value[index], ...config };
		}
	};

	const toggleMultipleShadows = () => {
		enableMultipleShadows.value = !enableMultipleShadows.value;
		if (enableMultipleShadows.value && shadowLayers.value.length === 0) {
			// Добавляем первый слой из текущей конфигурации
			shadowLayers.value.push({ ...shadowConfig.value });
		}
	};

	const applyMultiPreset = (preset: MultiTextShadowPreset) => {
		enableMultipleShadows.value = true;
		shadowLayers.value = preset.layers.map(layer => ({ ...layer }));
	};

	return {
		// State
		shadowConfig,
		shadowLayers,
		enableMultipleShadows,
		userPresets,
		builtInPresets,
		builtInMultiPresets,
		allPresets,

		// Computed
		computedTextShadow,
		cssCode,
		scssCode,
		lessCode,
		stylusCode,

		// Methods
		applyPreset,
		applyMultiPreset,
		saveAsPreset,
		deletePreset,
		exportCode,
		copyToClipboard,
		resetToDefault,
		randomize,
		// Multiple shadows methods
		addShadowLayer,
		removeShadowLayer,
		updateShadowLayer,
		toggleMultipleShadows,
	};
};
