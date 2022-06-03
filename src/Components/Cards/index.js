import React from "react"
import { IdentificationIcon } from '@heroicons/react/outline'
import { deleteAccount } from "../../helpers/storage"
export default function Card({userData,refetchAccounts}) {
    
    return (
        <div class=" flex justify-center items-center">
            <div class="bg-ms-bg ">
                <div class="w-30 border-t-8 border-red-800 flex">
                    <div class="w-1/3 pt-6 flex justify-center">
                        <IdentificationIcon className="w-16 h-16 text-white" />
                    </div>
                    <div class="w-full pt-9 pr-4">
                        <h3 class="font-bold text-white">{userData.personalDetails.name}</h3>
                        <p class="text-sm text-gray-400">BOID : {userData.boidDetails.boid}</p>
                        <p class="text-sm text-gray-400">Username : {userData.personalDetails.username}</p>
                        <p class=" text-sm text-gray-400">Bank : {userData.boidDetails.dpName}</p>
                        
                    </div>
                </div>

                <div class="p-4 flex space-x-4">

                    <button class="bg-ms-button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button"
                    
                    onClick={()=>{
                            deleteAccount(userData.username);
                            refetchAccounts();

                        }}
                    
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>

    )
}