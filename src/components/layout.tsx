import Head from 'next/head';
import Nav from './nav';
import Footer from './footer';

type LayoutProps = {
    title?: string;
    children: JSX.Element | JSX.Element[];
};

function Layout({ title, children }: LayoutProps): JSX.Element {
    return (
        <div className="relative min-h-screen">
            <Head>
                <title>{title ? `${title} - ` : ''}newheaderdaily</title>
            </Head>
            <Nav />
            <div className="max-w-screen-lg mx-auto lg:px-0 px-10 pt-24 pb-16">
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default Layout;
