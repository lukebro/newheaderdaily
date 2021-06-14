export class CustomError extends Error {
    constructor(message, code) {
        super(message);

        this.name = 'CustomError';
        this.code = code;
    }
}

export function error(code = 0) {
    const message = MESSAGES[code] || MESSAGES[0];

    return new CustomError(message, code);
}

export const RATE_LIMIT = 1;
export const DISABLED_TOKEN = 2;
export const IMAGE_ERROR = 3;

export const MESSAGES = {
    0: 'Unknown error',
    [RATE_LIMIT]: 'Hit the rate limit of API',
    [DISABLED_TOKEN]: 'Disabled token',
    [IMAGE_ERROR]: 'Could not fetch an image'
};
