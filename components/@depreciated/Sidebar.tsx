'use client'
import React,{useState} from "react";
import { HomeIcon,TrashIcon } from "@heroicons/react/20/solid";
import { IdentificationIcon } from "@heroicons/react/20/solid";
import {CogIcon} from "@heroicons/react/20/solid";
import { Discord,Github } from "react-bootstrap-icons";
import ResetModal from "./Modals/ResetModal";
import Link from "next/link";
import { SelectedTab } from "@/interfaces/Sidebar";


export default function Sidebar({ selectedTab }: SelectedTab) {
  const [openModal,setOpenModal] = useState(false);
  return (
    <aside className="font-ms-font overflow-hidden hidden md:block" id="sideBarAside">
      <ResetModal  isOpen={openModal} setIsOpen={setOpenModal}/>
      <div className="flex items-center justify-center shadow">
        <img src="/assets/images/teroshare.png" width={189} height={149} alt="hamroShare logo" />
      </div>
      
      <ul className="mt-5">
        <li>
          <Link
            href="/portal"
            className={`flex items-center px-4 py-2 text-white  hover:bg-ms-hover hover:border-l-4 border-red-500 ${selectedTab === "portal" ? 'bg-ms-hover border-l-4 border-red-500' : ''}`}
          >
            <HomeIcon className="h-5 w-5 " />

            <span className="mx-4 text-sm">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            href="/auto-apply"
            className={`flex items-center px-4 py-2 text-white  hover:bg-ms-hover hover:border-l-4 border-red-500 ${selectedTab==="auto-apply" ? 'bg-ms-hover border-l-4 border-red-500' : ''}`}
          >
            <IdentificationIcon className="h-5 w-5 " />

            <span className="mx-4 text-sm">Auto Apply</span>
          </Link>
        </li>
       
        <li>
          <Link
            href="/add-account"
            className="flex items-center px-4 py-2 text-white  hover:bg-ms-hover hover:border-l-4 border-red-500"
          >
            <CogIcon className="h-5 w-5 " />
            

            <span className="mx-4 text-sm">Add Account</span>
          </Link>
        </li>
        <li>
          <a
            href="https://discord.gg/PrxrbC9qTW"
            className="flex items-center px-4 py-2 text-white  hover:bg-ms-hover hover:border-l-4 border-red-500"
          >
              
              <Discord  className="h-5 w-5 " />

            <span className="mx-4 text-sm">Join Discord</span>
          </a>
        </li>
        <li>
          <a
            href="https://github.com/dineshtiwari69/HamroShare"
            className="flex items-center px-4 py-2 text-white  hover:bg-ms-hover hover:border-l-4 border-red-500"
          >
              
              <Github  className="h-5 w-5 " />

            <span className="mx-4 text-sm">Source</span>
          </a>
        </li>
        <li>
          <div
            
            className="flex items-center px-4 py-2 text-white  hover:bg-ms-hover hover:border-l-4 border-red-500 hover:cursor-pointer"
            onClick={()=>{
              setOpenModal(true);
            }}
          >
              
              <TrashIcon  className="h-5 w-5 " />

            <span className="mx-4 text-sm">Reset</span>
          </div>
        </li>
        
      </ul>
    </aside>
  );
}