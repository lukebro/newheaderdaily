module.exports = {
    content: ['./src/pages/**/*.{ts,js,tsx,jsx}', './src/components/**/*.{ts,js,tsx,jsx}'],
    theme: {
        extend: {},
    },
    variants: {
        extend: {
            scale: ['hover'],
            transform: ['hover']
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
