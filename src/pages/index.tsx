import Head from 'next/head';
import { Layout, HelloWorld } from '@/components';

export default function Home() {
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Layout.CenterAll>
                <HelloWorld language="en" />
            </Layout.CenterAll>
        </>
    );
}
