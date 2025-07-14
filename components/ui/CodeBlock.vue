<template>
	<div class="relative">
		<div class="flex items-center justify-between mb-2" v-if="title">
			<h3
				class="text-sm font-medium text-secondary-700 dark:text-secondary-300"
			>
				{{ title }}
			</h3>
		</div>

		<div
			class="relative code-block overflow-x-auto"
			:class="{ 'max-h-64': scrollable }"
		>
			<pre
				class="text-sm leading-relaxed p-4 bg-gray-900 dark:bg-gray-800 rounded-lg text-gray-100 relative"
			><code v-html="highlightedCode"></code></pre>

			<!-- Copy Button -->
			<button
				@click="copyCode"
				class="absolute top-2 right-2 p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
				:title="copied ? 'Скопировано!' : 'Копировать код'"
			>
				<Icon
					:name="copied ? 'heroicons:check' : 'heroicons:clipboard'"
					class="w-4 h-4"
					:class="copied ? 'text-green-400' : 'text-gray-400 hover:text-white'"
				/>
			</button>

			<!-- Copy Success Toast -->
			<div
				v-if="copied"
				class="absolute top-2 right-12 bg-green-500 text-white px-2 py-1 rounded text-xs"
			>
				Скопировано!
			</div>
		</div>

		<!-- Download Button -->
		<div v-if="downloadable" class="mt-2 text-right">
			<button
				@click="downloadCode"
				class="text-sm text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-300 transition-colors"
			>
				<Icon name="heroicons:arrow-down-tray" class="w-4 h-4 mr-1" />
				Скачать файл
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { saveAs } from "file-saver";
import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import typescript from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/tokyo-night-dark.css";
import { computed, ref } from "vue";

// Регистрируем языки
hljs.registerLanguage("css", css);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("json", json);

interface Props {
	code: string;
	language?: string;
	title?: string;
	copyable?: boolean;
	downloadable?: boolean;
	scrollable?: boolean;
	filename?: string;
}

const props = withDefaults(defineProps<Props>(), {
	copyable: true,
	downloadable: false,
	scrollable: true,
	language: "css",
});

const copied = ref(false);

const highlightedCode = computed(() => {
	if (!props.code) return "";

	try {
		// Форматируем CSS код
		let formattedCode = props.code;
		if (props.language === "css") {
			formattedCode = formatCSS(props.code);
		}

		// Используем highlight.js для подсветки
		const result = hljs.highlight(formattedCode, { language: props.language });
		return result.value;
	} catch (error) {
		console.warn("Highlighting failed:", error);
		// Фallback - возвращаем код как есть
		return props.code;
	}
});

// Улучшенный форматтер CSS
const formatCSS = (css: string): string => {
	return css
		.replace(/\s*{\s*/g, " {\n  ")
		.replace(/;\s*(?!$)/g, ";\n  ") // не добавляем перенос после последней точки с запятой
		.replace(/\s*}\s*/g, "\n}")
		.replace(/,\s*(?=\S)/g, ",\n    ") // для множественных теней
		.replace(/\s+/g, " ") // удаляем лишние пробелы
		.trim();
};

const copyCode = async () => {
	if (!props.copyable) return;

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
	if (!props.downloadable) return;

	const filename = props.filename || `code.${props.language || "txt"}`;
	const blob = new Blob([props.code], { type: "text/plain;charset=utf-8" });
	saveAs(blob, filename);
};
</script>

<style scoped>
.code-block {
	position: relative;
}

.code-block pre {
	margin: 0;
	background: #1a1b23;
	border: 1px solid #2d3748;
}

.code-block code {
	font-family: "Fira Code", "Consolas", "Monaco", monospace;
	font-size: 0.875rem;
	line-height: 1.5;
}

/* Переопределяем стили highlight.js */
.code-block :deep(.hljs) {
	background: #1a1b23 !important;
	color: #a9b1d6 !important;
}

.code-block :deep(.hljs-property) {
	color: #7dcfff !important;
}

.code-block :deep(.hljs-value) {
	color: #9ece6a !important;
}

.code-block :deep(.hljs-number) {
	color: #ff9e64 !important;
}

.code-block :deep(.hljs-string) {
	color: #9ece6a !important;
}

.code-block :deep(.hljs-comment) {
	color: #565f89 !important;
}
</style> 