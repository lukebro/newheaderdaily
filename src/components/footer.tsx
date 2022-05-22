import Anchor from 'components/anchor';

function Footer(): JSX.Element {
    return (
        <footer className="mt-10 mb-4 w-full flex items-center justify-center">
            <span className="text-xs">
                reach out to{' '}
                <Anchor
                    className="text-indigo-600 underline"
                    href="https://twitter.com/lukebro"
                >
                    @lukebro
                </Anchor>{' '}
                if something breaks
            </span>
        </footer>
    );
}

export default Footer;
