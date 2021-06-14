function gated(req, res, next) {
    if (!req.user) {
        res.status(401).json({
            error: {
                code: 'UNAUTHORIZED',
                message: 'The request is missing the authorization cookie.',
            },
        });

        return;
    }

    next();
}

export default gated;
