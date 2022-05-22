import Link from 'next/link';
import Anchor from 'components/anchor';
import TwitterLogin from 'components/twitter-login';
import type { User } from 'types';
import { useUser } from 'lib/hooks';

function Nav(): JSX.Element {
    const { user } = useUser();

    return (
        <header className="w-full my-5">
            <div className="max-w-screen-lg mx-auto px-10 lg:px-0 flex items-top sm:items-center justify-between flex-row h-full">
                <div className="min-w-[70px]">
                    <Link href="/">
                        <a className="font-bold">
                            <span className="mr-3">&#x1F5BC;</span>
                            <span className="hidden sm:inline">
                                newheaderdaily
                            </span>
                            <span className="sm:hidden">nhd</span>
                        </a>
                    </Link>
                </div>
                {user ? (
                    <UserBar user={user} />
                ) : (
                    <TwitterLogin href="/login" />
                )}
            </div>
        </header>
    );
}

function UserBar({ user }: { user: User }): JSX.Element {
    return (
        <div className="text-right">
            <span className="break-all sm:text-base text-xs leading-6">@{user.username}</span>
            <Link href="/logout">
                <Anchor className="ml-3">Logout</Anchor>
            </Link>
        </div>
    );
}

export default Nav;
