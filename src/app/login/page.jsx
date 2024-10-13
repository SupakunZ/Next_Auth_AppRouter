'use client'

import { Nav } from '@/components/Nav'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const LoginPage = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const router = useRouter()
  const { data: session } = useSession()

  //ถ้า login แล้วให้ redirect ไปที่หน้า /welcome
  if (session) {
    router.replace('welcome')
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    // console.log(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const email = data.email
      const password = data.password
      const res = await signIn("credentials", {
        email, password, redirect: false
      })

      if (res.error) {
        setError('Invalid credentials');
        return;
      }
      router.replace("welcome") //ไปที่หน้า welcome

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Nav />
      <div className='container mx-auto py-5'>
        <h3 className='text-[20px]'>Login Page</h3>
        <hr className='my-3' />
        <form onSubmit={handleSubmit}>
          {error && (
            <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
              {error}
            </div>
          )}
          <input onChange={(e) => handleChange(e)} className='block bg-gray-300 p-2 my-2 rounded-md' name='email' type="email" placeholder='Enter your email' />
          <input onChange={(e) => handleChange(e)} className='block bg-gray-300 p-2 my-2 rounded-md' name='password' type="password" placeholder='Enter your password' />
          <button type='submit' className='bg-green-500 p-2 rounded-md text-white'>Sign In</button>
        </form>
        <hr className='my-3' />
        <p>Already have an account? go to <Link className='text-blue-500 hover:underline' href='/register'>Register</Link></p>
      </div>
    </div>
  )
}

export default LoginPage