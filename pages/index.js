import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useContext } from 'react';
import Link from 'next/link';
import { AppContext } from './_app';

export default function Home() {
  const channel = useContext(AppContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>Our Play Live Tv</title>
      </Head>

      <main className={`${styles.main} dark:bg-zinc-900 dark:text-slate`}>
        <h6 className={`${styles.title} text-sm`}>
          Welcome to <a href="#">Our TV!</a>
        </h6>

        <div className={styles.grid}>
          {channel.state.channel.map((r) => (
            <Link key={r.id} href={`channel/${r.id}`} className={styles.card}>
              <h6 className="text-sm">{r.name.substr(0, 10)} &rarr;</h6>
              <p>Learn about Next.js in an ..</p>
            </Link>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://next.new" target="_blank" rel="noopener noreferrer">
          Created By &nbsp;<b>Monu &nbsp;</b> With &nbsp; ❤⚡️
        </a>
      </footer>
    </div>
  );
}
