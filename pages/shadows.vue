<template>
	<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
		<!-- Header -->
		<BoxShadowHeader @export-css="exportCSS" @export-image="exportImage" />

		<!-- Main Content -->
		<div class="container-fluid py-8">
			<div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
				<!-- Controls Panel -->
				<div class="xl:col-span-1 xl:sticky xl:top-24 space-y-6">
					<BoxShadowControls
						:shadow-config="shadowConfig"
						:shadow-layers="shadowLayers"
						:enable-multiple-shadows="enableMultipleShadows"
						:presets="builtInPresets"
						@update-config="updateShadowConfig"
						@toggle-multiple-shadows="toggleMultipleShadows"
						@add-layer="addShadowLayer"
						@remove-layer="removeShadowLayer"
						@update-layer="updateShadowLayer"
						@apply-preset="applyPreset"
					/>
				</div>

				<!-- Preview & Code Panel -->
				<div class="xl:col-span-2">
					<div class="space-y-6">
						<!-- Preview Panel -->
						<BoxShadowPreview
							ref="previewRef"
							:show-background="showBackground"
							:background-color="backgroundColor"
							:computed-box-shadow="computedBoxShadow"
							@toggle-background="toggleBackground"
							@update-background-color="updateBackgroundColor"
						/>

						<!-- Code Output -->
						<BoxShadowCodeOutput :css-code="cssCode" />
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
import { useShadowGenerator } from "~/composables/useShadowGenerator";

// Composable
const {
	shadowConfig,
	shadowLayers,
	enableMultipleShadows,
	builtInPresets,
	computedBoxShadow,
	cssCode,
	applyPreset,
	copyToClipboard,
	resetToDefault,
	addShadowLayer,
	removeShadowLayer,
	updateShadowLayer,
	toggleMultipleShadows,
} = useShadowGenerator();

// Meta
useHead({
	title: "Box Shadow Generator",
	meta: [
		{
			name: "description",
			content:
				"Create beautiful CSS box shadows with our interactive generator. Perfect for web designers and developers.",
		},
	],
});

// Refs
const previewRef = ref();
const showBackground = ref(false);
const backgroundColor = ref("#ffffff");

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
				saveAs(blob, "box-shadow-preview.png");
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