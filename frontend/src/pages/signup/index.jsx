import React, { useState } from 'react';
import { useSession } from '../../context/userContext';

export function SignUpPage({ history }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const { signUp, success, error } = useSession()
    return (
        <div className='flex justify-center items-center bg-slate-300 h-screen'>
            <div className=' bg-white min-w-[12em] md:min-w-[42em] min-h-[24em] flex flex-col p-4 shadow-xl rounded-xl gap-8'>
                <div className='text-xl md:text-4xl text-slate-600 font-bold text-center'>SignUp Page</div>
                <div className='flex flex-col gap-4 w-full p-4'>
                    {error && <span className='w-full text-red-600 p-2 bg-red-200'>{error}</span>}
                    {success && <span className='text-green-900 bg-green-200 p-2 rounded-md'>{success}</span>}
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="" className='text-md font-bold'>Name:</label>
                        <input type="text" placeholder='username' className='outline-none border-slate-300 border-[2px] w-full p-2 rounded-md' onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="" className='text-md font-bold'>Email:</label>
                        <input type="email" placeholder='username' className='outline-none border-slate-300 border-[2px] w-full p-2 rounded-md' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='grid grid-cols-4 gap-4'>
                        <div className='flex flex-col gap-1 col-span-2'>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="" className='text-md font-bold'>Password:</label>
                                <input type="password" placeholder='Password' className='outline-none border-slate-300 border-[2px] w-full p-2 rounded-md' onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                        <div className='flex flex-col gap-1 col-span-2'>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="" className='text-md font-bold'>Confirm Password:</label>
                                <input type="password" placeholder='Re-Enter Password' className='outline-none border-slate-300 border-[2px] w-full p-2 rounded-md' onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <button className='bg-slate-500 px-[1em] py-[.5em] rounded-md text-white' onClick={() => signUp(name, email, password, ConfirmPassword)}>SignUp</button>
                        <span className='text-sm font-semibold'>Already have an Acocunt? <a href="/login" className='text-teal-700 hover:underline'>Login.</a></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
