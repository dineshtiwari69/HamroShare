import React,{useState} from "react";
import teroShare from "../../assets/images/teroshare.png";
import { HomeIcon,TrashIcon } from "@heroicons/react/solid";
import { IdentificationIcon } from "@heroicons/react/outline";
import { CogIcon } from "@heroicons/react/outline";
import { Discord,Github } from "react-bootstrap-icons";
import ResetModal from "./ResetModal"
import { Link } from "react-router-dom";

export default function Sidebar({ selectedTab }) {
  const [openModal,setOpenModal] = useState(false);
  return (
    <aside className="font-ms-font overflow-hidden">
      <ResetModal  isOpen={openModal} setIsOpen={setOpenModal}/>
      <div className="flex items-center justify-center shadow">
        <img src={teroShare} alt="teroShare" width={189} height={149} />
      </div>
      <ul className="mt-5">
        <li>
          <Link
            to="/portal"
            className={`flex items-center px-4 py-2 text-white  hover:bg-ms-hover hover:border-l-4 border-red-500 ${selectedTab==="portal" ? 'bg-ms-hover border-l-4 border-red-500' : ''}`}
          >
            <HomeIcon className="h-5 w-5 " />

            <span className="mx-4 text-sm">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="/auto-apply"
            className={`flex items-center px-4 py-2 text-white  hover:bg-ms-hover hover:border-l-4 border-red-500 ${selectedTab==="auto-apply" ? 'bg-ms-hover border-l-4 border-red-500' : ''}`}
          >
            <IdentificationIcon className="h-5 w-5 " />

            <span className="mx-4 text-sm">Auto Apply</span>
          </Link>
        </li>
        {/* <li>
          <Link
            to="/status"
            className="flex items-center px-4 py-2 text-white  hover:bg-ms-hover hover:border-l-4 border-red-500"
          >
            <ClipboardListIcon className="h-5 w-5 " />

            <span className="mx-4 text-sm">Status</span>
          </Link>
        </li> */}
        
        <li>
          <Link
            to="/add-account"
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
