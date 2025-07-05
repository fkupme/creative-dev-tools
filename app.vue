<template>
	<div class="app">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script setup lang="ts">
// SEO и мета-теги
useHead({
	titleTemplate: "%s - Creative Dev Tools",
	meta: [
		{ charset: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{
			name: "description",
			content:
				"Комплексный набор современных инструментов для веб-разработчиков и дизайнеров",
		},
		{ name: "format-detection", content: "telephone=no" },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "Creative Dev Tools" },
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:site", content: "@creativedevtools" },
	],
	link: [
		{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
		{ rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
	],
});

// Инициализация stores
const appStore = useAppStore();

// Загрузка начальных данных
onMounted(() => {
	// Инициализация приложения
	console.log("🚀 Creative Dev Tools initialized");

	// Загрузка пользовательских настроек
	if (typeof window !== 'undefined') {
		const savedFavorites = localStorage.getItem("creative-dev-tools-favorites");
		if (savedFavorites) {
			try {
				const favorites = JSON.parse(savedFavorites);
				favorites.forEach((id: string) => appStore.toggleFavorite(id));
			} catch (error) {
				console.warn("Failed to load favorites:", error);
			}
		}
	}
});

// Обработка ошибок
onErrorCaptured((error: Error) => {
	console.error("App error:", error);
	appStore.setError(error.message);
	return false;
});
</script>

<style>
.app {
	min-height: 100vh;
}
</style>
