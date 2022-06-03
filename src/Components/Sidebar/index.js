import React from "react"
import teroShare from '../../assets/images/teroshare.png';
import { HomeIcon } from '@heroicons/react/solid'
import { IdentificationIcon } from '@heroicons/react/outline'
import { CogIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom';
export default function Sidebar({ selectedTab }) {
    console.log(selectedTab)
    return (
        <aside className="font-ms-font overflow-hidden">
            <div class="flex items-center justify-center shadow">
                <img src={teroShare} alt="teroShare" width={189} height={149} />
            </div>
            <ul className="mt-5">
                <li>
                <Link to="/portal" className="flex items-center px-4 py-2 text-white  hover:bg-ms-hover hover:border-l-4 border-red-500" >
                        <HomeIcon className="h-5 w-5 " />

                        <span className="mx-4 text-sm">Dashboard</span>


                    </Link>
                </li>
                <li>
                    <Link to="/auto-apply" className="flex items-center px-4 py-2 text-white  hover:bg-ms-hover hover:border-l-4 border-red-500" >
                        <IdentificationIcon className="h-5 w-5 " />

                        <span className="mx-4 text-sm">Auto Apply</span>


                    </Link>
                </li>
                <li>
                <Link to="/add-account" className="flex items-center px-4 py-2 text-white  hover:bg-ms-hover hover:border-l-4 border-red-500" >
                        <CogIcon className="h-5 w-5 " />

                        <span className="mx-4 text-sm">Add Account</span>


                    </Link>
                </li>

            </ul>
        </aside>

    )
}