"use client"


import { Skeleton } from "./ui/skeleton"
import useLocalStorage from "use-local-storage"
import { ClientData } from "@/interfaces/Meroshare"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { GetApplicableSharesMulti } from "@/lib/actions/meroshare"
import { CompanyShare } from "@/interfaces/Meroshare"
import { Input } from "@/components/ui/input"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Label } from "./ui/label"
import { useEffect, useState } from "react"
import { useAtomValue } from "jotai"
import { privacyMode } from "@/atoms/atoms"

export function AccountCardForm({ batchApply, applying, setSelectedIpo_ }: { batchApply: (accounts: string[],quantity:number  ) => void, applying: boolean, setSelectedIpo_: React.Dispatch<React.SetStateAction<string | null>> }) {

    const isPrivate = useAtomValue(privacyMode)
    const [applyQuantity,setApplyQuantity] = useState<number>(10);
    const [items] = useLocalStorage<ClientData[]>("credentials", []);
    const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);

    const [applicableShares, setApplicableShares] = useState<CompanyShare[]>([]);
    const [selectedIpo, setSelectedIpo] = useState<string | null>(null);

    useEffect(() => {

        GetApplicableSharesMulti(items).then((shares) => {
            if (shares) {
                if (shares.object as CompanyShare[]) {
                    setApplicableShares(shares.object)

                }

            }


        })
    }, [items])


    function selectAll() {



        setSelectedAccounts(items.map((item) => item.personalDetails.demat))
    }











    return (
        <div >

            <div className="mb-4">
                <Label className="text-base">Select Accounts</Label>
                <p>
                    Select the accounts you want to apply for IPOs.
                </p>
            </div>
            <div className="mb-2">
                <Select onValueChange={(share) => {
                    setSelectedIpo_(share)
                    setSelectedIpo(share)
                }}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an IPO" />
                    </SelectTrigger>
                    <SelectContent >
                        <SelectGroup>
                            <SelectLabel>Applicable IPOs</SelectLabel>
                            {applicableShares.map((share, index) => (
                                <SelectItem value={share.companyShareId.toString()} key={index}>
                                    {share.scrip} ({share.shareGroupName}) </SelectItem>
                            ))}


                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
         
                <Input type="number" id="quantity" className="w-full mb-2" placeholder="Quantity (Default 10)" min={10} onChange={
                    (e)=>{
                        const quantity = e.target.value;
                        if(quantity){
                            setApplyQuantity(Number(quantity))
                            console.log("setQuantity",quantity)
                        }
                    }
                } />
            </div>

            <div className="flex gap-2">
                <Button variant={"outline"} className="mb-2 align-right" onClick={selectAll}>Select All</Button>

            </div>

            {items.map((item, index) => (
                <div className="flex mb-2 flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow" key={index}>
                    <Checkbox
                        id={`checkbox-${index}`}
                        checked={selectedAccounts.includes(item.personalDetails.demat)}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setSelectedAccounts([...selectedAccounts, item.personalDetails.demat])
                            } else {
                                setSelectedAccounts(selectedAccounts.filter((account) => account !== item.personalDetails.demat))
                            }
                        }}

                    />
                    <div className="space-y-1 leading-none">
                        {isPrivate ?
                            <Skeleton >

                                <Label className="invisible">

                                    {item.personalDetails.demat}
                                </Label>

                            </Skeleton> :
                            <Label>

                                {item.personalDetails.demat}
                            </Label>
                        }


                    </div>
                </div>
            ))}
            <Button className="mt-4 w-full" variant="secondary" disabled={selectedAccounts.length == 0 || applying || selectedIpo === null} onClick={() => {
                batchApply(selectedAccounts,applyQuantity);
            }}>
                Apply
            </Button>


        </div>

    )
}
