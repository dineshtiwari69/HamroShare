"use client"


import { ApplyShare } from '@/lib/actions/meroshare';
import useLocalStorage from 'use-local-storage'
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';
import { useState } from 'react'
import { ClientData } from '@/interfaces/Meroshare'
import { AccountCardForm } from '@/components/AccountCardApply'
import { useTheme } from 'next-themes';
export default function Applier() {

    const { theme } = useTheme()

    const [applying, setApplying] = useState(false);
    const [clientData] = useLocalStorage<ClientData[]>("credentials", []);
    const [selectedIpo, setSelectedIpo] = useState<string | null>(null);
    const [terminalLineData, setTerminalLineData] = useState<JSX.Element[]>([
        <TerminalOutput key={0}>Hamroshare Batch Applier Ready!</TerminalOutput>,
    ]);

    async function batchApply(accounts: string[]) {
        setApplying(true);
        //@ts-ignore

        setTerminalLineData([...terminalLineData,
        //@ts-ignore
        <TerminalOutput>[+] Applying through {accounts.length} accounts...</TerminalOutput>
        ]
        );

        for (let i = 0; i < accounts.length; i++) {
            const account = accounts[i];
            //@ts-ignore
            let message: JSX.Element = <TerminalOutput key={i + 1}>[+] Applying through {account}...</TerminalOutput>
            //append to terminal
            setTerminalLineData(prevArray => [...prevArray, message]);
            const findAccountByDemat = clientData.find((client) => client.personalDetails.demat === account);

            if (!findAccountByDemat) {
                //@ts-ignore
                message = <TerminalOutput key={i + 1}>[-] Account {account} not found.</TerminalOutput>
                //append to terminal
                setTerminalLineData(prevArray => [...prevArray, message]);
                continue;
            }
            try {
                const data = await ApplyShare(findAccountByDemat, 10, Number(selectedIpo));
                //@ts-ignore
                message = <TerminalOutput >[+] Applied through {account}. {data.message}</TerminalOutput>
                //append to terminal
                setTerminalLineData(prevArray => [...prevArray, message]);
            }
            catch (err) {
                //@ts-ignore
                message = <TerminalOutput><span className='text-red-500'>[-] Error applying through {account} {err.message ? err.message : err.toString()}</span>.</TerminalOutput>
                //append to terminal
                setTerminalLineData(prevArray => [...prevArray, message]);
            }



        }

        setApplying(false);



    }

    return (
        <div className='flex  flex-col p-5  md:p-10 '>
            <div className='md:flex gap-5'>
                <div className='mb-2'>
                    <AccountCardForm batchApply={batchApply} applying={applying} setSelectedIpo_={setSelectedIpo} />
                </div>
                <div className='w-full'>
                    <Terminal name='@hamroshare cli' colorMode={theme === "light" ? ColorMode.Light : ColorMode.Dark} onInput={console.log} prompt=' ' height='auto'   >
                        {terminalLineData}
                    </Terminal>

                </div>


            </div>

        </div>
    )
}
