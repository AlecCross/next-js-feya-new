import Layout from '@/components/Layout';
import type { AppProps } from 'next/app'
import styles from '../styles/page.module.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} className={styles.wrapper} />
        </Layout>
    );
}

export default MyApp;
