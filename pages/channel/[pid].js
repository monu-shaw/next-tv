import { useRouter } from 'next/router';
import { useState, useContext, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

import styles from '../../styles/Home.module.css';
import Link from 'next/link';
import { AppContext } from '../_app';
const Channel = () => {
  const [playing, setPlaying] = useState(true);
  const [control, setControl] = useState(false);
  const [source, setSource] = useState('');
  const [quality, setQuality] = useState('low');
  const [option, setOption] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [fullscreen, setFullscreen] = useState(false);
  const [ch, setCh] = useState([]);
  const playerRef = useRef(null);

  const channel = useContext(AppContext);
  const { pid } = useRouter().query;

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
    const data = channel.state.channel.filter((r) => r.id == pid);
    setCh(data);
    setSource(data[0]?.quality.low);
    setFullscreen(fullscreen)
  }, []);
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

  return (
    <div className="styles.grid dark:bg-zinc-900 dark:text-slate min-h-screen ">
      <h6 className={`${styles.title} text-sm mb-3 `}>
        <Link href="/">{ch[0]?.name}</Link>
      </h6>
      <div
        ref={playerRef}
        className="mx-auto w-3/4 md:w-1/2 rounded-2xl overflow-hidden bg-slate-900 bg-blend-overlay shadow-2xl relative transition ease-in-out duration-300"
      >
        <ReactPlayer
          url={source}
          className="rounded-2xl"
          width="100%"
          height="100%"
          playing={playing}
          playbackRate={speed}
          onClick={() => setPlaying(!playing)}
        />
        <div className="control">
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
            className={`grid absolute right-2 top-2 modal p-2 rounded-2xl backdrop-blur-xl bg-white/30 ${
              !option ? 'hidden' : ''
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
                  className={quality == 'low' ? 'backdrop-blur-sm p-1 rounded-md' : ''}
                  onClick={() => qManage('low')}
                >
                  Low
                </div>
                <div
                  className={quality == 'mid' ? 'backdrop-blur-sm p-1 rounded-md' : ''}
                  onClick={() => qManage('mid')}
                >
                  Mid
                </div>
                <div
                  className={quality == 'high' ? 'backdrop-blur-sm p-1 rounded-md' : ''}
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
  );
};

export default Channel;
