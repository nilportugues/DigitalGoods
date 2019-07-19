import Head from 'next/head';
import Header from './header';

const Layout = ({
  children,
  title = 'This is the default title',
  description = ''
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />

    {children}
  </div>
);

export default Layout;
