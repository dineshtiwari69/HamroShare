
import Sidebar from "../Components/Sidebar"
import React from "react"
import MainDash from "../Components/MainDashboard"
import AutoApplier from "../Components/AutoApply"
import Status from "./Status"
export default function Dashboard({selectedTab}) {
    
    return (
        <div className="parent md:h-screen md:grid md:grid-cols-6 overflow-hidden">
            <section className="sidebar bg-ms-bg md:col-span-1 "> <Sidebar  selectedTab={selectedTab}/></section>

            <main className="main  md:col-span-5 overflow-auto">
                {selectedTab === "portal" && <MainDash/>}
                {selectedTab === "auto-apply" && <AutoApplier/>}
                {selectedTab === "status" && <Status/>}
                {/* <MainDash /> */}
            </main>
        </div>


    )
}