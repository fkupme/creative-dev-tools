<template>
	<div class="relative">
		<div class="flex items-center justify-between mb-2">
			<h3
				v-if="title"
				class="text-sm font-medium text-secondary-700 dark:text-secondary-300"
			>
				{{ title }}
			</h3>
			<div class="flex items-center space-x-2">
				<button
					v-if="copyable"
					@click="copyCode"
					class="p-1 rounded hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
					:title="copied ? 'Скопировано!' : 'Копировать код'"
				>
					<Icon
						:name="copied ? 'heroicons:check' : 'heroicons:clipboard'"
						class="w-4 h-4 text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-300"
					/>
				</button>
				<button
					v-if="downloadable"
					@click="downloadCode"
					class="p-1 rounded hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
					title="Скачать файл"
				>
					<Icon
						name="heroicons:arrow-down-tray"
						class="w-4 h-4 text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-300"
					/>
				</button>
			</div>
		</div>

		<div
			class="code-block relative overflow-x-auto"
			:class="{ 'max-h-64': scrollable }"
		>
			<pre
				class="text-sm leading-relaxed"
			><code v-html="highlightedCode"></code></pre>

			<!-- Copy Success Toast -->
			<div
				v-if="copied"
				class="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs"
			>
				Скопировано!
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { saveAs } from "file-saver";

interface Props {
	code: string;
	language?: string;
	title?: string;
	copyable?: boolean;
	downloadable?: boolean;
	scrollable?: boolean;
	filename?: string;
}

const props = defineProps<Props>();

const copied = ref(false);

const highlightedCode = computed(() => {
	// Простая подсветка CSS синтаксиса
	if (props.language === "css") {
		return props.code
			.replace(
				/([a-zA-Z-]+)(?=\s*:)/g,
				'<span class="text-blue-600 dark:text-blue-400">$1</span>'
			)
			.replace(
				/:\s*([^;]+)/g,
				': <span class="text-green-600 dark:text-green-400">$1</span>'
			)
			.replace(
				/({|})/g,
				'<span class="text-purple-600 dark:text-purple-400">$1</span>'
			)
			.replace(
				/(\/\*[\s\S]*?\*\/)/g,
				'<span class="text-gray-500 dark:text-gray-400">$1</span>'
			);
	}

	// Простая подсветка HTML
	if (props.language === "html") {
		return props.code
			.replace(
				/(&lt;[^&]*&gt;)/g,
				'<span class="text-blue-600 dark:text-blue-400">$1</span>'
			)
			.replace(
				/(&lt;\/?[a-zA-Z]+)/g,
				'<span class="text-purple-600 dark:text-purple-400">$1</span>'
			);
	}

	// Без подсветки
	return props.code;
});

const copyCode = async () => {
	try {
		await navigator.clipboard.writeText(props.code);
		copied.value = true;
		setTimeout(() => {
			copied.value = false;
		}, 2000);
	} catch (error) {
		console.error("Failed to copy code:", error);
		// Fallback для старых браузеров
		const textArea = document.createElement("textarea");
		textArea.value = props.code;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand("copy");
		document.body.removeChild(textArea);
		copied.value = true;
		setTimeout(() => {
			copied.value = false;
		}, 2000);
	}
};

const downloadCode = () => {
	const filename = props.filename || `code.${props.language || "txt"}`;
	const blob = new Blob([props.code], { type: "text/plain;charset=utf-8" });
	saveAs(blob, filename);
};
</script> 