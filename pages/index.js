import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { AppContext } from './_app';
import Image from 'next/image';
import Search from './components/search';

export default function Home() {
  const {state, message} = useContext(AppContext);
  const [category, setCategory] = useState([]);
  
  const [Channe, setChannel] = useState(state);
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    const temp = new Set(state.map(r=>r.category));
    setCategory([...temp]);
    setChannel(state);
  
  
  }, [state]);
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Our Play Live Tv</title>
      </Head>
      <Search display={display} setDisplay={setDisplay} channel={Channe} setChannel={setChannel} defChannel={state} />
      <div className='border-b-2'></div>
      <main className={`${styles.main} dark:bg-zinc-900 dark:text-slate `}>
        <h6 className={`${styles.title} text-sm`}>
          Welcome to <a href="#">Our TV!</a>
        </h6>
        <p className='text-lg text-slate-400 italic'>{message}</p>

        {/* {<div className='overflow-hidden max-w-full'>
          {category.map(i=>
            (<>
            <h6 className='text-inherit capitalize px-2 text-lg'>{i}</h6>
            <div className={`flex overflow-x-scroll overflow-hidden m-0 scroll-pl-6 snap-x`}>
                {channel.state.channel.filter(j=>j.category==i).map(r=>(
              <Link key={r.id} href={`channel/${r.id}`}>
                <div  className={`${styles.card} m-0 w-36 snap-start`}>
                  <div className='w-full'>
                      <Image src="/images.png" className='w-full' width="100" height="100"/>
                  </div>
                  <h6 className="text-sm">{r.name.substr(0, 10)} &rarr;</h6>
                  <p>Live tv</p>
                </div>
              </Link>
              ) )}
            </div>
            </>
            )
             
             )}
        </div>} */}
        
        <div className={styles.grid}>
          {Channe?.map((r) => (
            <Link key={r.id} href={`channel/${r.id}`} className={styles.card}>
              <div className='w-full'>
                  <Image src="/images.png" className='w-full' width="100" height="100" alt={r.name}/>
              </div>
              <h6 className="text-sm capitalize">{r.name.substr(0, 13)} &rarr;</h6>
              <p>Live Tv Channels</p>
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
