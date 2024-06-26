import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, UserCard } from '../../components';
import { Captlize } from '../../utils';
import { useSession } from '../../context/userContext';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export function Home() {
    const { user, users, onDelete, SignOut, token } = useSession();
    const navigate = useNavigate()
    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
        toast.success('Welcome to Home Page')
    }, [])
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/user/getSecondEmployee');
                console.log(res.data);
            } catch (e) {
                console.log(e)
            }
        }
        fetchEmployee()
    }, [])
    if (!user) {
        return null
    }
    return (
        <div className='bg-slate-400 h-screen'>
            <Header />
            <>
                <div className='bg-slate-200 text-white text-2xl  md:text-4xl w-full h-[12em] md:h-full flex flex-col justify-center items-center gap-4'>
                    <span className='font-semibold text-black'>Welcome {user && Captlize(user.name)}</span>
                    <button className='text-lg md:text-xl font-normal rounded-full bg-gray-900 px-[1em] py-[.5em] md:px-[1.5em] md:py-[.7em]' onClick={SignOut}>SignOut</button>
                </div>
                <div className='mt-4 grid grid-cols-0 md:grid-cols-8'>
                    <div className='col-span-1'>

                    </div>
                    <div className='col-span-0 md:col-span-6 grid grid-cols-2 md:grid-cols-4 p-4 gap-4'>
                        {users && users.map((user) => (
                            <UserCard user={user} onDelete={onDelete} key={user._id} />
                        ))}
                    </div>
                </div>
                <hr />
                <div>

                </div>
            </>

        </div>
    );
}
