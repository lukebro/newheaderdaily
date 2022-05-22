import nc from 'next-connect';
import session from 'middleware/session';

const handler = nc();

handler
    .use(session)
    .get(
        (req, res) => {
            req.logout(() => {
            });
        }
    );

export default handler;
