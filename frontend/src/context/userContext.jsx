import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const navigate = useNavigate()
    const token = localStorage.getItem('token');

    useEffect(() => {
        setTimeout(() => {
            setSuccess(null)
            setError(null)
        }, 5000)
    },)

    const signUp = async (name, email, password, confirmPassword) => {
        if (name === '' || email === '' || password === '' || confirmPassword === '') {
            setError('Please fill all the fields')
            return;
        }
        else if (password !== confirmPassword) {
            setError('Password and Confirm Password should be same')
            return;
        }
        try {
            const res = await axios.post('http://localhost:5000/api/user/signup', {
                name,
                email,
                password
            })
            if (res.data.status === 200) {
                setSuccess("user Created Successfully")
                localStorage.removeItem('token')
                return;
            }
            setError(res.data.message)
        } catch (e) {
            console.log(e);

        }
    }

    const signIn = async (email, password) => {
        if (email === '' || password === '') {
            setError('Please fill all the fields');
            return;
        }
        try {
            // console.log(email, password);
            const res = await axios.post('http://localhost:5000/api/user/login', {
                email,
                password
            })
            if (res.data.status === 200) {
                localStorage.setItem('token', res.data.token)
                navigate('/');
            }
            else if (res.data.status === 400) {
                setError(res.data.message)
            }
        } catch (e) {
            console.log(e);
        }
    }

    const SignOut = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }

    const fetchUser = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/user/mee', {
                headers: {
                    Authorization: `Bearer${token}`
                }
            })
            if (res.data.message === 'jwt expired') {
                setError('Session Expired')
                navigate('/login')
                return;
            }
            if (res.data.status === 200) {
                setUser(res.data.user)
            }
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        if (token) {
            fetchUsers()
            fetchUser()
        }
    }, [token])

    const fetchUsers = async () => {
        const res = await axios.get('http://localhost:5000/api/user', {
            headers: {
                Authorization: `Bearer${token}`
            }
        })
        if (res.data.message === 'jwt expired') {
            setError('Session Expired')
            navigate('/login')
        }
        if (res.data.status === 200) {
            setUsers(res.data.users)
        }
        else {
            // navigate('/login')
        }
    }

    const getUserById = async (id) => {
        try {
            // console.log(id);
            const res = await axios.get(`http://localhost:5000/api/user/${id}`, {
                headers: {
                    Authorization: `Bearer${token}`
                }
            })
            if (res.data.message === 'jwt expired') {
                setError('Session Expired')
                localStorage.removeItem('token')
                navigate('/login')
                return;
            }
            return res.data.user;
        } catch (e) {
            console.log(e);
        }
    }

    const handleUpdate = async (name, email, password, id) => {
        if (name === '' || email === '' || password === '') {
            setError('Please fill all the fields')
            return;
        }
        try {
            const res = await axios.put(`http://localhost:5000/api/user/edit/${id}`,
                { name, email },
                {
                    headers: {
                        Authorization: `Bearer${token}`
                    },
                },)
            if (res.data.status === 200) {
                fetchUsers()
                fetchUser()
                navigate('/')
            }
            if (res.data.message === 'jwt expired') {
                setError('Session Expired')
                navigate('/login')
            }
        } catch (e) {
            console.log(e);
        }
    }

    const onDelete = async (id) => {
        if (user._id === id) {
            alert('You cannot delete yourself')
            return;
        }
        const confirmDelete = window.confirm('Are you sure you want to delete this user?')
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/api/user/${id}`, {
                    headers: {
                        Authorization: `Bearer${token}`
                    }
                })

                fetchUsers()
                navigate('/')
            } catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <SessionContext.Provider value={{ token, error, success, user, users, setUsers, onDelete, SignOut, signIn, signUp, getUserById, handleUpdate }}>
            {children}
        </SessionContext.Provider>
    )
}

export const useSession = () => {
    return useContext(SessionContext)
}