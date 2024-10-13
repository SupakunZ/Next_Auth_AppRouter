'use client'

import { Nav } from '@/components/Nav'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

const RegisterPage = () => {

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [confirmPassword, setConfirmPassword] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const { data: session } = useSession()

  //ถ้า login แล้วให้ redirect ไปที่หน้า /welcome
  if (session) {
    redirect('/welcome')
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    // console.log(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (data.password != confirmPassword) {
      return setError('Password do not match!');
    }
    if (!data.name || !data.email || !data.password) {
      return setError('Please complete all inputs!');
    }

    try {
      //check email
      const resCheckUser = await fetch('/api/checkUser', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const { user } = await resCheckUser.json() //**แปลงเป็น Object** ใช้ fetch ต้องแปลง ทุกครั้ง**
      console.log(user)

      //ถ้ามี email ซ้ำ
      if (user) {
        setError("User already exists!")
        return;
      }

      //fetch to database
      const res = await fetch('/api/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        const form = e.target
        setSuccess('User registration successfully!')
        setError('')
        form.reset()
      } else {
        console.log("User registration failed.")
      }
    } catch (error) {
      console.log('Error during registration:', error)
    }
  }

  useEffect(() => {
    setError('')
  }, [data, confirmPassword])


  return (
    <div>
      <Nav />
      <div className='container mx-auto py-5'>
        <h3 className='text-[20px]'>Register Page</h3>
        <hr className='my-3' />
        <form onSubmit={handleSubmit}>
          {error && (
            <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
              {error}
            </div>
          )}
          {success && (
            <div className='bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
              {success}
            </div>
          )}
          <input onChange={(e) => handleChange(e)} className='block bg-gray-300 p-2 my-2 rounded-md' type="text" name='name' placeholder='Enter your name' />
          <input onChange={(e) => handleChange(e)} className='block bg-gray-300 p-2 my-2 rounded-md' type="email" name='email' placeholder='Enter your email' />
          <input onChange={(e) => handleChange(e)} className='block bg-gray-300 p-2 my-2 rounded-md' type="password" name='password' placeholder='Enter your password' />
          <input onChange={(e) => setConfirmPassword(e.target.value)} className='block bg-gray-300 p-2 my-2 rounded-md' type="password" name='confirmPassword' placeholder='Confirm your password' />
          <button type='submit' className='bg-green-500 p-2 rounded-md text-white'>Sign Up</button>
        </form>
        <hr className='my-3' />
        <p>Already have an account? go to <Link className='text-blue-500 hover:underline' href='/login'>Login</Link></p>
      </div>
    </div>
  )
}

export default RegisterPage