"use client"


import * as z from "zod"
import useLocalStorage from "use-local-storage"
import { ClientData } from "@/interfaces/Meroshare"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { GetApplicableSharesMulti } from "@/lib/actions/meroshare"
import { CompanyShare } from "@/interfaces/Meroshare"
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

export function AccountCardForm({ batchApply, applying, setSelectedIpo_ }: { batchApply: (accounts: string[]) => void, applying: boolean, setSelectedIpo_: React.Dispatch<React.SetStateAction<string | null>> }) {

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
    }, [])


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
                                <SelectItem value={share.companyShareId.toString()} key={index}>{share.scrip} ({share.shareGroupName}) </SelectItem>
                            ))}


                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <Button variant={"outline"} className="mb-2 align-right" onClick={selectAll}>Select All</Button>
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
                        <Label>
                            {item.personalDetails.demat}
                        </Label>


                    </div>
                </div>
            ))}
            <Button className="mt-4 w-full" variant="secondary" disabled={selectedAccounts.length == 0 || applying || selectedIpo === null} onClick={() => {
                batchApply(selectedAccounts);
            }}>
                Apply
            </Button>


        </div>

    )
}
