<template>
	<div class="min-h-screen">
		<SeoMetaSeo
			title="Генераторы CSS"
			description="Тени, градиенты, палитры, радиусы и анимации — быстро и наглядно."
			:ogType="'website'"
		/>
		<!-- Hero Section -->
		<section
			class="section-padding bg-gradient-to-br from-primary-50 to-accent-50 dark:from-secondary-900 dark:to-secondary-800"
		>
			<div class="container-fluid">
				<div class="text-center max-w-4xl mx-auto">
					<div class="animate-fade-in">
						<h1 class="text-display gradient-text mb-6">Creative Dev Tools</h1>
						<p class="text-subtitle mb-8 max-w-2xl mx-auto">
							Удобные инструменты для быстрого прототипирования интерфейсов:
							тени, градиенты, палитры, радиусы и анимации — всё в одном месте.
						</p>
						<div
							class="flex flex-col sm:flex-row items-center justify-center gap-3"
						>
							<NuxtLink to="/gradients" class="btn btn-primary btn-lg">
								<Icon name="heroicons:swatch" class="mr-2" />Попробовать
								градиенты
							</NuxtLink>
							<NuxtLink to="/shadows" class="btn btn-ghost btn-lg">
								<Icon name="heroicons:squares-2x2" class="mr-2" />Тени
							</NuxtLink>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Tools Section -->
		<section class="section-padding">
			<div class="container-fluid">
				<div class="text-center mb-10">
					<h2 class="text-title mb-2">Инструменты</h2>
					<p class="text-subtitle max-w-2xl mx-auto">
						Генераторы с единым UX: быстро настраивайте параметры и сразу
						получайте готовый CSS.
					</p>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div
						v-for="tool in tools"
						:key="tool.name"
						class="card card-hover animate-slide-up"
					>
						<div class="p-6">
							<div class="flex items-center justify-between mb-4">
								<div
									:class="[
										'w-12 h-12 rounded-lg flex items-center justify-center',
										tool.color,
									]"
								>
									<Icon :name="tool.icon" class="w-6 h-6 text-white" />
								</div>
								<span v-if="tool.status" :class="tool.statusClass">{{
									tool.status
								}}</span>
							</div>

							<h3 class="text-xl font-semibold mb-2">{{ tool.name }}</h3>
							<p class="text-secondary-600 dark:text-secondary-400 mb-4">
								{{ tool.description }}
							</p>

							<NuxtLink
								:to="tool.disabled ? '#' : tool.href"
								class="btn btn-ghost w-full justify-center"
								:class="{ 'opacity-50 cursor-not-allowed': tool.disabled }"
								@click.prevent="tool.disabled && true"
							>
								<Icon name="heroicons:arrow-right" class="ml-2 w-4 h-4" />
								{{ tool.disabled ? "В разработке" : "Открыть" }}
							</NuxtLink>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- About Section -->
		<section class="section-padding bg-secondary-50 dark:bg-secondary-800">
			<div class="container-fluid">
				<div class="max-w-3xl mx-auto text-center space-y-3">
					<h2 class="text-title">Для чего это</h2>
					<p class="text-secondary-700 dark:text-secondary-300">
						Быстро собирать визуальные идеи и копировать результат в проект.
						Минимум кликов, максимум наглядности.
					</p>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { useHead } from "nuxt/app";
useHead({
	title: "Creative Dev Tools — генераторы CSS",
	meta: [
		{
			name: "description",
			content:
				"Генераторы CSS: тени, градиенты, палитры, радиусы и анимации. Быстро и понятно.",
		},
	],
});

const tools = [
	{
		name: "Box Shadow",
		description: "Создавайте красивые тени для блоков с предпросмотром",
		icon: "heroicons:squares-2x2",
		color: "bg-blue-500",
		href: "/shadows",
		status: "Новый",
		statusClass:
			"px-2 py-1 text-xs font-medium bg-accent-100 text-accent-700 dark:bg-accent-900 dark:text-accent-300 rounded-full",
		disabled: false,
	},
	{
		name: "Gradient Generator",
		description: "Линейные, радиальные и конические градиенты с пресетами",
		icon: "heroicons:swatch",
		color: "bg-purple-500",
		href: "/gradients",
		status: "Новый",
		statusClass:
			"px-2 py-1 text-xs font-medium bg-accent-100 text-accent-700 dark:bg-accent-900 dark:text-accent-300 rounded-full",
		disabled: false,
	},
	{
		name: "Color Palette",
		description: "Готовые цветовые темы, пресеты и тёмные варианты",
		icon: "heroicons:paint-brush",
		color: "bg-pink-500",
		href: "/colors",
		status: "Новый",
		statusClass:
			"px-2 py-1 text-xs font-medium bg-accent-100 text-accent-700 dark:bg-accent-900 dark:text-accent-300 rounded-full",
		disabled: false,
	},
	{
		name: "Text Shadow",
		description: "Тени для текста с гибкими настройками",
		icon: "heroicons:document-text",
		color: "bg-green-500",
		href: "/text-shadows",
		status: "Готово",
		statusClass:
			"px-2 py-1 text-xs font-medium bg-secondary-100 text-secondary-700 dark:bg-secondary-700 dark:text-secondary-300 rounded-full",
		disabled: false,
	},
	{
		name: "Border Radius",
		description: "Точные закругления углов с юнитами и пресетами",
		icon: "heroicons:square-3-stack-3d",
		color: "bg-orange-500",
		href: "/border-radius",
		status: "Готово",
		statusClass:
			"px-2 py-1 text-xs font-medium bg-secondary-100 text-secondary-700 dark:bg-secondary-700 dark:text-secondary-300 rounded-full",
		disabled: false,
	},
	{
		name: "Animation Generator",
		description: "Конструктор @keyframes, пресеты, предпросмотр (бета)",
		icon: "heroicons:bolt",
		color: "bg-yellow-500",
		href: "/animations",
		status: "Бета",
		statusClass:
			"px-2 py-1 text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 rounded-full",
		disabled: false,
	},
	// Planned
	{
		name: "CSS Filters",
		description: "blur, brightness, contrast и пр. — в разработке",
		icon: "heroicons:adjustments-vertical",
		color: "bg-cyan-500",
		href: "#",
		status: "WIP",
		statusClass:
			"px-2 py-1 text-xs font-medium bg-secondary-100 text-secondary-700 dark:bg-secondary-800 dark:text-secondary-300 rounded-full",
		disabled: true,
	},
	{
		name: "Glassmorphism",
		description: "стеклянные карточки, шум, блики — в разработке",
		icon: "heroicons:sparkles",
		color: "bg-slate-500",
		href: "#",
		status: "WIP",
		statusClass:
			"px-2 py-1 text-xs font-medium bg-secondary-100 text-secondary-700 dark:bg-secondary-800 dark:text-secondary-300 rounded-full",
		disabled: true,
	},
	{
		name: "Clip-Path",
		description: "фигуры и маски — в разработке",
		icon: "heroicons:scissors",
		color: "bg-teal-500",
		href: "#",
		status: "WIP",
		statusClass:
			"px-2 py-1 text-xs font-medium bg-secondary-100 text-secondary-700 dark:bg-secondary-800 dark:text-secondary-300 rounded-full",
		disabled: true,
	},
];
</script> 