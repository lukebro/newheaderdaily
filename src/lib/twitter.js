import Twitter from 'twitter-lite';

export default function twitter(token, tokenSecret) {
    return new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: token,
        access_token_secret: tokenSecret,
    });
}
