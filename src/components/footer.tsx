import Anchor from 'components/anchor';

function Footer(): JSX.Element {
    return (
        <footer className="bottom-0 absolute w-full h-7 flex items-center justify-center">
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
