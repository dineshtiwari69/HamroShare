"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Capital } from "@/interfaces/Meroshare"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ClientData,PersonalDetails,BoidDetails,BankDetails} from "@/interfaces/Meroshare"
// import useLocalStorage from "@/hooks/useLocalStorage"
import useLocalStorage from "use-local-storage";

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { ClientLogin, GetClientDetails, GetClientBOIDData, GetClientBankDetails } from "@/lib/actions/meroshare"


interface FormElements extends HTMLFormControlsCollection {
    capital: HTMLInputElement;
    username: HTMLInputElement;
    password: HTMLInputElement;
    crn: HTMLInputElement;
    pin: HTMLInputElement;
}

interface FormElement extends HTMLFormElement {
    readonly elements: FormElements;
}



export function AddAccount({closeModal}: { closeModal: () => void}) {
    const { toast } = useToast()

    const [capital, setCapital] = useState<Capital[]>([]);


    useEffect(() => {
        fetch('/api/meroShare/capital')
            .then(res => res.json())
            .then(data => setCapital(data))
    }, [])



    const [account, setAccount] = useLocalStorage('credentials', [] as ClientData[]);
    const [capitalId, setCapitalId] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);


    async function handleAddAccount(e: React.FormEvent<FormElement>) {

        e.preventDefault();
        const form = e.currentTarget;
        const data = {
            capital: capitalId,
            username: form.elements.username.value,
            password: form.elements.password.value,
            crn: form.elements.crn.value,
            pin: form.elements.pin.value,
        }
        if (account) {
            const accountAlreadyExist = account.find((item) => item.username === data.username);
            if (accountAlreadyExist) {

                toast({
                    title: "Account already exist",


                })
            } else {



                const prepareData : ClientData = {
                    clientId: data.capital,
                    username: data.username,
                    password: data.password,
                    pin: data.pin,
                    crn: data.crn,
                    personalDetails  :  {} as PersonalDetails,
                    boidDetails: {} as BoidDetails,
                    bankDetails: {} as BankDetails,

                };
                ClientLogin(parseInt(data.capital), data.username, data.password).then((res) => {
                    if (res) {



                        toast({
                            title: "Verified Credentials",
                            description: "Fetching Client Data Now..",

                        })

                        const token = res.token;
                        GetClientDetails(token).then((res) => {

                            if (res) {
                                console.log("GetClientDetails", res);
                                prepareData.personalDetails = res;
                                toast({
                                    title: "Account Details Fetched",
                                    description: "Now fetching boid data....",
                                })

                                GetClientBOIDData(token, res.demat).then((res) => {
                                    if (res) {
                                        prepareData.boidDetails = res;
                                        toast({
                                            title: "BOID Details Fetched",
                                            description: "Now fetching BankIssue data....",
                                        })

                                        console.log("GetClientBOIDData", res);
                                        GetClientBankDetails(token, res.bankCode).then((res) => {
                                            if (res) {
                                                prepareData.bankDetails = res;
                                                toast({
                                                    title: "Neccessary Information Fetched and Account Saved.",
                                                    description: "You can now use this account to apply ipo.",
                                                })


                                                // setAccount([...account, prepareData]);
                                                //this is not appending to the array
                                                const newAccount = [...account, prepareData];
                                                console.log("newAccount", newAccount);
                                                setAccount(newAccount);

                                            }
                                        }).catch((err) => {
                                            toast({
                                                title: "Error Fetching Details",
                                                description: err.message,
                                            })
                                        }
                                        )

                                    }
                                }).catch((err) => {
                                    toast({
                                        title: "Error Fetching Details",
                                        description: err.message,
                                    })
                                })


                            }
                        }).catch((err) => {
                            toast({
                                title: "Error Fetching Details",
                                description: err.message,
                            })
                        })



                    }
                }).catch((err) => {
                    toast({
                        title: "Unable to Login",
                        description: " Make Sure you have entered correct credentials and Client",
                    })

                    setLoading(false);
                })




            }
        }




    }










    return (
        <form onSubmit={handleAddAccount}>
            <Card>
                <CardHeader>
                    <CardTitle>Add your meroshare account</CardTitle>
                    <CardDescription>
                        Add your meroshare account to get started
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="w-full  ">
                        <Label htmlFor="capital ">Capital</Label>
                        <ScrollArea className=" rounded-md border p-4 max-h-100 mt-2">
                            <Select name="capital" required onValueChange={setCapitalId}>
                                <SelectTrigger id="capital" >
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>


                                <SelectContent className="max-h-100"  >
                                    <ScrollArea className="h-60	 w-full rounded-md border">

                                        {capital.map((item) => (
                                            <SelectItem value={item.id.toString()} key={item.id}>{item.name} ({item.code})</SelectItem>
                                        ))}
                                    </ScrollArea>

                                </SelectContent>



                            </Select>
                        </ScrollArea>

                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" name="username" placeholder="" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="grid gap-2">
                            <Label htmlFor="crn">CRN Number</Label>
                            <Input id="crn" name="crn" type="text" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="pin">PIN</Label>
                            <Input id="pin" name="pin" type="text" required />
                        </div>

                    </div>
                </CardContent>
                <CardFooter className="justify-between space-x-2">
                    <Button variant="ghost" onClick={closeModal}>Cancel</Button>
                    <Button type="submit" disabled={loading}>
                        {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}


                        Submit
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}