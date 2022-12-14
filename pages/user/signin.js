import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

function SignIn() {
  const router = useRouter()
  useEffect(()=>{
    fetch('/api/login?auth').then(r=>r.json())
    .then(r=>{
      if(r.error == null){
        router.push('home');
      }
    })
  },[])
  const handelSubmit=(e)=>{
    e.preventDefault()
    
    const f=()=> e.target;
    //console.log(f(email));
    axios.post('/api/login', {email: f().email.value, password: f().password.value}).then(r=>console.log(r.data))
  }
  return (
    <div className='flex justify-center min-h-screen items-center'>
      <form className='flex flex-col gap-4 backdrop-blur-lg backdrop-opacity-25 bg-gray-500 p-4' onSubmit={handelSubmit}>
        <input type={`email`} name='email' id='email' required  placeholder='Email' className='px-2 bg-transparent border-b-2'/>
        <input type={`password`} name='password' id='password' required  placeholder='Password' className='px-2 bg-transparent border-b-2'/>
        <button className='dark:bg-slate-50 dark:text-slate-900 bg-slate-900 text-lime-50 rounded-2xl py-2' type='submit'>SignIn</button>
      </form>
    </div>
  )
}

export default SignIn