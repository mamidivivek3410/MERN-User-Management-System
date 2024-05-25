import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSession } from '../../context/userContext';

export function EditPage() {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { id } = useParams();
    const token = localStorage.getItem('token')
    const { getUserById, handleUpdate, } = useSession()
    const [user, setUser] = useState(null)
    const navigate = useNavigate()



    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUserById(id)
            setUser(user)
        }
        fetchUser()
        if (!token) {
            return navigate('/login')
        }
    }, [])

    const update = () => {
        handleUpdate(name, email, password, id)
    }


    return (
        <div className='flex justify-center items-center bg-slate-300 h-screen'>
            <div className=' bg-white min-w-[12em] md:min-w-[42em] min-h-[24em] flex flex-col p-4 shadow-xl rounded-xl gap-8'>
                <div className='text-2xl md:text-4xl text-slate-600 font-bold text-center'>Edit User</div>
                <div className='flex flex-col gap-2 md:gap-4 w-full p-4'>
                    {error && <span className='w-full text-red-600 p-2 bg-red-200'>{error}</span>}
                    {success && <span className='text-green-900 bg-green-200 p-2 rounded-md'>{success}</span>}
                    {user && (
                        <>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="" className='text-md font-bold'>Name:</label>
                                <input type="text" placeholder={user.name} className='outline-none border-slate-300 border-[2px] w-full p-2 rounded-md' onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="" className='text-md font-bold'>Email:</label>
                                <input type="text" placeholder={user.email} className='outline-none border-slate-300 border-[2px] w-full p-2 rounded-md' onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='grid grid-cols-4 gap-4'>
                                <div className='flex flex-col gap-1 col-span-4'>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="" className='text-md font-bold'>Password:</label>
                                        <input type="text" placeholder='Password' className='outline-none border-slate-300 border-[2px] w-full p-2 rounded-md' onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>

                            </div>
                        </>
                    )}

                    <div className='flex flex-col gap-1'>
                        <button className='bg-slate-500 px-[1em] py-[.5em] rounded-md text-white' onClick={update}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
