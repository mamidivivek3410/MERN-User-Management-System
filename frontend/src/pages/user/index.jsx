import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSession } from '../../context/userContext';

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
            {user && (
                <div>
                    {user.name}
                </div>
            )}
        </div>
    );
}
