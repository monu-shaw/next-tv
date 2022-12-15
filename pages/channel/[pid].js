import { useRouter } from 'next/router';
import { useState, useContext, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

import styles from '../../styles/Home.module.css';
import Link from 'next/link';
import { AppContext } from '../_app';
import Head from 'next/head';
import Image from 'next/image';
const Channel = () => {
  const [dom ,setDom] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [control, setControl] = useState(true);
  const [source, setSource] = useState('');
  const [quality, setQuality] = useState('low');
  const [option, setOption] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [fullscreen, setFullscreen] = useState(false);
  const [ch, setCh] = useState([]);
  const playerRef = useRef(null);

  const {state} = useContext(AppContext);
  const { pid } = useRouter().query;

  function setCurrentPlay(x){
    const data = state?.filter((r) => r.id == x);
    setCh(data);
    setSource(data[0]?.quality.low);
  }

  const speedControl = (x) => {
    if (x) {
      if (speed < 2.5) {
        setSpeed((prev) => prev + 0.25);
      }
    } else {
      if (speed > 0.25) {
        setSpeed((prev) => prev - 0.25);
      }
    }
  };
  useEffect(() => {
    setDom(true)
    const data = state.filter((r) => r.id == pid);
    setCh(data);
    setSource(data[0]?.quality.low);
    setFullscreen(fullscreen);
    //fetch('/api/getchannel').then(r=>r.json()).then(r=>console.log(r))
    
  }, [state]);
  useEffect(() => {
    function toggleFullscreen() {
      if (fullscreen) {
        playerRef.current.requestFullscreen();
      } else {
        if (document.fullscreenElement) {
          document
            .exitFullscreen()
            .then(() => {})
            .catch((err) => console.error(err));
        } 
        
      }
    }
    toggleFullscreen();
  }, [fullscreen]);
  let t 
  useEffect(() => {
      t  = setTimeout(()=>{ setControl(false)},12000)
      return ()=>{
        clearTimeout(t);
      }
  }, [control]);

  
  const qManage = (x) => {
    switch (x) {
      case 'low':
        setSource(ch[0]?.quality.low);
        setQuality(x)
        break;
      case 'mid':
        setSource(ch[0]?.quality.mid);
        setQuality(x)
        break;
      case 'high':
        setSource(ch[0]?.quality.high);
        setQuality(x)
        break;
    }
  }
if(!dom){
  return (<>Loading</>)
}
else{return (
    <div className="dark:bg-zinc-900 dark:text-slate min-h-screen ">
      <Head>
        <title>{ch[0]?.name+ ` on OurTv`}</title>
      </Head>
      <div className='max-h-full'>
        <h6 className={`text-center capitalize text-3xl text-sky-600`}>
          <Link href="/"><i className="bi bi-house"></i> {ch[0]?.name}</Link>
        </h6>
        <div
          onMouseOver={() =>{
            if(!control){
              setControl(true)
            }
          }
        }
          onMouseOut={()=>setControl(false)}
          onClick={()=>{
            if(!control){
              setControl(true)
            }
          }
        }
          ref={playerRef}
          className={`${styles.rp} my-2 mx-auto w-4/4 md:w-1/2 md:rounded-lg overflow-hidden bg-slate-900 bg-blend-overlay shadow-2xl relative transition-all ease-in-out duration-3000`}
        >
          <ReactPlayer
            url={source}
            className="rounded-2xl"
            width="100%"
            height="100%"
            playing={playing}
            playbackRate={speed}
            
          />
          <div className={`transition-all duration-500 ${control?'':'translate-y-40'}`}>
            <button
              className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 absolute left-2 bottom-2 rounded-2xl p-1  px-2"
              onClick={() => setPlaying(!playing)}
            >
              {playing ? (
                <i className="bi bi-pause-fill"></i>
              ) : (
                <i className="bi bi-play-fill"></i>
              )}
            </button>
            <button
              className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 absolute right-12 bottom-2 rounded-2xl p-1  px-2"
              onClick={() => setOption(!option)}
            >
              {option ? (
                <i className="bi bi-gear-fill"></i>
              ) : (
                <i className="bi bi-gear"></i>
              )}
            </button>
            <button
              className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 absolute right-2 bottom-2 rounded-2xl p-1  px-2"
              onClick={() => setFullscreen(!fullscreen)}
            >
              {fullscreen ? (
                <i className="bi bi-fullscreen-exit"></i>
              ) : (
                <i className="bi bi-fullscreen"></i>
              )}
            </button>
            <div
              className={`transition-all duration-300 grid absolute right-2 top-2 modal p-2 rounded-2xl backdrop-blur-xl bg-white/30 ${
                option ? '' : 'translate-x-40'
              }`}

            >
              <div id="spdCntrl" className="grid grid-cols-3  content-between">
                <div className="justify-self-center" onClick={() => speedControl(1)}>
                  +
                </div>
                <div className="justify-self-center">{speed}</div>
                <div className="justify-self-center" onClick={() => speedControl(0)}>
                  -
                </div>
              </div>
              <div className="grid">
                <div id="qltCntrl" className="grid grid-cols-3 gap-3">
                  <div
                    className={quality == 'low' ? 'backdrop-blur-sm px-1 rounded-md' : ''}
                    onClick={() => qManage('low')}
                  >
                    Low
                  </div>
                  <div
                    className={quality == 'mid' ? 'backdrop-blur-sm px-1 rounded-md' : ''}
                    onClick={() => qManage('mid')}
                  >
                    Mid
                  </div>
                  <div
                    className={quality == 'high' ? 'backdrop-blur-sm px-1 rounded-md' : ''}
                    onClick={() => qManage('high')}
                  >
                    High
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex w-full mt-8 gap-8 overflow-hidden overflow-x-auto snap-x'>
        {state.filter(r=>r.category==ch[0]?.category).map((r)=>
        <div key={r.id} className={`min-w-max snap-center transition-all duration-500 md:mx-10 `} onClick={()=>setCurrentPlay(r.id)}>
          <div className='w-full overflow-hidden rounded-lg'>
              <Image src="/images.png" className='w-4/5 mx-auto rounded-lg' width="80" height="100" alt={r.name}/>
          </div>
          <h6 className="text-md capitalize">{r.name.substr(0, 13)} &rarr;</h6>
          <p>OurTv Live Tv Channel ..</p>
        </div>)}
      </div>
    </div>
  );}
};

export default Channel;
