module.exports = {
    content: ['./src/pages/**/*.js', './src/components/**/*.js'],
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
