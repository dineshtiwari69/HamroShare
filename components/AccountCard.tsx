import {
    ChevronDownIcon,
    CircleIcon,
    Pencil1Icon,
    StarIcon,
    HomeIcon,
    TrashIcon,

} from "@radix-ui/react-icons"
import { Skeleton } from "@/components/ui/skeleton"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useAtomValue } from "jotai"
import { privacyMode } from "@/atoms/atoms"
import { ClientData } from "@/interfaces/Meroshare"
import EditAccountModal from "./EditAccountModal"

import useLocalStorage from "use-local-storage"
import { useToast } from "./ui/use-toast"

export function AccountCard({ account }: { account: ClientData }) {
    const isPrivate = useAtomValue(privacyMode)
    const { toast } = useToast()
    const [clientData, setClientData] = useLocalStorage<ClientData[]>(`credentials`, [])



    const handleDelete = () => {
        const newClientData = clientData.filter((client) => client.username !== account.username);
        setClientData(newClientData);
        toast({
            title: "Account deleted",
            description: "Your account has been deleted successfully",
        })
    }

    return (
        <Card>
            <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
                <div className="space-y-1">
                    {isPrivate ? <Skeleton className="h-10 w-full " >
                        <CardTitle className="invisible">{account.personalDetails.name}</CardTitle>
                        <CardDescription className="invisible">
                            {account.personalDetails.demat}
                        </CardDescription>
                    </Skeleton> :
                        <>
                            <CardTitle>{account.personalDetails.name}</CardTitle>
                            <CardDescription>
                                {account.personalDetails.demat}
                            </CardDescription>
                        </>

                    }


                </div>

            </CardHeader>
            <CardContent>
                <div className="flex space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                        <HomeIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                        {account.bankDetails.bank.name}
                    </div>



                </div>
                <div className="pt-2 flex gap-2">
                    <EditAccountModal username={account.username} />
                    <Button variant="destructive" className="px-3 shadow-none" onClick={handleDelete}>
                        <TrashIcon className="mr-2 h-4 w-4" />
                        Delete
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}