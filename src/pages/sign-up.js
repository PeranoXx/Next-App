import { useRouter } from 'next/router';
import React from 'react'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/useAuth';

function login() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const router = useRouter()
    const { signUp } = useAuth()
    const onSubmit = async (data) => {
        try {
            const response = await signUp(data)
            if (response.status == 'success') {
                toast.success(response.msg, {
                    position: toast.POSITION.TOP_RIGHT
                });
                router.push('/sign-in')
            }
            else {
                toast.error(response.msg, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }

        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        }

    }


    return (
        <>
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create your new account</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value="Parth Vakharia"
                                        {...register("name", { required: true })}
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {errors.name?.type === 'required' && <p className='text-sm text-rose-500' role="alert">Name is required</p>}

                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        name="email"
                                        type="text"
                                        {...register("email", { required: true, pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })}
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {errors.email?.type === 'required' && <p className='text-sm text-rose-500' role="alert">Email is required</p>}
                                {errors.email?.type === 'pattern' && <p className='text-sm text-rose-500' role="alert">Email is invalid</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        name="password"
                                        type="password"
                                        value="111111"
                                        {...register("password", { required: true, minLength: 6 })}
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {errors.password?.type === 'required' && <p className='text-sm text-rose-500' role="alert">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className='text-sm text-rose-500' role="alert">Password length must be greater than 6</p>}
                            </div>

                            <div>
                                <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        name="confirm_password"
                                        type="password"
                                        value="111111"
                                        {...register("confirm_password", { required: true, minLength: 6, validate: (value, formValues) => value === formValues.password })}
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {errors.confirm_password?.type === 'required' && <p className='text-sm text-rose-500' role="alert">Password is required</p>}
                                {errors.confirm_password?.type === 'minLength' && <p className='text-sm text-rose-500' role="alert">Password length must be greater than 6</p>}
                                {errors.confirm_password?.type === 'validate' && <p className='text-sm text-rose-500' role="alert">Password and Confirm password must be same</p>}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        {...register("check", { required: true })}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        I agree <a href="#" className='text-indigo-600'> Terms & Conditions</a>
                                    </label>
                                </div>
                            </div>
                            {errors.check?.type === 'required' && <p className='text-sm text-rose-500' role="alert">Please accept terms & conditions</p>}

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default login