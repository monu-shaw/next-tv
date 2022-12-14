import react from 'react';
import { useState, useEffect } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [channel, setChannel] = useState([]);
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
        //console.log(res);
      });
    }
  }, []);

  
  return (
    <AppContext.Provider
      value={{
        state:  channel,
      }}
    > 
      <Component {...pageProps}/>
      
    </AppContext.Provider>
  );
}

export default MyApp;

export const AppContext = react.createContext();