import react from 'react';
import { useState, useEffect } from 'react';
import '../styles/globals.css';
import Search from './components/search';

function MyApp({ Component, pageProps }) {
  const [channel, setChannel] = useState([]);
  const [defChannel, setDefChannel] = useState([]);
  const [display, setDisplay] = useState(false);
  const getChannel = (url) => {
    return fetch(url)
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (channel.length == 0) {
      getChannel('/api/getchannel').then((res) => {
        setChannel(res)
        setDefChannel(res)
      });
    }
  }, []);

  
  return (
    <AppContext.Provider
      value={{
        state: {
          channel: channel,
        },
      }}
    > 
    <Search display={display} setDisplay={setDisplay} channel={channel} setChannel={setChannel} defChannel={defChannel} />
      <Component {...pageProps} className={``}/>
      
    </AppContext.Provider>
  );
}

export default MyApp;

export const AppContext = react.createContext();