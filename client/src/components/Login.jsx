import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion } from 'motion/react'

const Login = () => {

    const [state, setState] = useState('Login')

    const {setShowLogin} = useContext(AppContext)


    useEffect(()=>{
        document.body.style.overflow = 'hidden';

        return ()=>{
        document.body.style.overflow = 'unset';
        }
    },[])

  return (
    <div className='fixed top-0 left-0 right-0 
    bottom-0 z-10 backdrop-blur-sm bg-black/30 flex 
    justify-center items-center'>

    <motion.form 
    
    initial={{opacity:0.2, y:50}}
    transition={{duration:0.3}}
    whileInView={{opacity:1, y:0}}
    viewport={{once:true}}
    
    className='relative bg-white p-10 rounded-xl text-slate-500 w-full max-w-sm'>
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
        <p className='text-sm text-center mt-1'>Welcome back! Please sign in to continue</p>

        {state !== 'Login' && <div className='border px-4 py-3 flex items-center gap-3 rounded-full mt-6'>
            <img src={assets.profile_icon} alt="" className='w-5 h-5 object-contain opacity-70' />
            <input
            type="text"
            className='outline-none text-sm w-full placeholder:text-slate-400'
            placeholder='Full Name'
            required
            />
        </div>}

        <div className='border px-4 py-3 flex items-center gap-3 rounded-full mt-4'>
            <img src={assets.email_icon} alt="" className='w-5 h-5 object-contain opacity-70' />
            <input
            type="email"
            className='outline-none text-sm w-full placeholder:text-slate-400'
            placeholder='Email id'
            required
            />
        </div>

        <div className='border px-4 py-3 flex items-center gap-3 rounded-full mt-4'>
            <img src={assets.lock_icon} alt="" className='w-5 h-5 object-contain opacity-70' />
            <input
            type="password"
            className='outline-none text-sm w-full placeholder:text-slate-400'
            placeholder='Password'
            required
            />
        </div>

        <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot password</p>

        <button className='bg-blue-600 w-full text-white py-3 rounded-full'>
            {state === 'Login' ? 'login' : 'create account'}
        </button>

        {state === 'Login' ? <p className='mt-4 text-center'>Don't have an account? 
        <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Sign Up')}>Sign up</span></p>
        :
        <p className='mt-4 text-center'>Already have an account? 
        <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Login')}>Login</span></p>}

        <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer'/>

    </motion.form>

    </div>
  )
}

export default Login