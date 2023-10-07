import React from 'react'
import Link from 'next/link'
import { DISCORD,TWITTER } from '@/constants'
import { ThemeToggle } from './theme-toggle'
import { NavigationMenuDemo } from './NavigationMenu'
import Image from 'next/image'
import { PrivacyToggle } from './privacy-toggle'
import { DiscordLogoIcon,TwitterLogoIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button'
export default function Header() {


    return (
        <div className=' border-b '>
            <div className=" top-0 w-full flex justify-center bg-white/0 z-30 transition-all">
                <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
                    <div className=' flex gap-10'>
                        <a className="flex items-center font-display text-3xl font-extrabold" href="/">
                            <Image alt="Precedent logo" loading="lazy" width={30} height={30} className="mr-2 rounded-sm" src="/hamroshare.png" />
                            {/* <p>HamroShare</p> */}
                        </a>
                        <div className='flex justify-center items-center gap-5'>
                            <NavigationMenuDemo />
                        </div>

                    </div>




                    <div className=''>
                        <ThemeToggle />
                        <PrivacyToggle />
                        <Link href={DISCORD} target='_blank'>
                        <Button 
                            variant="ghost"
                            size="icon"
                            

                        >
                            <DiscordLogoIcon className="h-[1.5rem] w-[1.3rem] " />
                            <span className="sr-only">Discord</span>
                        </Button>
                        </Link>
                        <Link href={TWITTER} target='_blank'>
                        <Button 
                            variant="ghost"
                            size="icon"
                            

                        >
                            <TwitterLogoIcon className="h-[1.5rem] w-[1.3rem] " />
                            <span className="sr-only">Twitter</span>
                        </Button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}
