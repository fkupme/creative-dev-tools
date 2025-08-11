import { computed, ref, type Ref } from 'vue';
import type { BorderRadiusConfig } from '~/types';

export const useBorderRadiusGenerator = () => {
	const config: Ref<BorderRadiusConfig> = ref({
		topLeft: 16,
		topRight: 16,
		bottomRight: 16,
		bottomLeft: 16,
		unit: 'px',
	});

	const borderRadiusValue = computed(() => {
		const u = config.value.unit;
		const { topLeft, topRight, bottomRight, bottomLeft } = config.value;
		return `${topLeft}${u} ${topRight}${u} ${bottomRight}${u} ${bottomLeft}${u}`;
	});

	const cssCode = computed(() => `border-radius: ${borderRadiusValue.value};`);

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
			topLeft: 16,
			topRight: 16,
			bottomRight: 16,
			bottomLeft: 16,
			unit: 'px',
		};
	};

	return {
		config,
		borderRadiusValue,
		cssCode,
		copyToClipboard,
		resetToDefault,
	};
};
