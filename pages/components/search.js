import React from 'react'

function Search(props) {
    const setSearch = (x)=>{
        props.setChannel(props.defChannel.filter(r=>r.name.match(x.toLowerCase())));
        console.log(x);
    }
  return (
    <>
    {!props.display?(<i class="bi bi-search absolute top-0 right-0 p-2" onClick={()=>{props.setDisplay(!props.display)}}></i>):(<p className={`absolute top-0 right-0 p-2`} onClick={()=>{props.setDisplay(!props.display)}}>X</p>)}
    <div className={`absolute top-0 w-full backdrop-blur-sm backdrop-sepia-4 flex justify-center transition-all ease-in duration-3000 ${!props.display?'hidden h-0':'min-h-screen'}`}>
    {!props.display?(<i class="bi bi-search absolute top-0 right-0 p-2" onClick={()=>{props.setDisplay(!props.display)}}></i>):(<p className={`absolute top-0 right-0 p-2`} onClick={()=>{props.setDisplay(!props.display)}}>X</p>)}
        <div className={`p-2 backdrop-blur-lg  transition-all ease-in duration-3000 ${props.display?'hidden':'top-10'}`}>
            <input className='' placeholder='Channels' onChange={(e)=>setSearch(e.target.value)}/>
        </div>
    </div>
    </>
    
  )
}

export default Search