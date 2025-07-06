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
		{
			name: 'Inner',
			inset: true,
			offsetX: 0,
			offsetY: 2,
			blur: 4,
			spread: 0,
			color: '#000000',
			opacity: 15,
		},
		{
			name: 'Neon',
			inset: false,
			offsetX: 0,
			offsetY: 0,
			blur: 10,
			spread: 0,
			color: '#00ff88',
			opacity: 80,
		},
		{
			name: 'Elevated',
			inset: false,
			offsetX: 0,
			offsetY: 10,
			blur: 30,
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
