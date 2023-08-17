import React from "react";
import { Bars2Icon } from "@heroicons/react/20/solid";

export default function Navbar() {
    function toggleSidebar(){
        let sideBarDom = document.getElementById("sideBarAside");
        (sideBarDom as HTMLDivElement).classList.toggle("hidden");
    }
  return (
    <nav className="flex items-center justify-between flex-wrap shadow p-6 ">
      <Bars2Icon className="h-5 text-black md:hidden" onClick={toggleSidebar}/>
    </nav>
  );
}