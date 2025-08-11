<template>
	<div
		style="
			width: 1200px;
			height: 630px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: 72px;
			background: radial-gradient(
				1200px_630px_at_0%_0%,
				#0f172a_0%,
				#111827_50%,
				#030712_100%
			);
			color: #e5e7eb;
			font-family: Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI',
				Roboto, Ubuntu, Cantarell, 'Noto Sans', 'Helvetica Neue', Arial,
				'Apple Color Emoji', 'Segoe UI Emoji';
		"
	>
		<div
			style="display: flex; align-items: center; gap: 24px; margin-bottom: 32px"
		>
			<!-- Logo Mark -->
			<div
				style="
					width: 72px;
					height: 72px;
					border-radius: 16px;
					display: grid;
					place-items: center;
					background: linear-gradient(135deg, #00DC82_0%, #7C3AED_100%);
					box-shadow: 0_10px_30px_rgba (0, 0, 0, 0.35);
				"
			>
				<svg
					width="38"
					height="38"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect x="2" y="2" width="8" height="8" rx="2.25" fill="white" />
					<rect
						x="14"
						y="2"
						width="8"
						height="8"
						rx="2.25"
						fill="white"
						opacity="0.9"
					/>
					<rect
						x="2"
						y="14"
						width="8"
						height="8"
						rx="2.25"
						fill="white"
						opacity="0.9"
					/>
					<rect x="14" y="14" width="8" height="8" rx="2.25" fill="white" />
				</svg>
			</div>
			<div style="display: flex; flex-direction: column">
				<span
					style="
						letter-spacing: 0.06em;
						text-transform: uppercase;
						font-size: 18px;
						color: #a5b4fc;
					"
					>Creative Dev Tools</span
				>
				<span style="font-weight: 700; font-size: 28px; color: #e2e8f0"
					>CSS Generators</span
				>
			</div>
		</div>

		<h1
			style="
				font-size: 72px;
				line-height: 1.05;
				font-weight: 800;
				margin: 0_0_8px_0;
				background: linear-gradient(90deg, #34d399, #60a5fa, #a78bfa);
				-webkit-background-clip: text;
				background-clip: text;
				color: transparent;
			"
		>
			{{ title || defaultTitle }}
		</h1>
		<p style="font-size: 30px; color: #94a3b8; margin: 0; max-width: 900px">
			{{ subtitle || defaultSubtitle }}
		</p>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	title?: string;
	subtitle?: string;
}>();

const defaultTitle = "Генераторы CSS без боли";
const defaultSubtitle =
	"Тени, градиенты, палитры, радиусы и анимации — быстро и наглядно.";
</script>


