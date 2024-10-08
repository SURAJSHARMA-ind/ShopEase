import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phoneno: ''
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`http://localhost:3000/auth/signup`, formData);

      if (response.status === 200) {
        toast.success('Account Created Successfully');
        setTimeout(() => {
          navigate('/signin');
        }, 1000);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('User Already Exists');
      } else if (error.response && error.response.status === 400) {
        toast.error('Incorrect signup format. Please check your inputs.');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={signupHandler}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200 py-8 px-4"
    >
      <Toaster />
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-4 text-blue-600">Sign Up</h1>
        <p className="text-center text-gray-500 mb-6">Join Shopease and start your shopping journey!</p>

        {/* Username Field */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            minLength={6}
            maxLength={30}
            required
            onChange={changeHandler}
            placeholder="Enter Username"
            type="text"
            value={formData.username}
            name="username"
            id="username"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            minLength={6}
            maxLength={100}
            required
            onChange={changeHandler}
            placeholder="Enter Email"
            type="email"
            value={formData.email}
            name="email"
            id="email"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          />
        </div>

        {/* Phone Number Field */}
        <div className="mb-4">
          <label htmlFor="phoneno" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            required
            onChange={changeHandler}
            placeholder="Enter Phone Number"
            type="text"
            value={formData.phoneno}
            name="phoneno"
            id="phoneno"
            maxLength={10}
            minLength={10}
            pattern="\d{10}"
            title="Please enter a valid 10-digit phone number"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            minLength={8}
            maxLength={30}
            required
            onChange={changeHandler}
            placeholder="Your Password"
            type="password"
            value={formData.password}
            name="password"
            id="password"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          disabled={isLoading}
        >
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
}

export default SignUp;
