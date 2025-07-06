# Box Shadow Components

Набор компонентов для создания генератора теней CSS.

## Компоненты

### BoxShadowHeader

Заголовок с навигацией и кнопками экспорта.

**Props:** нет

**Events:**

- `export-css` - экспорт CSS кода в буфер обмена
- `export-image` - экспорт изображения в PNG

### BoxShadowControls

Основная панель управления настройками теней.

**Props:**

- `shadowConfig: BoxShadowConfig` - конфигурация одиночной тени
- `shadowLayers: BoxShadowConfig[]` - массив слоев для множественных теней
- `enableMultipleShadows: boolean` - режим множественных теней
- `presets: BoxShadowPreset[]` - массив пресетов

**Events:**

- `update-config` - обновление конфигурации одиночной тени
- `toggle-multiple-shadows` - переключение режима множественных теней
- `add-layer` - добавление нового слоя
- `remove-layer` - удаление слоя
- `update-layer` - обновление конфигурации слоя
- `apply-preset` - применение пресета

### BoxShadowLayer

Компонент для управления отдельным слоем тени.

**Props:**

- `layer: BoxShadowConfig` - конфигурация слоя
- `index: number` - индекс слоя

**Events:**

- `update` - обновление конфигурации слоя
- `remove` - удаление слоя

### BoxShadowPreview

Панель предпросмотра теней.

**Props:**

- `showBackground: boolean` - показывать фоновую сетку
- `computedBoxShadow: string` - вычисленное значение CSS

**Events:**

- `toggle-background` - переключение фоновой сетки

### BoxShadowCodeOutput

Компонент для вывода CSS кода.

**Props:**

- `cssCode: string` - CSS код для отображения

## Использование

```vue
<template>
	<BoxShadowHeader @export-css="exportCSS" @export-image="exportImage" />

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

	<BoxShadowPreview
		:show-background="showBackground"
		:computed-box-shadow="computedBoxShadow"
		@toggle-background="toggleBackground"
	/>

	<BoxShadowCodeOutput :css-code="cssCode" />
</template>
```

## Автоимпорт

Компоненты автоматически импортируются с префиксом `BoxShadow` благодаря настройке в `nuxt.config.ts`.

## Типы

Все компоненты используют типы из `~/types/index.ts`:

- `BoxShadowConfig` - конфигурация тени
- `BoxShadowPreset` - пресет тени
