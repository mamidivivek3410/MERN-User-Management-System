import React from 'react';
import { Avatar, Captlize } from '../../utils';
import { useSession } from '../../context/userContext';

export function Header() {
    const { user } = useSession();
    return (
        <div className='bg-slate-600 w-full h-18 flex items-center px-8 md:px-4 py-4'>
            <span className='text-xl md:text-2xl font-bold md:font-medium text-white'>Assesment</span>
            <nav className='flex items-center w-full justify-end gap-8 md:mr-20'>
                <>
                    <div className='flex gap-2 items-center shadow-xl px-2 py-2 bg-white border-slate-400 border-[1px] rounded-xl md:min-w-[13em]'>
                        <span className='p-2 rounded-full bg-slate-700 text-white'>{user && Avatar(user.name)}</span>
                        <div className='border-slate-600 border-r-[1px] h-8'/>
                        <div className='flex flex-col text-xs'>
                            <span className='font-bold'>{Captlize(user.name)}</span>
                            <span className='font-medium text-slate-800'>{user.email}</span>
                        </div>
                    </div>
                </>
            </nav>
        </div>
    );
}
