<template>
	<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
		<header
			class="border-b border-secondary-200 dark:border-secondary-700 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-md"
		>
			<div class="container-fluid h-16 flex items-center justify-between">
				<h1 class="text-lg md:text-xl font-semibold">
					Border Radius Generator
				</h1>
				<div class="flex items-center gap-2">
					<UiButton size="sm" variant="ghost" @click="copyCSS">
						<Icon name="heroicons:clipboard" class="w-4 h-4 mr-1" />Копировать
						CSS
					</UiButton>
				</div>
			</div>
		</header>

		<div class="container-fluid py-8">
			<div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
				<!-- Controls -->
				<div class="xl:col-span-1 xl:sticky xl:top-24 space-y-6 card p-6">
					<p class="text-xs text-secondary-500">
						Выберите единицы измерения (px, %, rem) и настройте радиусы каждого
						угла.
					</p>
					<UiSelect
						:model-value="config.unit"
						@update:model-value="(v) => (config.unit = v)"
						:options="units"
					/>
					<UiSlider
						:model-value="config.topLeft"
						@update:model-value="(v) => (config.topLeft = v)"
						label="Top Left"
						:min="0"
						:max="128"
					/>
					<UiSlider
						:model-value="config.topRight"
						@update:model-value="(v) => (config.topRight = v)"
						label="Top Right"
						:min="0"
						:max="128"
					/>
					<UiSlider
						:model-value="config.bottomRight"
						@update:model-value="(v) => (config.bottomRight = v)"
						label="Bottom Right"
						:min="0"
						:max="128"
					/>
					<UiSlider
						:model-value="config.bottomLeft"
						@update:model-value="(v) => (config.bottomLeft = v)"
						label="Bottom Left"
						:min="0"
						:max="128"
					/>

					<!-- Quick presets -->
					<div class="pt-2">
						<h3 class="text-sm font-medium mb-2">Быстрые пресеты</h3>
						<div class="flex flex-wrap gap-2">
							<UiButton size="sm" variant="ghost" @click="applyPreset(0)"
								>0</UiButton
							>
							<UiButton size="sm" variant="ghost" @click="applyPreset(4)"
								>4</UiButton
							>
							<UiButton size="sm" variant="ghost" @click="applyPreset(8)"
								>8</UiButton
							>
							<UiButton size="sm" variant="ghost" @click="applyPreset(16)"
								>16</UiButton
							>
							<UiButton size="sm" variant="ghost" @click="applyPreset(32)"
								>32</UiButton
							>
							<UiButton size="sm" variant="ghost" @click="applyPreset(9999)"
								>Pill</UiButton
							>
						</div>
					</div>
				</div>

				<!-- Preview & Code -->
				<div class="xl:col-span-2 space-y-6">
					<div class="card p-6">
						<div
							class="w-full h-64 sm:h-80 lg:h-96 border bg-white dark:bg-secondary-800"
							:style="{ borderRadius: borderRadiusValue }"
						/>
					</div>
					<div class="card p-6">
						<UiCodeBlock :code="cssCode" language="css" title="CSS" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useHead } from "nuxt/app";
import { useBorderRadiusGenerator } from "~/composables/useBorderRadiusGenerator";

useHead({ title: "Border Radius Generator" });

const { config, borderRadiusValue, cssCode, copyToClipboard } =
	useBorderRadiusGenerator();

const units = [
	{ label: "px", value: "px" },
	{ label: "%", value: "%" },
	{ label: "rem", value: "rem" },
];

const copyCSS = async () => {
	await copyToClipboard();
};

const applyPreset = (v: number) => {
	config.value.topLeft = v;
	config.value.topRight = v;
	config.value.bottomRight = v;
	config.value.bottomLeft = v;
};
</script>
