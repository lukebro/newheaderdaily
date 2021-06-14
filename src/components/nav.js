import Link from 'next/link';
import Anchor from 'components/anchor';
import TwitterLogin from 'components/twitter-login';
import { useUser } from 'lib/hooks';

function Nav() {
    const { user, loading } = useUser();

    return (
        <header className="fixed bg-white top-0 inset-x-0 w-full py-5">
            <div className="max-w-screen-lg mx-auto lg:px-0 px-10 flex sm:items-center justify-between flex-col sm:flex-row h-full">
                <div>
                    <Link href="/">
                        <a className="font-bold">
                            <span className="mr-3">&#x1F5BC;</span>
                            <span>newheaderdaily</span>
                        </a>
                    </Link>
                </div>
                {!loading && (
                    <div>
                        {user ? (
                            <UserBar user={user} />
                        ) : (
                            <TwitterLogin href="/login" />
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}

function UserBar({ user }) {
    return (
        <div>
            <span className="mr-3">Welcome {user.name}!</span>
            <Link href="/logout"><Anchor>Logout</Anchor></Link>
        </div>
    );
}

export default Nav;
