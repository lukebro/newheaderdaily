import Head from 'next/head';
import Nav from './nav';
import Footer from './footer';

function Layout({ title, children }) {
    return (
        <div className="relative min-h-screen">
            <Head>
                <title>{title ? `${title} - ` : ''}newheaderdaily</title>
            </Head>
            <Nav />
            <div className="max-w-screen-lg mx-auto lg:px-0 px-10 pt-24 pb-16">{children}</div>
            <Footer />
        </div>
    );
}

export default Layout;
