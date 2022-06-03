import React from 'react';

import { HomeIcon } from '@heroicons/react/solid'
import { UserIcon } from '@heroicons/react/outline'
import { LockOpenIcon } from '@heroicons/react/outline'
import teroShare from "../assets/images/teroshare.png";

import { Link } from 'react-router-dom';
import { getCapitals, teroshareLogin } from '../TeroShare';
import { toast } from 'react-toastify';
import { addDetails, accountExists } from '../helpers/storage';

export default function AddAccount() {

    const [capitals, setCapitals] = React.useState();
    const [isLoggingIn, setIsLoggingIn] = React.useState(false);


    React.useEffect(() => {
        getCapitals().then(setCapitals);
    }, []);



    const submit = (e) => {
        setIsLoggingIn(true);
        e.preventDefault();
        let username = e.target.username.value;
        let password = e.target.password.value;
        let capital = e.target.capital.value;

        let pin = e.target.pinCode.value;
        let crn = e.target.crnNumber.value;
        if (accountExists(username)) {
            toast.error("Account already exists");
            setIsLoggingIn(false);
            return;
        }

        teroshareLogin(capital, username, password, pin, crn).then(res => {
            console.log("THIS MSG",res)
            if (res.message && res.message.includes("Attempts")) {
                toast.error("Invalid credentials");
                setIsLoggingIn(false);
                return;
            }
            toast.success("Login Successful");
            addDetails(res);
            setIsLoggingIn(false);



        });
    }





    return (
        <div class="grid place-items-center h-screen bg-ms-bg">
            <div class="w-full max-w-md	">
                <form class="bg-ms-bg shadow-2xl rounded px-8 pt-6 pb-8 mb-4" onSubmit={submit}>
                    {/* Centered Image */}
                    <div class="flex items-center justify-center text-center">
                        <img src={teroShare} alt="teroShare" />
                    </div>
                    <div class="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg " role="alert">
                      We donot have a way to check your CRN and PinCode . Please double check it , else it will not work during the applying process.
                    </div>
                    <div class="mb-4">
                        <label class="block text-white text-xs mb-2" for="username">
                            <HomeIcon className="h-4 w-4 inline mr-2 mb-1" />Depository Participants
                        </label>
                        <div class="inline-block relative w-full">
                            <select class="block appearance-none text-xs w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" name="capital" id="capital" required>
                                {capitals && capitals.map(capital => (
                                    <option key={capital.id} value={capital.id}>{capital.name} ({capital.code})</option>
                                ))}
                            </select>

                        </div>
                    </div>
                    <div class="mb-4">
                        <label class="block text-white text-xs mb-2" for="username">
                            <UserIcon className="h-4 w-4 inline mr-2 mb-1" />Username
                        </label>

                        <div class="inline-block relative w-full">
                            <input class="shadow appearance-none border rounded text-xs w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" name="username" type="text" placeholder="Username" required />

                        </div>
                    </div>
                    <div class="mb-4">
                        <label class="block text-white text-xs mb-2" for="username">
                            <LockOpenIcon className="h-4 w-4 inline mr-2 mb-1 text-xs" />Password
                        </label>

                        <div class="inline-block relative w-full">
                            <input class="shadow text-xs appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" required />

                        </div>
                    </div>
                    <div className='md:flex'>
                        <div class="mb-4 w-full">
                            <label class="block text-white text-xs mb-2" for="username">
                                <LockOpenIcon className="h-4 w-4 inline mr-2 mb-1 text-xs" />CRN number
                            </label>

                            <div class="inline-block relative w-full">
                                <input class="shadow appearance-none border text-xs rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="crnNumber" type="text" placeholder="CRN Number" required />

                            </div>
                        </div>
                        <div class="mb-4 w-full">

                            <label class="block text-white text-xs mb-2" for="username">
                                <LockOpenIcon className="h-4 w-4 inline mr-2 mb-1 text-xs" />Pin
                            </label>

                            <div class="inline-block relative w-full ">
                                <input class="shadow appearance-none border text-xs rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="pinCode" type="number" placeholder="Pin Code"  
                                max={9999} min={1000}
                                required/>

                            </div>
                        </div>

                    </div>

                    <div class="flex items-center justify-between">
                        <button class="bg-ms-button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" name="submit" type="submit" >
                            {isLoggingIn ? 'Adding Account....' : 'Add Account'}
                        </button>
                    </div>
                    <p class="text-center text-white text-sm mt-2 ">
                        <Link to="/portal" class="hover:text-blue-600">
                            Take Me To Dashboard
                        </Link>
                    </p>
                </form>

            </div>
        </div>
    );

}


