'use client'
import React from 'react'
import { ClientData } from '@/interfaces/Meroshare';
import { AccountCard } from './AccountCard';
import useLocalStorage from "use-local-storage";


export default function AccountContainer() {
    const [account] = useLocalStorage('credentials', [] as ClientData[]);



    return (
        <div className='grid md:grid-cols-3 gap-2'>

            {account.map((item, index) => (
                <AccountCard key={index} account={item} />
            ))}
         

        </div>
    )
}
