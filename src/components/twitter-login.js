import Icon from 'components/icon';
import Link from 'next/link';

function TwitterLogin(props) {
    return (
        <Link {...props}>
            <a className="block twitter text-white p-3 rounded-sm font-sans text-sm hover:transform hover:scale-105 transition-transform">
                <Icon icon={['fab', 'twitter']} /> Sign in with Twitter
            </a>
        </Link>
    );
}

export default TwitterLogin;
