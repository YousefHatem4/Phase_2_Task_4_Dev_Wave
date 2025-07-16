import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../Context/userContext';
import axios from 'axios';


export default function Register() {
    const [passwordHidden, setPasswordHidden] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    let navigate = useNavigate();
    let { setUserToken } = useContext(userContext);

    async function register(values) {
        try {
            setLoading(true);
            setError(null);
            let { data } = await axios.post(`https://eldeeb.pythonanywhere.com/api/auth/register/`, values);
            localStorage.setItem('userToken', data.access);
            setUserToken(data.access);
            navigate('/login');
        } catch (error) {
            console.error("Registration Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        first_name: Yup.string()
            .matches(/^[A-Za-z]+$/, 'First name must only contain letters')
            .required('First name is required'),
        last_name: Yup.string()
            .matches(/^[A-Za-z]+$/, 'Last name must only contain letters')
            .required('Last name is required'),
        phone_number: Yup.string()
            .matches(/^(010|011|012|015)[0-9]{8}$/, 'Phone number is not valid')
            .required('Phone number is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            phone_number: ''
        },
        validationSchema,
        onSubmit: register
    });

    return (
        <div className="flex flex-col min-h-screen bg-gray-900">
           

            <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
                    <div className="text-center">
                        <div className="mx-auto w-20 h-20 rounded-full bg-red-600 flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-extrabold text-white">
                            Create a new account
                        </h2>
                        <p className="mt-2 text-sm text-gray-300">
                            Or{' '}
                            <Link to="/login" className="font-medium text-red-500 hover:text-red-400">
                                sign in to your existing account
                            </Link>
                        </p>
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-900/50 p-4 border border-red-700">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-100">{error}</h3>
                                </div>
                            </div>
                        </div>
                    )}

                    <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-300 mb-1">
                                    First name
                                </label>
                                <div>
                                    <input
                                        type="text"
                                        name="first_name"
                                        id="first_name"
                                        autoComplete="given-name"
                                        value={formik.values.first_name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="appearance-none relative block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-white sm:text-sm"
                                        disabled={loading}
                                    />
                                    {formik.touched.first_name && formik.errors.first_name && (
                                        <p className="mt-1 text-sm text-red-400">{formik.errors.first_name}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="last_name" className="block text-sm font-medium text-gray-300 mb-1">
                                    Last name
                                </label>
                                <div>
                                    <input
                                        type="text"
                                        name="last_name"
                                        id="last_name"
                                        autoComplete="family-name"
                                        value={formik.values.last_name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="appearance-none relative block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-white sm:text-sm"
                                        disabled={loading}
                                    />
                                    {formik.touched.last_name && formik.errors.last_name && (
                                        <p className="mt-1 text-sm text-red-400">{formik.errors.last_name}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                Email address
                            </label>
                            <div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="appearance-none relative block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-white sm:text-sm"
                                    disabled={loading}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <p className="mt-1 text-sm text-red-400">{formik.errors.email}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-300 mb-1">
                                Phone number
                            </label>
                            <div>
                                <input
                                    id="phone_number"
                                    name="phone_number"
                                    type="tel"
                                    autoComplete="tel"
                                    value={formik.values.phone_number}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="appearance-none relative block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-white sm:text-sm"
                                    disabled={loading}
                                />
                                {formik.touched.phone_number && formik.errors.phone_number && (
                                    <p className="mt-1 text-sm text-red-400">{formik.errors.phone_number}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={passwordHidden ? 'password' : 'text'}
                                    autoComplete="new-password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="appearance-none relative block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-white sm:text-sm pr-10"
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                                    onClick={() => setPasswordHidden(!passwordHidden)}
                                >
                                    {passwordHidden ? (
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {formik.touched.password && formik.errors.password && (
                                <p className="mt-1 text-sm text-red-400">{formik.errors.password}</p>
                            )}
                        </div>

                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-600 rounded bg-gray-700"
                                    required
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="font-medium text-gray-300">
                                    I agree to the{' '}
                                    <Link to="/terms" className="text-red-500 hover:text-red-400">
                                        Terms and Conditions
                                    </Link>
                                </label>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Registering...
                                    </>
                                ) : (
                                    <>
                                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                            <svg className="h-5 w-5 text-red-300 group-hover:text-red-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                        Register
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>

        </div>
    );
}