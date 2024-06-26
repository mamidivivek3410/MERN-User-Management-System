import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function AddEmployee() {
    const [emplyeeData, setEmployeeData] = useState({
        name: '',
        salary: '',
    });
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({
            ...emplyeeData,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        try {
            // console.log(emplyeeData);
            const res = await axios.post('http://localhost:5000/api/user/addEmployee', emplyeeData)
            // console.log(res.data);
            setMessage(res.data.message)
        } catch (e) {
            // console.log(e.response.data.message);
            setError(e.response.data.message)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setError(null)
            setMessage(null)

        }, 5000)
    })

    return (
        <div className='bg-white h-screen flex items-center justify-center'>
            <div className='p-8 flex flex-col gap-8 bg-slate-300 min-w-[22em] min-h-auto rounded-xl shadow-xl'>
                <span className='font-bold text-center text-xl'>Add Employee</span>
                <div className='flex flex-col gap-2'>
                    {error && (
                        <span className='text-red-800 bg-red-200 p-2'>{error}</span>
                    )}
                    {message && (
                        <span className='text-green-800 bg-green-200 p-2'>{message}</span>
                    )}
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="" className='font-bold'>Name:</label>
                        <input type="text" name='name' onChange={handleChange} className='p-2 outline-none hover:outline-none rounded-md text-black' placeholder='Name' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="" className='font-bold'>Salary:</label>
                        <input type="number" name='salary' onChange={handleChange} className='p-2 outline-none hover:outline-none rounded-md text-black' placeholder='Salary' />
                    </div>
                </div>
                <button className='w-full p-2 text-white bg-slate-600 rounded-md hover:bg-slate-800' onClick={handleSubmit}>Add</button>
            </div>
        </div>
    );
}
