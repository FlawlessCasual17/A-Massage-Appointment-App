import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'

export default {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        'node_modules/daisyui/dist/**/*.js',
        'node_modules/react-daisyui/dist/**/*.js'
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
    plugins: [
        require('@tailwindcss/typography'),
        daisyui
    ]
} satisfies Config

