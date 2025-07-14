<template>
	<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
		<!-- Header -->
		<TextShadowHeader @export-css="exportCSS" @export-image="exportImage" />

		<!-- Main Content -->
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
				<!-- Controls Panel -->
				<div class="xl:col-span-1">
					<TextShadowControls
						:shadow-config="shadowConfig"
						:shadow-layers="shadowLayers"
						:enable-multiple-shadows="enableMultipleShadows"
						:presets="builtInPresets"
						:multi-presets="builtInMultiPresets"
						:font-size="fontSize"
						:font-family="fontFamily"
						@update-config="updateShadowConfig"
						@toggle-multiple-shadows="toggleMultipleShadows"
						@add-layer="addShadowLayer"
						@remove-layer="removeShadowLayer"
						@update-layer="updateShadowLayer"
						@apply-preset="applyPreset"
						@apply-multi-preset="applyMultiPreset"
						@update-font-size="updateFontSize"
						@update-font-family="updateFontFamily"
					/>
				</div>

				<!-- Preview & Code Panel -->
				<div class="xl:col-span-2">
					<div class="space-y-6">
						<!-- Preview Panel -->
						<TextShadowPreview
							ref="previewRef"
							:show-background="showBackground"
							:background-color="backgroundColor"
							:computed-text-shadow="computedTextShadow"
							:font-size="fontSize"
							:font-family="fontFamily"
							:preview-text="previewText"
							:text-color="textColor"
							@toggle-background="toggleBackground"
							@update-background-color="updateBackgroundColor"
							@update-preview-text="updatePreviewText"
							@update-text-color="updateTextColor"
						/>

						<!-- Code Output -->
						<TextShadowCodeOutput :css-code="cssCode" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import { useHead } from "nuxt/app";
import { onMounted, ref } from "vue";
import { useTextShadowGenerator } from "~/composables/useTextShadowGenerator";

// Composable
const {
	shadowConfig,
	shadowLayers,
	enableMultipleShadows,
	builtInPresets,
	builtInMultiPresets,
	computedTextShadow,
	cssCode,
	applyPreset,
	applyMultiPreset,
	copyToClipboard,
	resetToDefault,
	addShadowLayer,
	removeShadowLayer,
	updateShadowLayer,
	toggleMultipleShadows,
} = useTextShadowGenerator();

// Meta
useHead({
	title: "Text Shadow Generator",
	meta: [
		{
			name: "description",
			content:
				"Create beautiful CSS text shadows with our interactive generator. Perfect for web designers and developers.",
		},
	],
});

// Refs
const previewRef = ref();
const showBackground = ref(false);
const backgroundColor = ref("#ffffff");
const fontSize = ref(48);
const fontFamily = ref("Georgia, serif");
const previewText = ref("Your Amazing Text");
const textColor = ref("#000000");

// Methods
const updateShadowConfig = (config: any) => {
	Object.assign(shadowConfig.value, config);
};

const toggleBackground = (enabled: boolean) => {
	showBackground.value = enabled;
};

const updateBackgroundColor = (color: string) => {
	backgroundColor.value = color;
};

const updateFontSize = (size: number) => {
	fontSize.value = size;
};

const updateFontFamily = (family: string) => {
	fontFamily.value = family;
};

const updatePreviewText = (text: string) => {
	previewText.value = text;
};

const updateTextColor = (color: string) => {
	textColor.value = color;
};

const exportCSS = async () => {
	const success = await copyToClipboard();
	if (success) {
		// TODO: Add toast notification
		console.log("CSS copied to clipboard!");
	}
};

const exportImage = async () => {
	const previewContainer = previewRef.value?.previewContainer;
	if (!previewContainer) return;

	try {
		const canvas = await html2canvas(previewContainer, {
			backgroundColor: showBackground.value
				? "transparent"
				: backgroundColor.value,
			scale: 2,
		});

		canvas.toBlob((blob) => {
			if (blob) {
				saveAs(blob, "text-shadow-preview.png");
			}
		});
	} catch (err) {
		console.error("Failed to export image:", err);
	}
};

// Set initial preset
onMounted(() => {
	resetToDefault();
});
</script> 