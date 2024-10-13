'use client'

import { Nav } from '@/components/Nav'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter()
  // console.log(session)

  if (session) {
    redirect('/welcome')
  }
  return (
    <main>
      <Nav session={session} />
      <div className='container mx-auto'>
        <h3 className='text-3xl my-3'>Welcome to home page</h3>
        <hr className='my-3' />
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam eius soluta tempora maxime eveniet impedit odio, earum perferendis veritatis porro distinctio nihil quaerat fugit iure natus? Eaque velit assumenda enim.</p>
      </div>
    </main>
  );
}
