import React, { useEffect, useState } from 'react'

function Search(props) {
    const setSearch = (x)=>{
        props.setChannel(props.defChannel.filter(r=>r.name.match(x.toLowerCase())));
    }
    const [Filter, setFiltr] = useState(false);
    const [lang, setLang]= useState('1');
    const[genre, setGenre]= useState('1');
    const categories = [... new Set(props.defChannel?.map(r=>r.category))];
    const languages = [... new Set(props.defChannel?.map(r=>r.language))];
    useEffect((e)=>{
      if(lang === '1'){
        if(genre === '1'){
          props.setChannel(props.defChannel)
        }else{
          props.setChannel(props.defChannel.filter(r=>r.category == genre));
        }
      }else{
        if(genre === '1'){
          props.setChannel(props.defChannel.filter(r=>r.language == lang))
        }else{
          props.setChannel(props.defChannel.filter(r=>r.language == lang).filter(r=>r.category == genre));
        }
      }
    },[lang]);

    useEffect((e)=>{
      if(genre === '1'){
        if(lang === '1'){
          props.setChannel(props.defChannel)
        }else{
          props.setChannel(props.defChannel.filter(r=>r.language == lang));
        }
      }else{
        if(lang === '1'){
          props.setChannel(props.defChannel.filter(r=>r.category == genre))
        }else{
          props.setChannel(props.defChannel.filter(r=>r.category == genre).filter(r=>r.category == lang));
        }
      }
    },[genre]);

    useEffect(()=>{
      props.setChannel(props.channel)
    },[])

  return (
    <>
    {!props.display?(<i className="bi bi-search p-2 text-3xl text-csky" onClick={()=>{props.setDisplay(!props.display)}}></i>):(<p className={`absolute top-0 right-0 p-2`} onClick={()=>{props.setDisplay(!props.display)}}>X</p>)}
    <i className={`bi p-2 text-3xl transition-all ease-in duration-3000 ${Filter?'bi-x-lg':'bi-gear-fill'}`} onClick={()=>{setFiltr(!Filter)}}></i>
    <div className={`absolute top-0 w-full backdrop-blur-sm backdrop-sepia-4 flex justify-center transition-all ease-in duration-3000 ${!props.display?'hidden min-h-0':'min-h-screen z-10'}`}>
    {!props.display?(<i className="bi bi-search absolute top-0 right-0 p-2 text-3xl text-csky" onClick={()=>{props.setDisplay(!props.display)}}></i>):(<i className={`bi bi-x-lg absolute top-0 left-0 p-1 m-1 text-2xl border rounded-xl`} onClick={()=>{props.setDisplay(!props.display)}}></i>)}
        <div className={`backdrop-blur-sm backdrop-sepia-4 transition-all ease-in duration-3000 my-2 ${!props.display?'hidden':''}`}>
            <input className='px-2 border-b-4 bg-transparent' placeholder='Channels' onChange={(e)=>setSearch(e.target.value)}/>
        </div>
    </div>
    <div className={`my-2 self-center flex justify-center gap-2 ${Filter?'':'hidden'}`}>
      <select className='capitalize px-2 bg-transparent/10' onChange={(e)=>setLang(e.target.value)}>
      <option value="1">language</option>
        {languages.map((r,i)=> <option key={`${i}+a`} value={r} className='capitalize px-2'>{r}</option>)}
      </select>
      <select className='capitalize px-2 bg-transparent/10' onChange={(e)=>(e.target.value)}>
      <option value="1">Genre</option>
        {categories.map((r,i)=> <option key={i+'b'} value={r} className='capitalize px-2'>{r}</option>)}
      </select>
    </div>
    </>
    
  )
}

export default Search