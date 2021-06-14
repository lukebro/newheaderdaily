module.exports = {
    future: {
        webpack5: true
    },
    async rewrites() {
        return [
            {
                source: '/login',
                destination: '/api/auth/login',
            },
            {
                source: '/logout',
                destination: '/api/auth/logout',
            },
            {
                source: '/auth/callback',
                destination: '/api/auth/callback'
            }
        ];
    },
};
