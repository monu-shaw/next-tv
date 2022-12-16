import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'


import { AppContext } from '../_app';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.clientID,
  process.env.clientKEY
);

function Home() {
    const router = useRouter()
    const [id,setId]=useState(null);
    const [cd,setCD]=useState(false);
    const [dom ,setDom]=useState(false)
    const {state} = useContext(AppContext)
    useEffect(() => {
        supabase.auth.getSession()
            .then((re) => {
                if(re.data.session == null){
                  router.push('signin');
                }
              }).catch((err)=>{
                console.log(err);
              });
    }, [state])
    useContext(()=>{
        setDom(true)
    },[])
    const deleteChannel=()=>{
        fetch('/api/deletechannel',{
            method:'post',
            body: JSON.stringify({id: id})
        }).then(r=>r.json()).then(r=>{
            console.log(r);
        })
    }
  return (
    <div>
        <div className={`mx-auto my-4 w-1/4`}>
            
        <select onChange={(e)=>{setId(e.target.value); setCD(false)}} className={`w-full ${styles.input}`}>
            <option value={[]}>Update Channel</option>
                {state.map(r=>(<option key={r.id} value={r.id}>{r.name}</option>))}
            </select>
            {id&&<button className=" bg-red-500 dark:bg-red-800 w-full mx-auto rounded-xl my-2" onClick={()=>setCD(true)}>Delete</button>}
            {id&&(cd&&<button className=" bg-red-500 dark:bg-red-800 w-full mx-auto rounded-xl my-2" onClick={deleteChannel}>Confirm Delete</button>)}
        </div>
        {!id&&<AddModal/>}
        {id&& <UpdateModal p={id}/>}
        

    </div>
  )
}

export default Home
const styles = {
    input: 'px-2 py-1 rounded-sm'
}
function AddModal(){
    const router = useRouter()
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
            }).then(u=>u.json()).then(r=>{
                if(r.error==null){
                    router.push('home')
                }
            })
        }
    }
    const HandelChange= (e)=>{
        setUser({...user, [e.target.name]:e.target.value})
    }
    useEffect(()=>{
    },[state])

    return(
        <form onSubmit={HandelSubmit} className="col-8 flex flex-col gap-4 w-4/5 mx-auto p-4 dark:bg-slate-500 bg-slate-900">
            <h6>Add New Channel</h6>
            <input name="name" className={'form-control my-1 '+ styles.input} type="text" onChange={HandelChange} placeholder='name'/>
            <input name="imgUrl" className={'form-control my-1 '+ styles.input} type="text" onChange={HandelChange} placeholder='imgUrl'/>
            <input name="low" className={'form-control my-1 '+ styles.input} type="text" onChange={HandelChange} placeholder='low'/>
            <input name="mid" className={'form-control my-1 '+ styles.input} type="text" onChange={HandelChange} placeholder='mid'/>
            <input name="high" className={'form-control my-1 '+ styles.input} type="text" onChange={HandelChange} placeholder='high'/>
            <input name="hd" className={'form-control my-1 '+ styles.input} type="text" onChange={HandelChange} placeholder='hd'/>
            <input name="language" className={'form-control my-1 '+ styles.input} type="text" onChange={HandelChange} placeholder='language'/>
            <input name="category" className={'form-control my-1 '+ styles.input} type="text" onChange={HandelChange} placeholder='category'/>
            <button type={'submit'} className="bg-slate-500 dark:bg-slate-900 w-1/4 mx-auto rounded-xl">Add</button>
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
            fetch('/api/updatechannel',{
                method:'POST',
                body:JSON.stringify(user)
            }).then(u=>u.json()).then(r=>{
                if(r.status === 204){
                    alert("updated");
                }else{
                    alert(JSON.stringify(r));
                }
            })
        
    }
    const HandelChange= (e)=>{
        setUser({...user, [e.target.name]:e.target.value})
    }
    useEffect(()=>{
        const t= state.filter(r=>r.id==p)[0];
        setUser({
            name : t?.name,
            imgUrl : t?.imgUrl,
            low : t?.quality?.low ,
            mid : t?.quality?.mid,
            high : t?.quality?.high ,
            hd : t?.quality?.hd ,
            language : t?.language ,
            category : t?.category ,
            id:t?.id 
        })
    },[state,p])
    return(
        <form onSubmit={HandelSubmit} className="col-8 flex flex-col gap-4 w-4/5 mx-auto p-4 dark:bg-slate-500 bg-slate-900">
            <input name="name" className={'form-control my-1 ' + styles.input} type="text" onChange={HandelChange} placeholder='name' value={user?.name}/>
            <input name="imgUrl" className={'form-control my-1 ' + styles.input} type="text" onChange={HandelChange} placeholder='imgUrl' value={user?.imgUrl}/>
            <input name="low" className={'form-control my-1 ' + styles.input} type="text" onChange={HandelChange} placeholder='low' value={user?.low}/>
            <input name="mid" className={'form-control my-1 ' + styles.input} type="text" onChange={HandelChange} placeholder='mid'value={user?.mid}/>
            <input name="high" className={'form-control my-1 ' + styles.input} type="text" onChange={HandelChange} placeholder='high' value={user?.high}/>
            <input name="hd" className={'form-control my-1 ' + styles.input} type="text" onChange={HandelChange} placeholder='hd' value={user?.hd}/>
            <input name="language" className={'form-control my-1 ' + styles.input} type="text" onChange={HandelChange} placeholder='language' value={user?.language}/>
            <input name="category" className={'form-control my-1 ' + styles.input} type="text" onChange={HandelChange} placeholder='category'value={user?.category}/>
            <button type={'submit'} className=" bg-slate-500 dark:bg-slate-900 w-1/4 mx-auto rounded-xl">Add</button>
        </form>
        
    )

}