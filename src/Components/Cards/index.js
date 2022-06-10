import React,{useState} from "react"
import { IdentificationIcon } from '@heroicons/react/outline'
import { deleteAccount } from "../../helpers/storage"
import { TrashIcon,PencilAltIcon } from "@heroicons/react/solid"
import EditModal from "./EditModal"
export default function Card({userData,refetchAccounts}) {

    const [openModal,setOpenModal] = useState(false);

    
    return (
        <div className=" flex ">
            <EditModal isOpen={openModal} setIsOpen={setOpenModal} userData={userData} />
            <div className="bg-ms-bg ">
                <div className="w-30 border-t-8 border-red-800 flex">
                    <div className="w-1/3 pt-6 flex justify-center">
                        <IdentificationIcon className="w-16 h-16 text-white" />
                    </div>
                    <div className="w-full pt-9 pr-4">
                        <h3 className="font-bold text-white">{userData.personalDetails.name}</h3>
                        <p className="text-sm text-gray-400">BOID : {userData.boidDetails.boid}</p>
                        <p className="text-sm text-gray-400">Username : {userData.personalDetails.username}</p>
                        <p className=" text-sm text-gray-400">Bank : {userData.boidDetails.dpName}</p>
                        
                    </div>
                </div>

                <div className="p-4 flex space-x-4">
                    
                    <button className="bg-ms-button flex justify-center items-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button"
                    
                    onClick={()=>{
                            deleteAccount(userData.username);
                            refetchAccounts();

                        }}
                    
                    >
                        <TrashIcon className="h-5 w-5 mr-1"/>Delete
                    </button>
                    <button className="bg-ms-button flex justify-center items-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button"
                    
                    onClick={()=>{setOpenModal(true)}}
                    
                    >
                        <PencilAltIcon className="h-5 w-5 mr-1"/>Edit
                    </button>
                </div>
            </div>
        </div>

    )
}