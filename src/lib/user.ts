import { IncomingMessage } from 'http';
import { User } from 'types';
import type { User as UserModel } from '@prisma/client';

type Request = IncomingMessage & {
    user?: UserModel;
};

export function getUserFromReq(req: Request): User | null {
    const user = req.user;

    if (!user) {
        return null;
    }

    return {
        username: user.username,
        name: user.name,
        avatar: user.avatar,
    } as User;
}
