/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./app.vue",
		"./error.vue"
	],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace']
			},
			colors: {
				// Кастомная палитра для Creative Dev Tools
				primary: {
					50: '#f0f9ff',
					100: '#e0f2fe',
					200: '#bae6fd',
					300: '#7dd3fc',
					400: '#38bdf8',
					500: '#0ea5e9',
					600: '#0284c7',
					700: '#0369a1',
					800: '#075985',
					900: '#0c4a6e',
					950: '#082f49'
				},
				secondary: {
					50: '#f8fafc',
					100: '#f1f5f9',
					200: '#e2e8f0',
					300: '#cbd5e1',
					400: '#94a3b8',
					500: '#64748b',
					600: '#475569',
					700: '#334155',
					800: '#1e293b',
					900: '#0f172a',
					950: '#020617'
				},
				accent: {
					50: '#fdf4ff',
					100: '#fae8ff',
					200: '#f5d0fe',
					300: '#f0abfc',
					400: '#e879f9',
					500: '#d946ef',
					600: '#c026d3',
					700: '#a21caf',
					800: '#86198f',
					900: '#701a75',
					950: '#4a044e'
				},
				surface: {
					light: '#ffffff',
					dark: '#0f172a'
				},
				border: {
					light: '#e2e8f0',
					dark: '#334155'
				}
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem'
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.3s ease-out',
				'slide-down': 'slideDown 0.3s ease-out',
				'scale-up': 'scaleUp 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite'
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				slideUp: {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				slideDown: {
					'0%': { transform: 'translateY(-10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				scaleUp: {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				}
			},
			backdropBlur: {
				xs: '2px'
			},
			boxShadow: {
				'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
				'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
				'hard': '0 10px 40px -10px rgba(0, 0, 0, 0.2), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
				'glow': '0 0 20px rgba(14, 165, 233, 0.3)',
				'glow-accent': '0 0 20px rgba(217, 70, 239, 0.3)'
			}
		}
	},
	plugins: []
} 