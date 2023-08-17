'use client'

import React from 'react'
import AddAccountModal from './AddAccountModal'
import { GithubStar } from './GithubStar'

export default function HeroAdvert() {
    return (
        <div className='md:flex relative p-10' >
            <div className='relative'>
                <img src='/char.png' className='animate-pulse w-[80%]' alt='Hamroshare' />

                


                {/* <h1 className='absolute top-10  text-5xl  text-black dark:text-white uppercase font-extrabold drop-shadow text-center'>Let go of Demat Hassle</h1> */}
            </div>
            <div className='mt-10 max-w-lg p-2'>
                <h1 className='  text-5xl  text-black dark:text-white uppercase font-extrabold '>Add Your <span className='dark:text-[#fbed5e] text-[#ed4235]'>Meroshare</span> Account</h1>
                <p>Hamroshare will apply for an ipo through multiple meroshare accounts at once. </p>
                <div className='w-full'>
                    <GithubStar />
                </div>
                <AddAccountModal className='w-full mt-2' />


            </div>

        </div>
    )
}
