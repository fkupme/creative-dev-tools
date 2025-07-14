import { useStorage } from '@vueuse/core';
import chroma from 'chroma-js';
import { computed, ref, type Ref } from 'vue';
import type {
	BoxShadowConfig,
	BoxShadowExportOptions,
	BoxShadowPreset,
} from '~/types';

export const useShadowGenerator = () => {
	// Reactive state для одиночной тени
	const shadowConfig: Ref<BoxShadowConfig> = ref({
		inset: false,
		offsetX: 0,
		offsetY: 4,
		blur: 8,
		spread: 0,
		color: '#000000',
		opacity: 25,
	});

	// Многослойные тени
	const shadowLayers: Ref<BoxShadowConfig[]> = ref([]);
	const enableMultipleShadows = ref(false);

	// Storage for user presets
	const userPresets = useStorage<BoxShadowPreset[]>(
		'shadow-generator-presets',
		[]
	);

	// Built-in presets
	const builtInPresets: BoxShadowPreset[] = [
		{
			name: 'None',
			inset: false,
			offsetX: 0,
			offsetY: 0,
			blur: 0,
			spread: 0,
			color: '#000000',
			opacity: 0,
		},
		// Basic Shadows
		{
			name: 'Subtle',
			inset: false,
			offsetX: 0,
			offsetY: 1,
			blur: 3,
			spread: 0,
			color: '#000000',
			opacity: 12,
		},
		{
			name: 'Small',
			inset: false,
			offsetX: 0,
			offsetY: 1,
			blur: 2,
			spread: 0,
			color: '#000000',
			opacity: 15,
		},
		{
			name: 'Medium',
			inset: false,
			offsetX: 0,
			offsetY: 4,
			blur: 6,
			spread: -1,
			color: '#000000',
			opacity: 20,
		},
		{
			name: 'Large',
			inset: false,
			offsetX: 0,
			offsetY: 10,
			blur: 15,
			spread: -3,
			color: '#000000',
			opacity: 25,
		},
		{
			name: 'Extra Large',
			inset: false,
			offsetX: 0,
			offsetY: 25,
			blur: 25,
			spread: -5,
			color: '#000000',
			opacity: 25,
		},
		// Material Design Shadows
		{
			name: 'Material 1dp',
			inset: false,
			offsetX: 0,
			offsetY: 1,
			blur: 3,
			spread: 0,
			color: '#000000',
			opacity: 12,
		},
		{
			name: 'Material 2dp',
			inset: false,
			offsetX: 0,
			offsetY: 1,
			blur: 5,
			spread: 0,
			color: '#000000',
			opacity: 20,
		},
		{
			name: 'Material 4dp',
			inset: false,
			offsetX: 0,
			offsetY: 2,
			blur: 4,
			spread: -1,
			color: '#000000',
			opacity: 20,
		},
		{
			name: 'Material 8dp',
			inset: false,
			offsetX: 0,
			offsetY: 5,
			blur: 5,
			spread: -3,
			color: '#000000',
			opacity: 20,
		},
		{
			name: 'Material 16dp',
			inset: false,
			offsetX: 0,
			offsetY: 8,
			blur: 10,
			spread: -5,
			color: '#000000',
			opacity: 20,
		},
		{
			name: 'Material 24dp',
			inset: false,
			offsetX: 0,
			offsetY: 12,
			blur: 17,
			spread: -2,
			color: '#000000',
			opacity: 20,
		},
		// Fluent UI (Microsoft) Shadows
		{
			name: 'Fluent 2',
			inset: false,
			offsetX: 0,
			offsetY: 0,
			blur: 2,
			spread: 0,
			color: '#000000',
			opacity: 14,
		},
		{
			name: 'Fluent 4',
			inset: false,
			offsetX: 0,
			offsetY: 1,
			blur: 2,
			spread: 0,
			color: '#000000',
			opacity: 14,
		},
		{
			name: 'Fluent 8',
			inset: false,
			offsetX: 0,
			offsetY: 2,
			blur: 4,
			spread: 0,
			color: '#000000',
			opacity: 14,
		},
		{
			name: 'Fluent 16',
			inset: false,
			offsetX: 0,
			offsetY: 4,
			blur: 8,
			spread: 0,
			color: '#000000',
			opacity: 14,
		},
		{
			name: 'Fluent 64',
			inset: false,
			offsetX: 0,
			offsetY: 16,
			blur: 32,
			spread: 0,
			color: '#000000',
			opacity: 14,
		},
		// Bootstrap Shadows
		{
			name: 'Bootstrap SM',
			inset: false,
			offsetX: 0,
			offsetY: 1,
			blur: 2,
			spread: 0,
			color: '#000000',
			opacity: 7,
		},
		{
			name: 'Bootstrap',
			inset: false,
			offsetX: 0,
			offsetY: 2,
			blur: 4,
			spread: 0,
			color: '#000000',
			opacity: 7,
		},
		{
			name: 'Bootstrap LG',
			inset: false,
			offsetX: 0,
			offsetY: 10,
			blur: 15,
			spread: -3,
			color: '#000000',
			opacity: 7,
		},
		// Creative Effects
		{
			name: 'Inner Shadow',
			inset: true,
			offsetX: 0,
			offsetY: 2,
			blur: 4,
			spread: 0,
			color: '#000000',
			opacity: 15,
		},
		{
			name: 'Pressed',
			inset: true,
			offsetX: 0,
			offsetY: 2,
			blur: 8,
			spread: 0,
			color: '#000000',
			opacity: 20,
		},
		{
			name: 'Glow Blue',
			inset: false,
			offsetX: 0,
			offsetY: 0,
			blur: 20,
			spread: 0,
			color: '#3B82F6',
			opacity: 50,
		},
		{
			name: 'Glow Purple',
			inset: false,
			offsetX: 0,
			offsetY: 0,
			blur: 25,
			spread: 0,
			color: '#8B5CF6',
			opacity: 40,
		},
		{
			name: 'Neon Green',
			inset: false,
			offsetX: 0,
			offsetY: 0,
			blur: 10,
			spread: 0,
			color: '#00ff88',
			opacity: 80,
		},
		{
			name: 'Neon Pink',
			inset: false,
			offsetX: 0,
			offsetY: 0,
			blur: 15,
			spread: 0,
			color: '#FF1493',
			opacity: 70,
		},
		// Professional Effects
		{
			name: 'Card Hover',
			inset: false,
			offsetX: 0,
			offsetY: 10,
			blur: 25,
			spread: -5,
			color: '#000000',
			opacity: 25,
		},
		{
			name: 'Floating',
			inset: false,
			offsetX: 0,
			offsetY: 15,
			blur: 35,
			spread: -5,
			color: '#000000',
			opacity: 20,
		},
		{
			name: 'Neumorphism In',
			inset: true,
			offsetX: -5,
			offsetY: -5,
			blur: 10,
			spread: 0,
			color: '#ffffff',
			opacity: 80,
		},
		{
			name: 'Neumorphism Out',
			inset: false,
			offsetX: 5,
			offsetY: 5,
			blur: 10,
			spread: 0,
			color: '#000000',
			opacity: 15,
		},
		{
			name: '3D Bottom',
			inset: false,
			offsetX: 0,
			offsetY: 3,
			blur: 0,
			spread: 0,
			color: '#000000',
			opacity: 50,
		},
		{
			name: '3D Right',
			inset: false,
			offsetX: 3,
			offsetY: 3,
			blur: 0,
			spread: 0,
			color: '#000000',
			opacity: 40,
		},
		// Brutal/Bold Effects
		{
			name: 'Brutal Pink',
			inset: false,
			offsetX: 5,
			offsetY: 5,
			blur: 0,
			spread: 0,
			color: '#FF1493',
			opacity: 100,
		},
		{
			name: 'Brutal Yellow',
			inset: false,
			offsetX: 8,
			offsetY: 8,
			blur: 0,
			spread: 0,
			color: '#FFD700',
			opacity: 100,
		},
		{
			name: 'Retro Blue',
			inset: false,
			offsetX: 4,
			offsetY: 4,
			blur: 0,
			spread: 0,
			color: '#00CED1',
			opacity: 80,
		},
	];

	// All presets (built-in + user)
	const allPresets = computed(() => [...builtInPresets, ...userPresets.value]);

	// Computed CSS values
	const computedBoxShadow = computed(() => {
		if (enableMultipleShadows.value && shadowLayers.value.length > 0) {
			// Многослойные тени
			const shadows = shadowLayers.value
				.map(layer => {
					const { inset, offsetX, offsetY, blur, spread, color, opacity } =
						layer;
					if (opacity === 0) return '';

					const shadowColor = chroma(color)
						.alpha(opacity / 100)
						.css();
					const insetKeyword = inset ? 'inset ' : '';
					return `${insetKeyword}${offsetX}px ${offsetY}px ${blur}px ${spread}px ${shadowColor}`;
				})
				.filter(Boolean);

			return shadows.length > 0 ? shadows.join(', ') : 'none';
		} else {
			// Одиночная тень
			const { inset, offsetX, offsetY, blur, spread, color, opacity } =
				shadowConfig.value;

			if (opacity === 0) return 'none';

			const shadowColor = chroma(color)
				.alpha(opacity / 100)
				.css();
			const insetKeyword = inset ? 'inset ' : '';

			return `${insetKeyword}${offsetX}px ${offsetY}px ${blur}px ${spread}px ${shadowColor}`;
		}
	});

	const cssCode = computed(() => {
		return `box-shadow: ${computedBoxShadow.value};`;
	});

	const scssCode = computed(() => {
		return `$box-shadow: ${computedBoxShadow.value};\n\n.element {\n  box-shadow: $box-shadow;\n}`;
	});

	const lessCode = computed(() => {
		return `@box-shadow: ${computedBoxShadow.value};\n\n.element {\n  box-shadow: @box-shadow;\n}`;
	});

	const stylusCode = computed(() => {
		return `box-shadow-value = ${computedBoxShadow.value}\n\n.element\n  box-shadow: box-shadow-value`;
	});

	// Methods
	const applyPreset = (preset: BoxShadowPreset) => {
		shadowConfig.value = {
			inset: preset.inset,
			offsetX: preset.offsetX,
			offsetY: preset.offsetY,
			blur: preset.blur,
			spread: preset.spread,
			color: preset.color,
			opacity: preset.opacity,
		};
	};

	const saveAsPreset = (name: string) => {
		const newPreset: BoxShadowPreset = {
			name,
			...shadowConfig.value,
		};
		userPresets.value.push(newPreset);
	};

	const deletePreset = (index: number) => {
		userPresets.value.splice(index, 1);
	};

	const exportCode = (
		options: BoxShadowExportOptions = {
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

		if (options.includeVendorPrefixes && options.format === 'css') {
			const shadowValue = computedBoxShadow.value;
			code = `-webkit-box-shadow: ${shadowValue};\n-moz-box-shadow: ${shadowValue};\nbox-shadow: ${shadowValue};`;
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

	const generateMultipleShadows = (layers: number = 3) => {
		const shadows: string[] = [];
		const baseConfig = shadowConfig.value;

		for (let i = 0; i < layers; i++) {
			const multiplier = i + 1;
			const layerColor = chroma(baseConfig.color)
				.alpha((baseConfig.opacity / 100) * (1 - i * 0.2))
				.css();

			const insetKeyword = baseConfig.inset ? 'inset ' : '';
			const shadow = `${insetKeyword}${baseConfig.offsetX * multiplier}px ${
				baseConfig.offsetY * multiplier
			}px ${baseConfig.blur * multiplier}px ${
				baseConfig.spread
			}px ${layerColor}`;
			shadows.push(shadow);
		}

		return shadows.join(', ');
	};

	const resetToDefault = () => {
		applyPreset(builtInPresets[3]); // Medium preset
	};

	const randomize = () => {
		shadowConfig.value = {
			inset: Math.random() > 0.8,
			offsetX: Math.floor(Math.random() * 200) - 100,
			offsetY: Math.floor(Math.random() * 200) - 100,
			blur: Math.floor(Math.random() * 50),
			spread: Math.floor(Math.random() * 100) - 50,
			color: chroma.random().hex(),
			opacity: Math.floor(Math.random() * 80) + 20,
		};
	};

	// Методы для работы с многослойными тенями
	const addShadowLayer = () => {
		shadowLayers.value.push({
			inset: false,
			offsetX: 0,
			offsetY: 4,
			blur: 8,
			spread: 0,
			color: '#000000',
			opacity: 25,
		});
	};

	const removeShadowLayer = (index: number) => {
		shadowLayers.value.splice(index, 1);
	};

	const updateShadowLayer = (
		index: number,
		config: Partial<BoxShadowConfig>
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

	return {
		// State
		shadowConfig,
		shadowLayers,
		enableMultipleShadows,
		userPresets,
		builtInPresets,
		allPresets,

		// Computed
		computedBoxShadow,
		cssCode,
		scssCode,
		lessCode,
		stylusCode,

		// Methods
		applyPreset,
		saveAsPreset,
		deletePreset,
		exportCode,
		copyToClipboard,
		generateMultipleShadows,
		resetToDefault,
		randomize,
		// Multiple shadows methods
		addShadowLayer,
		removeShadowLayer,
		updateShadowLayer,
		toggleMultipleShadows,
	};
};
