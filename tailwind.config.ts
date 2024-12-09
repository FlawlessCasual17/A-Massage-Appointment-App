import type { Config } from 'tailwindcss'

export default {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)'
            },
            spacing: {
                'spacing-space-space-x-2': '8px',
                'sizing-width-w-5': '20px',
                'sizing-height-h-5': '20px',
                'spacing-padding-px-05': '2px',
                'spacing-padding-py-05': '2px',
                'sizing-width-w-12': '48px',
                'spacing-padding-px-4': '16px',
                'spacing-padding-py-35': '14px',
                'sizing-min-height-min-h-6': '24px',
                'sizing-max-height-max-h-16': '64px'
            },
            /* fontFamily: {
                inter: 'Inter'
            }, */
            borderRadius: {
                '9980xl': '9999px',
                'borders-radius-rounded-full': '9999px',
                'borders-radius-rounded-lg': '8px'
            }
        }
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    daisyui: {
        themes: [
            'light',
            'dark'
        ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
        darkTheme: 'dark', // name of one of the included themes for dark mode
        darkMode: ['class', '[data-theme="dark"]'],
        base: false, // applies background color and foreground color for root element by default
        styled: true, // include daisyUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
        logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
        themeRoot: ':root', // The element that receives theme color CSS variables
    }
} satisfies Config

