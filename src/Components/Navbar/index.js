import React from "react";
import { MenuIcon } from "@heroicons/react/outline";

export default function Navbar() {
    function toggleSidebar(){
        let sideBarDom = document.getElementById("sideBarAside");
        sideBarDom.classList.toggle("hidden");
    }
  return (
    <nav className="flex items-center justify-between flex-wrap shadow p-6 ">
      <MenuIcon className="h-5 text-black md:hidden" onClick={toggleSidebar}/>
    </nav>
  );
}
