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
            <div class="container mx-auto px-4 py-4 overflow-auto">
                <h1 className="font-ms-font text-msweight font-bold ">Your Accounts</h1>
                <h1 className="font-ms-font text-msx font-regular ">Accounts you added will be displayed here</h1>
                <div class="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg mt-2" role="alert">
                    <p>HamroShare is in no way affiliated with the CDS and Clearing Limited . This was made just for learning and testing purpose.</p>
                    <p className="text-yellow-500">If you want to change the CRN and PIN , delete the account and re-add it.</p>
                    
                </div>

                <div class="grid grid-cols-1  lg:grid-cols-2 2xl:grid-cols-3  gap-4 mt-5 overflow-y-auto ">
                    {userAccounts && userAccounts.map(account => (
                        <Card userData={account} refetchAccounts={refetchAccounts} />
                    ))}


                </div>
            </div>

        </>


    )
}