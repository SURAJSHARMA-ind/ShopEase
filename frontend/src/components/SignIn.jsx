import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/userDetail/ProfileContext';
import AuthContext from '../context/Auth/AuthContext';

function SignIn() {
    const navigate = useNavigate();     

    const [formData, SetFormData] = useState({
        email: '',
        password: ''
    });

    const {setUserDetail} = useContext(UserContext);
    const {login} = useContext(AuthContext);

    const signup = () => {
        navigate('/signup');
    };

    const changeHandler = (e) => {
        const { name, value } = e.target;
        SetFormData({ ...formData, [name]: value });
    };

    const signinHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(`http://localhost:3000/auth/signin`, formData, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            });
            const settoken = response.data.token;
            localStorage.setItem('token', settoken);
            setUserDetail(response.data.email);
            if (response.status === 200) {
                toast.success('Login Successfully');
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }
            login();
        } catch (error) {
            if (error.response && error.response.status === 403) {
                toast.error('Wrong email or password');
            } else {
                toast.error('Something went wrong');
            }
        }
    };

    return (
        <form onSubmit={signinHandler} action='' method='post' className="h-screen gap-4 justify-start bg-gradient-to-tl from-gray-900 to-zinc-800 w-full flex-col flex flex-wrap items-center">
            <div><Toaster /></div>
            <h1 className='text-4xl text-white font-bold'>Sign In to <span className='bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text'>ShopEase</span></h1>
            <div className="border-purple-500 border-2 justify-center p-4 bg-gradient-to-tl from-gray-800 to-zinc-700 rounded-lg flex flex-col min-w-[30%]">
                <div className='mb-4'>
                    <h1 className="text-white text-center font-bold text-3xl">Welcome to <span className='bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text'>ShopEase</span></h1>
                    <p className='text-center text-gray-400'>Login to discover exclusive deals!</p>
                </div>
                <div className="relative mb-4">
                    <label htmlFor="email" className="leading-7 text-sm text-gray-300">Email</label>
                    <input
                        minLength={6}
                        maxLength={30}
                        required
                        onChange={changeHandler}
                        placeholder="Enter your email"
                        type="text"
                        value={formData.email}
                        name="email"
                        className="w-full bg-gray-900 rounded border border-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>

                <div className="relative mb-4">
                    <label htmlFor="password" className="leading-7 text-sm text-gray-300">Password</label>
                    <input
                        minLength={8}
                        maxLength={30}
                        required
                        onChange={changeHandler}
                        placeholder='Your Password'
                        type="password"
                        value={formData.password}
                        name="password"
                        className="w-full bg-gray-900 rounded border border-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <button className="text-white bg-pink-600 border-0 py-2 px-8 focus:outline-none hover:bg-pink-700 rounded text-lg">Sign In</button>
                <p className='text-center text-gray-400'>or</p>
                <h1 onClick={signup} className='text-center text-pink-500 cursor-pointer'>Sign up</h1>
            </div>
        </form>
    );
}

export default SignIn;
