"use client"


import AccountContainer from '@/components/AccountContainer'
import HeroAdvert from '@/components/HeroAdvert'
import AddAccountModal from '@/components/AddAccountModal'
import useLocalStorage from 'use-local-storage'
import { ClientData } from '@/interfaces/Meroshare'
export default function Home() {

  const [clientData] = useLocalStorage<ClientData[]>("credentials", []);

  return (
    <div className='flex flex-col items-center   md:p-10'>



        {clientData.length === 0 ? <HeroAdvert /> :

          <><HeroAdvert />
            <div className='flex-col p-5'>
              <AddAccountModal />

              <AccountContainer />
            </div>
          </>
        }




      </div>
  )
}
