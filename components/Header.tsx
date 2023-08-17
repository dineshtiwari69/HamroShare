import React from 'react'

import { ThemeToggle } from './theme-toggle'
import { NavigationMenuDemo } from './NavigationMenu'
import Image from 'next/image'

export default function Header() {


    return (
        <div className=' border-b '>
            <div className=" top-0 w-full flex justify-center bg-white/0 z-30 transition-all">
                <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
                    <div className=' flex gap-10'>
                        <a className="flex items-center font-display text-3xl font-extrabold" href="/">
                            <Image alt="Precedent logo" loading="lazy" width={30} height={30} className="mr-2 rounded-sm"  src="/hamroshare.png" />
                            {/* <p>HamroShare</p> */}
                        </a>
                        <div className='flex justify-center items-center gap-5'>
                            <NavigationMenuDemo />
                        </div>

                    </div>




                    <div>
                        <ThemeToggle />


                    </div>
                </div>
            </div>
        </div>
    )
}
