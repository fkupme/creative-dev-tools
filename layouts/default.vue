<template>
	<div
		class="min-h-screen bg-white dark:bg-secondary-900 transition-colors duration-300"
	>
		<!-- Header -->
		<header
			class="sticky top-0 z-50 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-md border-b border-secondary-200 dark:border-secondary-700"
		>
			<div class="px-10">
				<div class="flex items-center justify-between h-16">
					<!-- Logo -->
					<NuxtLink to="/" class="flex items-center space-x-2 group">
						<img src="/favicon.svg" alt="Creative Dev Tools" class="h-8 w-8" />
						<span
							class="text-xl font-bold gradient-text group-hover:scale-105 transition-transform"
							>Creative Dev Tools</span
						>
					</NuxtLink>

					<!-- Navigation moved to Drawer -->

					<!-- Actions -->
					<div class="flex items-center space-x-2">
						<!-- Theme Toggle -->
						<button
							@click="toggleDark"
							class="p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
							:title="isDark ? 'Светлая тема' : 'Темная тема'"
						>
							<Icon
								:name="isDark ? 'heroicons:sun' : 'heroicons:moon'"
								class="w-5 h-5 text-secondary-600 dark:text-secondary-400"
							/>
						</button>

						<!-- Drawer Toggle Button -->
						<button
							@click="drawerOpen = true"
							class="p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
							:title="'Меню'"
						>
							<Icon
								name="heroicons:bars-3"
								class="w-5 h-5 text-secondary-600 dark:text-secondary-400"
							/>
						</button>
					</div>
				</div>
			</div>

			<!-- Drawer Menu -->
			<TransitionRoot as="template" :show="drawerOpen">
				<Dialog as="div" class="relative z-[60]" @close="drawerOpen = false">
					<TransitionChild
						as="template"
						enter="ease-out duration-200"
						enter-from="opacity-0"
						enter-to="opacity-100"
						leave="ease-in duration-150"
						leave-from="opacity-100"
						leave-to="opacity-0"
					>
						<div class="fixed inset-0 bg-black/30" />
					</TransitionChild>

					<div class="fixed inset-0 overflow-hidden">
						<div class="absolute inset-0 overflow-hidden">
							<div class="fixed inset-y-0 left-0 max-w-full flex">
								<TransitionChild
									as="template"
									enter="transform transition ease-out duration-200"
									enter-from="-translate-x-full"
									enter-to="translate-x-0"
									leave="transform transition ease-in duration-150"
									leave-from="translate-x-0"
									leave-to="-translate-x-full"
								>
									<DialogPanel class="w-screen max-w-sm">
										<div
											class="h-full flex flex-col bg-white dark:bg-secondary-900 border-r border-secondary-200 dark:border-secondary-700"
										>
											<div
												class="px-4 py-4 flex items-center justify-between border-b border-secondary-200 dark:border-secondary-700"
											>
												<div class="flex items-center space-x-2">
													<img
														src="/favicon.svg"
														alt="Creative Dev Tools"
														class="h-8 w-8"
													/>
													<span class="text-base font-semibold gradient-text"
														>Creative Dev Tools</span
													>
												</div>
												<button
													@click="drawerOpen = false"
													class="p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800"
												>
													<Icon
														name="heroicons:x-mark"
														class="w-5 h-5 text-secondary-600 dark:text-secondary-400"
													/>
												</button>
											</div>
											<nav class="p-3 space-y-1">
												<NuxtLink
													v-for="item in navigation"
													:key="item.name"
													:to="item.disabled ? '#' : item.href"
													class="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-secondary-100 dark:hover:bg-secondary-800"
													:class="[
														$route.path === item.href && !item.disabled
															? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
															: 'text-secondary-700 dark:text-secondary-300',
														item.disabled
															? 'opacity-50 cursor-not-allowed'
															: '',
													]"
													:aria-disabled="item.disabled ? 'true' : 'false'"
													@click.prevent="item.disabled && (drawerOpen = false)"
													@click="!item.disabled && (drawerOpen = false)"
												>
													<span>{{ item.name }}</span>
													<span
														v-if="item.status === 'beta'"
														class="ml-2 text-[10px] px-1 py-0.5 rounded bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
														>Бета</span
													>
													<span
														v-else-if="item.disabled"
														class="ml-2 text-[10px] px-1 py-0.5 rounded bg-secondary-100 text-secondary-700 dark:bg-secondary-800 dark:text-secondary-300"
														>WIP</span
													>
												</NuxtLink>
											</nav>
										</div>
									</DialogPanel>
								</TransitionChild>
							</div>
						</div>
					</div>
				</Dialog>
			</TransitionRoot>
		</header>

		<!-- Main Content -->
		<main class="flex-1">
			<slot />
		</main>

		<!-- Footer -->
		<footer
			class="bg-secondary-50 dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-700"
		>
			<div class="px-10 py-8">
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
						<a
							href="https://github.com/fkupme/creative-dev-tools"
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
import {
	Dialog,
	DialogPanel,
	TransitionChild,
	TransitionRoot,
} from "@headlessui/vue";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const drawerOpen = ref(false);

const navigation: Array<{
	name: string;
	href: string;
	disabled?: boolean;
	status?: "beta" | "new" | "wip";
}> = [
	{ name: "Главная", href: "/" },
	{ name: "Тени", href: "/shadows" },
	{ name: "Текстовые тени", href: "/text-shadows" },
	{ name: "Градиенты", href: "/gradients" },
	{ name: "Цвета", href: "/colors" },
	{ name: "Радиус", href: "/border-radius" },
	{ name: "Анимации", href: "/animations", status: "beta" },
	// Planned
	{ name: "Фильтры", href: "#", disabled: true },
	{ name: "Glassmorphism", href: "#", disabled: true },
	{ name: "Clip-Path", href: "#", disabled: true },
];

const isDark = ref(false);

onMounted(() => {
	try {
		const stored = localStorage.getItem("nuxt-color-mode");
		isDark.value = stored
			? stored === "dark"
			: document.documentElement.classList.contains("dark");
	} catch {}
});

const toggleDark = () => {
	isDark.value = !isDark.value;
	const html = document.documentElement;
	if (isDark.value) {
		html.classList.add("dark");
		try {
			localStorage.setItem("nuxt-color-mode", "dark");
		} catch {}
	} else {
		html.classList.remove("dark");
		try {
			localStorage.setItem("nuxt-color-mode", "light");
		} catch {}
	}
};

// Закрытие меню при изменении маршрута
const route = useRoute();
watch(
	() => route.path,
	() => {
		drawerOpen.value = false;
	}
);
</script> 