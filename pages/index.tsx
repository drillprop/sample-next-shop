import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Hello client</h1>
      <p>
        Go to <Link href='/admin/products'>admin products</Link>
      </p>
    </div>
  );
}
