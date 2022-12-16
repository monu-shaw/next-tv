import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.clientID,
  process.env.clientKEY
);




function SignIn() {
  const router = useRouter()
  useEffect(()=>{
    supabase.auth.getSession()
            .then((re) => {
                if(re.data.session != null){
                  router.push('home');
                }
              }).catch((err)=>{
                console.log(err);
              });
  },[])
  const handelSubmit=(e)=>{
    e.preventDefault()
    
    const f=()=> e.target;
    const password = f().password.value
    const email = f().email.value
    
    supabase.auth.signInWithPassword({ email, password})
    .then((re) => {
        if(re.data.session != null){
          router.push('home');
        }else{
          alert(re.error.message)
        }
      }).catch((err)=>{
      });
  }
  return (
    <div className='flex justify-center min-h-screen items-center'>
      <form className='flex flex-col gap-4 backdrop-blur-lg backdrop-opacity-25 bg-gray-500 p-4' onSubmit={handelSubmit}>
        <input type={`email`} name='email' id='email' required  placeholder='Email' className='px-2 bg-transparent border-b-2'/>
        <input type={`password`} name='password' id='password' required  placeholder='Password' className='px-2 bg-transparent border-b-2'/>
        <button className='dark:bg-slate-50 dark:text-slate-900 bg-slate-900 text-lime-50 rounded-2xl py-2 disabled:opacity-50' type='submit' >SignIn</button>
      </form>
    </div>
  )
}

export default SignIn