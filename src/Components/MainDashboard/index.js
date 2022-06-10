import React from "react"
import Card from '../Cards'
import Navbar from "../Navbar"
import { fetchUserDetails } from '../../helpers/storage';

export default function MainDash() {

    const [userAccounts, setUserAccounts] = React.useState(fetchUserDetails());
    console.log(userAccounts);
    function refetchAccounts() {
        setUserAccounts(fetchUserDetails());
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-4 overflow-auto">
                <h1 className="font-ms-font text-msweight font-bold ">Your Accounts</h1>
                <h1 className="font-ms-font text-msx font-regular ">Accounts you added will be displayed here</h1>
                <div className="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg mt-2" role="alert">
                    <p>HamroShare is in no way affiliated with the CDS and Clearing Limited . This was made just for learning and testing purpose.</p>
                    <p className="text-yellow-500 py-2">When Application is Rejected Due to Insuff Balance , The Site wont Reapply that account on next run . Please apply manually . (Will fix it in next update!) </p>
                    
                </div>

                <div className="grid grid-cols-1  lg:grid-cols-2 2xl:grid-cols-3  gap-4 mt-5 overflow-y-auto ">
                    {userAccounts && userAccounts.map(account => (
                        <Card userData={account} refetchAccounts={refetchAccounts} />
                    ))}


                </div>
            </div>

        </>


    )
}