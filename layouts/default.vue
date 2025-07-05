<template>
	<div
		class="min-h-screen bg-white dark:bg-secondary-900 transition-colors duration-300"
	>
		<!-- Header -->
		<header
			class="sticky top-0 z-50 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-md border-b border-secondary-200 dark:border-secondary-700"
		>
			<div class="container-fluid">
				<div class="flex items-center justify-between h-16">
					<!-- Logo -->
					<NuxtLink to="/" class="flex items-center space-x-2 group">
						<div
							class="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center"
						>
							<Icon name="heroicons:squares-2x2" class="w-5 h-5 text-white" />
						</div>
						<span
							class="text-xl font-bold gradient-text group-hover:scale-105 transition-transform"
						>
							Creative Dev Tools
						</span>
					</NuxtLink>

					<!-- Navigation -->
					<nav class="hidden md:flex items-center space-x-1">
						<NuxtLink
							v-for="item in navigation"
							:key="item.name"
							:to="item.href"
							class="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-secondary-100 dark:hover:bg-secondary-800"
							:class="[
								$route.path === item.href
									? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
									: 'text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-secondary-100',
							]"
						>
							{{ item.name }}
						</NuxtLink>
					</nav>

					<!-- Actions -->
					<div class="flex items-center space-x-2">
						<!-- Theme Toggle -->
						<button
							@click="toggleColorMode"
							class="p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
							:title="
								$colorMode.value === 'dark' ? 'Светлая тема' : 'Темная тема'
							"
						>
							<Icon
								:name="
									$colorMode.value === 'dark'
										? 'heroicons:sun'
										: 'heroicons:moon'
								"
								class="w-5 h-5 text-secondary-600 dark:text-secondary-400"
							/>
						</button>

						<!-- Mobile Menu Button -->
						<button
							@click="mobileMenuOpen = !mobileMenuOpen"
							class="md:hidden p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
						>
							<Icon
								:name="mobileMenuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'"
								class="w-5 h-5 text-secondary-600 dark:text-secondary-400"
							/>
						</button>
					</div>
				</div>
			</div>

			<!-- Mobile Menu -->
			<div
				v-if="mobileMenuOpen"
				class="md:hidden border-t border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900"
			>
				<div class="container-fluid py-4 space-y-2">
					<NuxtLink
						v-for="item in navigation"
						:key="item.name"
						:to="item.href"
						class="block px-3 py-2 rounded-lg text-base font-medium transition-colors"
						:class="[
							$route.path === item.href
								? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
								: 'text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-secondary-100 hover:bg-secondary-100 dark:hover:bg-secondary-800',
						]"
						@click="mobileMenuOpen = false"
					>
						{{ item.name }}
					</NuxtLink>
				</div>
			</div>
		</header>

		<!-- Main Content -->
		<main class="flex-1">
			<slot />
		</main>

		<!-- Footer -->
		<footer
			class="bg-secondary-50 dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-700"
		>
			<div class="container-fluid py-8">
				<div class="flex flex-col md:flex-row items-center justify-between">
					<div class="flex items-center space-x-2 mb-4 md:mb-0">
						<div
							class="w-6 h-6 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center"
						>
							<Icon name="heroicons:squares-2x2" class="w-4 h-4 text-white" />
						</div>
						<span class="text-secondary-600 dark:text-secondary-400">
							Creative Dev Tools
						</span>
					</div>

					<div
						class="flex items-center space-x-4 text-sm text-secondary-500 dark:text-secondary-500"
					>
						<span>© 2024 Creative Dev Tools</span>
						<span>•</span>
						<a
							href="https://github.com"
							target="_blank"
							rel="noopener noreferrer"
							class="hover:text-primary-500 transition-colors"
						>
							GitHub
						</a>
					</div>
				</div>
			</div>
		</footer>
	</div>
</template>

<script setup lang="ts">
const mobileMenuOpen = ref(false);

const navigation = [
	{ name: "Главная", href: "/" },
	{ name: "Тени", href: "/shadows" },
	{ name: "Градиенты", href: "/gradients" },
	{ name: "Цвета", href: "/colors" },
	{ name: "Анимации", href: "/animations" },
];

const colorMode = useColorMode();

const toggleColorMode = () => {
	colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

// Закрытие мобильного меню при изменении маршрута
watch(
	() => useRoute().path,
	() => {
		mobileMenuOpen.value = false;
	}
);
</script> 