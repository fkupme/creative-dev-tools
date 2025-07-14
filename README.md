# 🎨 Creative Dev Tools

> Комплексный набор инструментов для веб-разработчиков и дизайнеров

[![Build Status](https://ci.appveyor.com/api/projects/status/github/fkupme/creative-dev-tools?branch=main&svg=true)](https://ci.appveyor.com/project/fkupme/creative-dev-tools)
[![Vercel](https://vercelbadge.vercel.app/api/fkupme/creative-dev-tools)](https://creative-dev-tools.vercel.app)
[![Nuxt](https://img.shields.io/badge/Nuxt-3.17-00DC82?logo=nuxt.js)](https://nuxt.com)
[![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js)](https://vuejs.org)

Современное веб-приложение с набором интерактивных генераторов CSS, палитр цветов и других полезных инструментов для творческой разработки.

## ✨ Основные функции

### 🎯 CSS Генераторы

- **Box Shadow Generator** - Создание теней для элементов с предпросмотром
- **Text Shadow Generator** - Генерация теней для текста
- **Gradient Generator** - Создание CSS градиентов (линейных и радиальных)
- **Border Radius Generator** - Настройка закругленных углов
- **Animation Generator** - Создание CSS анимаций и переходов
- **Transform Generator** - Генерация CSS трансформаций

### 🎨 Цветовые инструменты

- **Color Palette Generator** - Создание гармоничных цветовых палитр
- **Color Picker** - Расширенный выбор цветов
- **Contrast Checker** - Проверка контраста для доступности
- **Gradient Palette** - Создание палитр на основе градиентов

### 🛠️ Дополнительные инструменты

- **Code Formatter** - Форматирование CSS/HTML/JS кода
- **Image to CSS** - Конвертация изображений в CSS
- **SVG to CSS** - Работа с SVG в CSS
- **Responsive Preview** - Предпросмотр на разных устройствах

## 🚀 Технологический стек

### 🏗️ Основа

- **Framework:** Nuxt 3 с TypeScript
- **Vue:** Vue 3 с Composition API
- **Сборщик:** Vite (встроенный в Nuxt 3)
- **Стилизация:** Tailwind CSS + кастомные CSS переменные
- **Управление состоянием:** Pinia (@pinia/nuxt)

### 🎨 UI и UX

- **UI Components:** Headless UI (@headlessui/vue)
- **Иконки:**
  - Heroicons (@heroicons/vue)
  - Lucide Vue (lucide-vue-next)
  - Nuxt Icon (@nuxt/icon)
- **Анимации:**
  - VueUse Motion (@vueuse/motion)
  - CSS переходы и keyframes
- **Темы:** Nuxt Color Mode (@nuxtjs/color-mode)
- **Шрифты:** Nuxt Fonts (@nuxt/fonts)

### 🎯 Функциональность генераторов

- **Работа с цветами:**
  - Chroma.js (chroma-js) - для цветовых вычислений
  - Colord (colord) - для конвертации форматов
- **Подсветка кода:** Prism.js (prismjs)
- **Экспорт:**
  - HTML2Canvas (html2canvas) - для создания изображений
  - File-saver (file-saver) - для сохранения файлов
- **Утилиты:**
  - VueUse (@vueuse/nuxt) - композабл утилиты
  - Radash (radash) - функциональные утилиты
  - Nanoid (nanoid) - генерация уникальных ID
  - Zod (zod) - валидация данных

### 🛠️ Разработка

- **DevTools:** Nuxt DevTools (@nuxt/devtools)
- **Образы:** Nuxt Image (@nuxt/image)
- **TypeScript:** Встроенная поддержка в Nuxt 3

## 🎭 Особенности

- 🌙 **Темная/светлая тема** - Автоматическое переключение
- 📱 **Адаптивный дизайн** - Работает на всех устройствах
- ⚡ **Быстрая работа** - Мгновенный предпросмотр изменений
- 💾 **Экспорт результатов** - Скачивание CSS кода и изображений
- 🎨 **Интуитивный интерфейс** - Простое управление слайдерами
- 📋 **Копирование кода** - Один клик для копирования CSS
- 🔧 **Настройка всех параметров** - Полный контроль над свойствами

## 🏗️ Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр продакшен версии
npm run preview
```

## 📂 Структура проекта

```
creative-dev-tools/
├── components/           # Vue компоненты
│   ├── generators/      # Генераторы CSS (планируется)
│   │   ├── BoxShadowGenerator.vue
│   │   ├── TextShadowGenerator.vue
│   │   ├── GradientGenerator.vue
│   │   └── BorderRadiusGenerator.vue
│   ├── ui/             # UI компоненты (✅ готово)
│   │   ├── Button.vue      # Кнопка с вариантами (@headlessui/vue)
│   │   ├── Input.vue       # Поле ввода с валидацией
│   │   ├── Slider.vue      # Слайдер для настроек
│   │   ├── Toggle.vue      # Переключатель (Headless UI)
│   │   ├── Select.vue      # Выпадающий список (Headless UI)
│   │   ├── ColorPicker.vue # Выбор цвета с палитрой (chroma-js)
│   │   ├── CodeBlock.vue   # Блок кода с подсветкой (prismjs)
│   │   └── Modal.vue       # Модальное окно (Headless UI)
│   └── layout/         # Компоненты макета (планируется)
├── layouts/            # Лэйауты Nuxt (✅ готово)
├── pages/              # Страницы приложения
│   ├── index.vue          # Главная страница (✅ готово)
│   ├── shadows/           # Box Shadow Generator
│   ├── text-shadows/      # Text Shadow Generator
│   ├── gradients/         # Gradient Generator
│   └── border-radius/     # Border Radius Generator
├── stores/             # Pinia stores (✅ готово)
├── composables/        # Vue composables (планируется)
│   ├── useShadowGenerator.ts
│   ├── useGradientGenerator.ts
│   └── useExport.ts
├── assets/             # Статические ресурсы (✅ готово)
├── utils/              # Утилиты (планируется)
└── types/              # TypeScript типы (✅ готово)
```

## 🎨 UI Компоненты

### Базовые компоненты на основе Headless UI

- **Button** - Универсальная кнопка с 5 вариантами стилей
  - Технологии: `@headlessui/vue` + `Tailwind CSS`
  - Варианты: primary, secondary, outline, ghost, danger
- **Input** - Поле ввода с иконками и валидацией
  - Технологии: `Vue 3` + `Tailwind CSS` + `@heroicons/vue`
  - Функции: валидация, автофокус, disabled состояния
- **Slider** - Слайдер для настройки числовых параметров
  - Технологии: `Vue 3` + `CSS Custom Properties`
  - Функции: min/max, step, real-time value updates
- **Toggle** - Переключатель на основе Headless UI Switch
  - Технологии: `@headlessui/vue` + `Tailwind CSS`
  - Функции: анимированные переходы, accessibility
- **Select** - Выпадающий список на основе Headless UI Listbox
  - Технологии: `@headlessui/vue` + `@heroicons/vue`
  - Функции: поиск, мульти-выбор, группировка
- **ColorPicker** - Компонент выбора цвета с предустановленными палитрами
  - Технологии: `chroma-js` + `colord` + `Vue 3`
  - Функции: HEX, RGB, HSL форматы, палитры, история
- **CodeBlock** - Блок кода с подсветкой синтаксиса и копированием
  - Технологии: `prismjs` + `Clipboard API`
  - Функции: CSS/JS подсветка, one-click copy
- **Modal** - Модальное окно на основе Headless UI Dialog
  - Технологии: `@headlessui/vue` + `@vueuse/motion`
  - Функции: анимации, focus trap, backdrop click

## 🎪 Планируемые инструменты

### Фаза 1 - Основные генераторы

- [ ] **Box Shadow Generator** - `Vue 3` + `@headlessui/vue` + `chroma-js` (🔄 В разработке)
- [ ] **Text Shadow Generator** - `Vue 3` + `@nuxt/fonts` + `colord`
- [ ] **Gradient Generator** - `Vue 3` + `Canvas API` + `chroma-js`
- [ ] **Border Radius Generator** - `Vue 3` + `SVG` + `CSS Variables`

### Фаза 2 - Цветовые инструменты

- [ ] **Color Palette Generator** - `chroma-js` + `Canvas API` + `Color Theory`
- [ ] **Color Picker** - `colord` + `Vue 3 Reactivity`
- [ ] **Contrast Checker** - `WCAG Guidelines` + `colord`
- [ ] **Color Harmonies** - `chroma-js` + `Color Wheel Math`

### Фаза 3 - Анимации и трансформации

- [ ] **Animation Generator** - `@vueuse/motion` + `CSS @keyframes`
- [ ] **Transform Generator** - `CSS Transforms` + `Matrix Math`
- [ ] **Transition Generator** - `CSS Transitions` + `Timing Functions`
- [ ] **Keyframe Builder** - `Canvas Timeline` + `Vue 3 Drag & Drop`

### Фаза 4 - Дополнительные инструменты

- [ ] **Code Formatter** - `Prettier API` + `prismjs`
- [ ] **SVG to CSS** - `SVG Parser` + `CSS Generation`
- [ ] **CSS Grid Generator** - `CSS Grid` + `Visual Editor`
- [ ] **Flexbox Generator** - `CSS Flexbox` + `Interactive Preview`

## 🏗️ Архитектура генераторов

### Общий паттерн для всех генераторов:

```typescript
// Composable для логики генератора
export function useGenerator() {
  const config = reactive<GeneratorConfig>({...})
  const cssOutput = computed(() => generateCSS(config))
  const exportImage = () => html2canvas(...)
  const copyCSS = () => navigator.clipboard.writeText(...)
  return { config, cssOutput, exportImage, copyCSS }
}

// Компонент страницы
<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Панель настроек -->
    <div class="space-y-4">
      <Slider v-model="config.value" />
      <ColorPicker v-model="config.color" />
      <Toggle v-model="config.enabled" />
    </div>

    <!-- Панель предпросмотра -->
    <div class="preview-panel">
      <div :style="cssOutput">Предпросмотр</div>
    </div>

    <!-- Панель кода -->
    <div class="code-panel">
      <CodeBlock :code="cssOutput" />
      <Button @click="copyCSS">Копировать CSS</Button>
    </div>
  </div>
</template>
```

### Технологии для каждого генератора:

- **Состояние:** `Vue 3 Reactivity` + `Pinia` (для глобального состояния)
- **Вычисления:** `computed` свойства для реактивного CSS
- **UI:** Готовые компоненты из `components/ui/`
- **Экспорт:** `html2canvas` + `file-saver` + `Clipboard API`
- **Цвета:** `chroma-js` + `colord` для всех цветовых операций
- **Анимации:** `@vueuse/motion` для плавных переходов

## 📊 Технологическая карта проекта

### Используемые npm пакеты:

```json
{
	"dependencies": {
		"@headlessui/vue": "^1.7.23", // UI компоненты
		"@heroicons/vue": "^2.2.0", // Иконки
		"@nuxt/fonts": "^0.11.4", // Шрифты
		"@nuxt/icon": "^1.15.0", // Иконки
		"@nuxt/image": "^1.10.0", // Оптимизация изображений
		"@nuxtjs/color-mode": "^3.5.2", // Темная/светлая тема
		"@nuxtjs/tailwindcss": "^6.14.0", // Стилизация
		"@pinia/nuxt": "^0.11.1", // Управление состоянием
		"@vueuse/motion": "^3.0.3", // Анимации
		"@vueuse/nuxt": "^13.5.0", // Утилиты
		"chroma-js": "^3.1.2", // Работа с цветами
		"colord": "^2.9.3", // Конвертация цветов
		"file-saver": "^2.0.5", // Сохранение файлов
		"html2canvas": "^1.4.1", // Экспорт в изображения
		"lucide-vue-next": "^0.525.0", // Дополнительные иконки
		"nanoid": "^5.1.5", // Генерация ID
		"nuxt": "^3.17.6", // Фреймворк
		"prismjs": "^1.30.0", // Подсветка кода
		"radash": "^12.1.1", // Утилиты
		"vue": "^3.5.17", // Реактивность
		"zod": "^3.25.74" // Валидация
	}
}
```

### Архитектурные решения:

- **Композиция над наследованием:** Используем Vue 3 Composition API
- **Реактивность:** Все состояние управляется через `reactive` и `computed`
- **Доступность:** Все компоненты основаны на Headless UI
- **Производительность:** Lazy loading + виртуализация для больших списков
- **Типизация:** Полная типизация с TypeScript
- **Тестирование:** Готовность к unit и e2e тестам

## 🤝 Вклад в проект

Проект создан для портфолио и демонстрации навыков веб-разработки. Предложения по улучшению и новые идеи приветствуются!

## 📝 Лицензия

MIT License - используйте свободно для личных и коммерческих проектов.
