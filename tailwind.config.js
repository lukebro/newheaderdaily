module.exports = {
    purge: ['./src/pages/**/*.js', './src/components/**/*.js'],
    darkMode: false, // or 'media' or 'class'
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
