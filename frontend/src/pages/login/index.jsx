import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../../context/userContext';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const { signIn, error, success } = useSession()

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/', { replace: true })
            return;
        }
    }, [])
    const onSubmit = () => {
        signIn(email,password);
        
    }
    return (
        <div className='flex justify-center items-center bg-slate-300 h-screen'>
            <div className=' bg-white min-w-[12em] md:min-w-[42em] min-h-[12em] md:min-h-[24em] flex flex-col p-2 md:p-4 shadow-xl rounded-xl gap-8'>
                <div className=' text-xl md:text-4xl text-slate-600 font-bold text-center'>Login Page</div>
                <div className='flex flex-col gap-2 md:gap-4 w-full p-4'>
                    {error && <span className='w-full text-red-600 p-2 bg-red-200'>{error}</span>}
                    {success && <span className='text-green-900 bg-green-200 p-2 rounded-md'>{success}</span>}
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="" className='text-sm md:text-md font-bold'>Email:</label>
                        <input type="email" className='outline-none border-slate-300 border-[2px] w-full p-[.2em] md:p-2 rounded-md ' placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="" className='text-md font-bold'>Password:</label>
                            <input type="password" className='outline-none border-slate-300 border-[2px] w-full p-[.2em] md:p-2 rounded-md ' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <button className='bg-slate-500 px-[1em] py-[.5em] rounded-md text-white' onClick={() => signIn(email, password)}>Login</button>
                        <span className='text-sm font-semibold'>Don't have an Acocunt? <a href="/signup" className='text-teal-700 hover:underline'>SignUp</a></span>

                    </div>
                </div>
            </div>
        </div>
    );
}
