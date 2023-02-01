import React from 'react'
import { useForm } from "react-hook-form";
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

function login() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { signIn } = useAuth()
  const router = useRouter()
  const onSubmit = async (data) => {
    try {
      const response = await signIn(data)
      console.log(response);
      if (response.status == 'success') {
        localStorage.setItem('user', response.data.user)
        localStorage.setItem('token', response.data.token)
          toast.success(response.msg, {
              position: toast.POSITION.TOP_RIGHT
          });
          router.push('/')
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
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                    {...register("password", { required: true, minLength: 6 })}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                {errors.password?.type === 'required' && <p className='text-sm text-rose-500' role="alert">Password is required</p>}
                {errors.password?.type === 'minLength' && <p className='text-sm text-rose-500' role="alert">Password length must be greater than 6</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

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