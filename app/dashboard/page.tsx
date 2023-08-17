import React from 'react'
import Sidebar from '@/components/Sidebar'
import MainDash from '@/components/MainDashboard'

export default function Dashboard() {
    return (
        <div className="parent md:h-screen md:grid md:grid-cols-6 overflow-hidden">
            <section className="sidebar bg-ms-bg md:col-span-1 "> <Sidebar selectedTab={"portal"} /></section>

            <main className="main  md:col-span-5 overflow-auto">
               <MainDash/>
                
            </main>
        </div>
    )
}
