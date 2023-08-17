'use client'

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

import { ClientData,PersonalDetails,BoidDetails,BankDetails} from "@/interfaces/Meroshare"
// import useLocalStorage from "@/hooks/useLocalStorage"
import useLocalStorage from "use-local-storage";

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { ClientLogin, GetClientDetails, GetClientBOIDData, GetClientBankDetails } from "@/lib/actions/meroshare"
import { toast } from "react-toastify"


interface Props{
    username : string,
}

interface FormElements extends HTMLFormControlsCollection {
   

    password: HTMLInputElement;
    crn: HTMLInputElement;
    pin: HTMLInputElement;
}

interface FormElement extends HTMLFormElement {
    readonly elements: FormElements;
}



export default function EditAccount({username}:Props) {

    const {toast} = useToast();

    const [clientData, setClientData] = useLocalStorage<ClientData[]>("credentials",[]);

    const handleSubmit = async (e: React.FormEvent<FormElement>) => {
        e.preventDefault();
        const target = e.currentTarget;
        const newPassword = target.elements.password.value;
        const newCRN = target.elements.crn.value;
        const newPIN = target.elements.pin.value;
        
        console.log(clientData);
        const findClientByUsername = clientData.find((client) => client.username === username);
        

        if (findClientByUsername) {


            ClientLogin(parseInt(findClientByUsername.clientId),findClientByUsername.username,newPassword).then((res) => {
                if(res){

                    const newClientData= clientData.map((client) => {
                        if(client.username === username){
                            client.password = newPassword;
                            client.crn = newCRN;
                            client.pin = newPIN;
                        }
                        return client;
                    })
                    setClientData(newClientData);
                    toast({
                        title: "Account updated",
                        description: "Your account has been updated successfully",
                    })

                }
                
            }).catch((err) => {
                toast({
                    title: "Invalid Password",
                    description: "Your account couldn't be updated",
                })
            })
        }

    }






  return (
    <form  onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Add your meroshare account</CardTitle>
                    <CardDescription>
                        Add your meroshare account to get started
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                   
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" name="username" placeholder="" disabled  defaultValue={username}/>
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
                    <Button variant="ghost" type="button" >Cancel</Button>
                    <Button type="submit" >
                        Submit
                    </Button>
                </CardFooter>
            </Card>
        </form>
  )
}
