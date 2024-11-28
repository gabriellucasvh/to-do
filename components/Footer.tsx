import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className='flex items-center justify-center w-full pb-5'>
            <h2>Feito por <span className='font-bold'>
                    <Link
                        href="https://gabriellucasvh.vercel.app"
                        className='hover:text-pastel-green-500 hover:scale-105 transition-all duration-300 underline'
                        rel='noopener noreferrer'
                        target='_blank'
                        >
                        Gabriel Gonçalves
                    </Link>
                </span>
            </h2>
        </div>
    )
}

export default Footer