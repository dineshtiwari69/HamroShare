import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { toast } from 'react-toastify';
import { LockOpenIcon } from "@heroicons/react/20/solid";

import { editUserDetails } from "@/lib/sorage";
import { ClientData } from "@/interfaces/Sidebar";

interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    userData: ClientData;
}

export default function EditModal({ isOpen, setIsOpen, userData }: Props) {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const submit = (e: React.FormEvent<HTMLFormElement> ) => {
        setIsLoggingIn(true);
        e.preventDefault();
        let username = userData.username;
        //@ts-ignore
        let password = e.target.password.value;
        let capital = userData.clientId;
        //@ts-ignore
        let pin = e.target.pinCode.value;
        if (pin.length !== 4) {
            toast.error("Pin Must be 4 Digit.");
            setIsLoggingIn(false);
            return;
        }
        function isNumeric(n: string) {
            return !isNaN(parseInt(n)) && isFinite(parseInt(n));
        }
        if (!isNumeric(pin)) {
            toast.error("Pin Must be Numeric");
            setIsLoggingIn(false);
            return;
        }
        if (parseInt(pin) < 0) {
            toast.error("Pin Must be Greater than zero");
            setIsLoggingIn(false);
            return;
        }
        //@ts-ignore
        let crn = e.target.crnNumber.value;


       
    };
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={() => {
                    setIsOpen(false);
                }}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-ms-bg p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-white p-4"
                                >
                                    EDIT ACCOUNT ({userData.personalDetails.name})
                                </Dialog.Title>
                                <form className="bg-ms-bg  rounded px-8 pt-6 pb-8 mb-4" onSubmit={submit}>
                                    <div className="mb-4">
                                        <label
                                            className="block text-white text-xs mb-2"
                                            htmlFor="username"
                                        >
                                            <LockOpenIcon className="h-4 w-4 inline mr-2 mb-1 text-xs" />
                                            Password
                                        </label>

                                        <div className="inline-block relative w-full">
                                            <input
                                                className="shadow text-xs appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="password"
                                                type="password"
                                                placeholder="Password"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="md:flex">
                                        <div className="mb-4 w-full">
                                            <label
                                                className="block text-white text-xs mb-2"
                                                htmlFor="username"
                                            >
                                                <LockOpenIcon className="h-4 w-4 inline mr-2 mb-1 text-xs" />
                                                CRN number
                                            </label>

                                            <div className="inline-block relative w-full">
                                                <input
                                                    className="shadow appearance-none border text-xs rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    id="crnNumber"
                                                    type="text"
                                                    placeholder="CRN Number"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4 w-full">
                                            <label
                                                className="block text-white text-xs mb-2"
                                                htmlFor="username"
                                            >
                                                <LockOpenIcon className="h-4 w-4 inline mr-2 mb-1 text-xs" />
                                                Pin
                                            </label>

                                            <div className="inline-block relative w-full ">
                                                <input
                                                    className="shadow appearance-none border text-xs rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    id="pinCode"
                                                    type="text"
                                                    placeholder="Pin Code"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center w-full rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"

                                            disabled={isLoggingIn}
                                        >
                                            {isLoggingIn ? "Editting" : "Edit"}
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}