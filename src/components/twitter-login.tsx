import Icon from 'components/icon';
import Link from 'next/link';
import type { LinkProps } from 'next/link';

function TwitterLogin(props: LinkProps): JSX.Element {
    return (
        <Link {...props}>
            <a className="block w-48 twitter text-white p-3 rounded-sm font-sans text-sm hover:transform hover:scale-105 transition-transform text-center">
                <Icon icon={['fab', 'twitter']} className="mr-1" /> Sign in with
                Twitter
            </a>
        </Link>
    );
}

export default TwitterLogin;
