import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSession } from '../../context/userContext';
import { Header } from '../../components';
import { Captlize } from '../../utils';

export function User() {
    const { id } = useParams();
    const token = localStorage.getItem('token')
    const [user, setUser] = useState(null)
    const { getUserById } = useSession()
    const navigate = useNavigate()
    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUserById(id)
            console.log(userData);
            setUser(userData)
        }
        fetchUser()
        // console.log(user);
    }, [])




    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }
    }, [])
    return (
        <div>
            <Header />
            {user && (
                <div className='p-4'>
                    <div className="font-bold text-xl">Name: <span className="font-medium">{Captlize(user.name)}</span></div>
                    <div className="font-bold text-xl">Email: <span className="font-medium">{user.email}</span></div>
                </div>
            )}
        </div>
    );
}
