'use client'

import { Nav } from '@/components/Nav'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React from 'react'

const WelcomePage = () => {

  const { data: session } = useSession();
  // console.log(session)

  if (!session) {
    redirect('/login')
  }
  return (
    <div>
      <Nav session={session} />
      <div className='container mx-auto'>
        <h3 className='text-3xl my-3'>Welcome User {session?.user?.name}</h3>
        <p>Email : {session?.user?.email}</p>
        <hr className='my-3' />
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam eius soluta tempora maxime eveniet impedit odio, earum perferendis veritatis porro distinctio nihil quaerat fugit iure natus? Eaque velit assumenda enim.</p>
      </div>
    </div>
  )
}

export default WelcomePage