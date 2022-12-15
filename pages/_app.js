import Head from 'next/head';
import react from 'react';
import { useState, useEffect } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [channel, setChannel] = useState([]);
  const [mes, setMes] = useState('Loading Channels');
  const getChannel = (url) => {
    return fetch(url)
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (channel.length == 0) {
      getChannel('/api/getchannel').then((res) => {
        
        if(res.data==null){
          setChannel([])
          setMes('Some Error Occurs Try Again in 5 mins Later')
        }else{
          setChannel(res.data);
          setMes('')
        }
      });
    }
  }, []);

  
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="OurTv" />
        <meta name="keywords" content="Keywords" />
        <title>OurTv</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>
    <AppContext.Provider
      value={{
        state:  channel,
        message: mes
      }}
    > 
      <Component {...pageProps}/>
      
    </AppContext.Provider>
    </>
  );
}

export default MyApp;

export const AppContext = react.createContext();