//src/pages/_app.tsx

import Layout from '@/components/Layout';
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react";
import styles from '../styles/page.module.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <Layout>
                <Component {...pageProps} className={styles.wrapper} />
            </Layout>
        </SessionProvider>
    );
}

export default MyApp;
