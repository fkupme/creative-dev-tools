<template>
	<div class="min-h-screen">
		<!-- Hero Section -->
		<section
			class="section-padding bg-gradient-to-br from-primary-50 to-accent-50 dark:from-secondary-900 dark:to-secondary-800"
		>
			<div class="container-fluid">
				<div class="text-center max-w-4xl mx-auto">
					<div class="animate-fade-in">
						<h1 class="text-display gradient-text mb-6">Creative Dev Tools</h1>
						<p class="text-subtitle mb-8 max-w-2xl mx-auto">
							Комплексный набор современных инструментов для веб-разработчиков и
							дизайнеров. Создавайте красивые CSS эффекты, градиенты, тени и
							анимации без лишних усилий.
						</p>
						<div
							class="flex flex-col sm:flex-row items-center justify-center gap-4"
						>
							<NuxtLink
								to="/shadows"
								class="btn btn-primary btn-lg animate-scale-up"
							>
								<Icon name="heroicons:squares-2x2" class="mr-2" />
								Начать создавать
							</NuxtLink>
							<NuxtLink
								to="/colors"
								class="btn btn-outline btn-lg animate-scale-up"
							>
								<Icon name="heroicons:swatch" class="mr-2" />
								Палитра цветов
							</NuxtLink>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Features Section -->
		<section class="section-padding">
			<div class="container-fluid">
				<div class="text-center mb-16">
					<h2 class="text-title mb-4">Все инструменты в одном месте</h2>
					<p class="text-subtitle max-w-2xl mx-auto">
						Создавайте профессиональные CSS эффекты с помощью интуитивно
						понятных инструментов
					</p>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div
						v-for="(tool, index) in tools"
						:key="tool.name"
						class="card card-hover animate-slide-up"
						:style="{ animationDelay: `${index * 100}ms` }"
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
								<span
									v-if="tool.status === 'new'"
									class="px-2 py-1 text-xs font-medium bg-accent-100 text-accent-700 dark:bg-accent-900 dark:text-accent-300 rounded-full"
								>
									Новый
								</span>
								<span
									v-else-if="tool.status === 'coming'"
									class="px-2 py-1 text-xs font-medium bg-secondary-100 text-secondary-700 dark:bg-secondary-700 dark:text-secondary-300 rounded-full"
								>
									Скоро
								</span>
							</div>

							<h3 class="text-xl font-semibold mb-2">{{ tool.name }}</h3>
							<p class="text-secondary-600 dark:text-secondary-400 mb-4">
								{{ tool.description }}
							</p>

							<NuxtLink
								:to="tool.href"
								class="btn btn-ghost w-full justify-center"
								:class="{ 'opacity-50 cursor-not-allowed': tool.disabled }"
							>
								<Icon name="heroicons:arrow-right" class="ml-2 w-4 h-4" />
								{{ tool.disabled ? "Скоро" : "Попробовать" }}
							</NuxtLink>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Stats Section -->
		<section class="section-padding bg-secondary-50 dark:bg-secondary-800">
			<div class="container-fluid">
				<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
					<div
						v-for="stat in stats"
						:key="stat.label"
						class="text-center animate-float"
					>
						<div
							class="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2"
						>
							{{ stat.value }}
						</div>
						<div class="text-sm text-secondary-600 dark:text-secondary-400">
							{{ stat.label }}
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- CTA Section -->
		<section class="section-padding">
			<div class="container-fluid">
				<div class="text-center max-w-3xl mx-auto">
					<h2 class="text-title mb-4">Готовы начать творить?</h2>
					<p class="text-subtitle mb-8">
						Присоединяйтесь к тысячам разработчиков, которые уже используют наши
						инструменты
					</p>
					<div
						class="flex flex-col sm:flex-row items-center justify-center gap-4"
					>
						<NuxtLink to="/shadows" class="btn btn-primary btn-lg">
							<Icon name="heroicons:sparkles" class="mr-2" />
							Начать бесплатно
						</NuxtLink>
						<a
							href="https://github.com"
							target="_blank"
							rel="noopener noreferrer"
							class="btn btn-outline btn-lg"
						>
							<Icon name="heroicons:code-bracket" class="mr-2" />
							Посмотреть на GitHub
						</a>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
useHead({
	title: "Creative Dev Tools - Инструменты для веб-разработки",
	meta: [
		{
			name: "description",
			content:
				"Комплексный набор современных инструментов для веб-разработчиков и дизайнеров. Создавайте красивые CSS эффекты, градиенты, тени и анимации.",
		},
	],
});

const tools = [
	{
		name: "Box Shadow Generator",
		description:
			"Создавайте красивые тени для элементов с предпросмотром в реальном времени",
		icon: "heroicons:squares-2x2",
		color: "bg-blue-500",
		href: "/shadows",
		status: "new",
		disabled: false,
	},
	{
		name: "Gradient Generator",
		description:
			"Генерируйте линейные и радиальные градиенты с полным контролем",
		icon: "heroicons:swatch",
		color: "bg-purple-500",
		href: "/gradients",
		status: "coming",
		disabled: true,
	},
	{
		name: "Color Palette",
		description: "Создавайте гармоничные цветовые палитры для ваших проектов",
		icon: "heroicons:paint-brush",
		color: "bg-pink-500",
		href: "/colors",
		status: "coming",
		disabled: true,
	},
	{
		name: "Text Shadow",
		description:
			"Добавляйте стильные тени к тексту с настраиваемыми параметрами",
		icon: "heroicons:document-text",
		color: "bg-green-500",
		href: "/text-shadows",
		status: "coming",
		disabled: true,
	},
	{
		name: "Border Radius",
		description: "Создавайте идеальные закругленные углы для любых элементов",
		icon: "heroicons:square-3-stack-3d",
		color: "bg-orange-500",
		href: "/border-radius",
		status: "coming",
		disabled: true,
	},
	{
		name: "Animation Generator",
		description: "Создавайте плавные CSS анимации и переходы",
		icon: "heroicons:bolt",
		color: "bg-yellow-500",
		href: "/animations",
		status: "coming",
		disabled: true,
	},
];

const stats = [
	{ value: "10+", label: "Инструментов" },
	{ value: "1000+", label: "Пользователей" },
	{ value: "50+", label: "Пресетов" },
	{ value: "24/7", label: "Поддержка" },
];
</script> 