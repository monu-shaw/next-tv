import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../_app';

function Home() {
    const [id,setId]=useState(null);
    const {state} = useContext(AppContext)
    useEffect(() => {
        fetch('/api/login?auth').then(r=>r.json())
        .then(r=>{
          if(r.error != null){
            router.push('signin');
          }
        })
      
    }, [state])
    
  return (
    <div>
        <AddModal/>
        <UpdateModal p={id}/>
        <select onChange={(e)=>setId(e.target.value)}>
            {state.map(r=>(<option key={r.id} value={r.id}>{r.name}</option>))}
        </select>

    </div>
  )
}

export default Home

function AddModal(){
    const {state} = useContext(AppContext)
    const [user, setUser] = useState({
        name : '',
        imgUrl : '',
        low : '',
        mid : '',
        high : '',
        hd : '',
        language : '',
        category : '',
   })

    const HandelSubmit=(e)=>{
        e.preventDefault();
        //console.log(e.target.name);
        const exist = state.filter(r=>r.name.match(user.name.toLowerCase()));
        if(exist.length == 0){
            fetch('/api/addChannel',{
                method:'POST',
                body:JSON.stringify(user)
            }).then(u=>u.json()).then(r=>console.log(r))
        }
    }
    const HandelChange= (e)=>{
        setUser({...user, [e.target.name]:e.target.value})
    }
    useEffect(()=>{
    },[state])

    return(
        <form onSubmit={HandelSubmit} className="col-8 flex flex-col gap-4 w-4/5 mx-auto p-4">
            <input name="name" className='form-control my-1' type="text" onChange={HandelChange} placeholder='name'/>
            <input name="imgUrl" className='form-control my-1' type="text" onChange={HandelChange} placeholder='imgUrl'/>
            <input name="low" className='form-control my-1' type="text" onChange={HandelChange} placeholder='low'/>
            <input name="mid" className='form-control my-1' type="text" onChange={HandelChange} placeholder='mid'/>
            <input name="high" className='form-control my-1' type="text" onChange={HandelChange} placeholder='high'/>
            <input name="hd" className='form-control my-1' type="text" onChange={HandelChange} placeholder='hd'/>
            <input name="language" className='form-control my-1' type="text" onChange={HandelChange} placeholder='language'/>
            <input name="category" className='form-control my-1' type="text" onChange={HandelChange} placeholder='category'/>
            <button type={'submit'} className="btn btn-dark">Add</button>
        </form>
    )

}
function UpdateModal({p}){
    const {state} = useContext(AppContext)
    const [user, setUser] = useState({
        name : '',
        imgUrl : '',
        low : '',
        mid : '',
        high : '',
        hd : '',
        language : '',
        category : '',
        id:''
   })

    const HandelSubmit=(e)=>{
        e.preventDefault();
        //console.log(e.target.name);
        console.log(user);
            fetch('/api/updatechannel',{
                method:'POST',
                body:JSON.stringify(user)
            }).then(u=>u.json()).then(r=>console.log(r))
        
    }
    const HandelChange= (e)=>{
        setUser({...user, [e.target.name]:e.target.value})
    }
    useEffect(()=>{
        setUser(state.filter(r=>r.id==p)[0]);
    },[state,p])
    
    return(
        <form onSubmit={HandelSubmit} className="col-8 flex flex-col gap-4 w-4/5 mx-auto p-4">
            <input name="name" className='form-control my-1' type="text" onChange={HandelChange} placeholder='name'/>
            <input name="imgUrl" className='form-control my-1' type="text" onChange={HandelChange} placeholder='imgUrl'/>
            <input name="low" className='form-control my-1' type="text" onChange={HandelChange} placeholder='low'/>
            <input name="mid" className='form-control my-1' type="text" onChange={HandelChange} placeholder='mid'/>
            <input name="high" className='form-control my-1' type="text" onChange={HandelChange} placeholder='high'/>
            <input name="hd" className='form-control my-1' type="text" onChange={HandelChange} placeholder='hd'/>
            <input name="language" className='form-control my-1' type="text" onChange={HandelChange} placeholder='language'/>
            <input name="category" className='form-control my-1' type="text" onChange={HandelChange} placeholder='category'/>
            <button type={'submit'} className="btn btn-dark">Add</button>
        </form>
    )

}