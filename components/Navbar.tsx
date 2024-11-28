'use client'

import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { ModeToggle } from './ModeToggle'



const Navbar = () => {
    return (
        <div className='flex items-center justify-between h-20 border-b w-full px-4 md:px-20'>
            <Link href="/" className='flex items-center gap-2'>
                <Image
                    src="/logo.png"
                    width={60}
                    height={60}
                    alt="Task Master logo"
                    quality={100}
                />
                <span className='font-bold text-2xl'>Task Master</span>
            </Link>
            <ModeToggle />
        </div>
    )
}

export default Navbar