"use client"

import * as React from "react"
import { EyeOff,Eye} from "lucide-react"
import { useAtom } from "jotai"
import {privacyMode} from "@/atoms/atoms"
import { Button } from "@/components/ui/button"

export function PrivacyToggle() {

    const [isPrivate, setIsPrivate] = useAtom(privacyMode)

    React.useEffect(() => {
        console.log(isPrivate)
    }, [isPrivate])

  

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsPrivate(!isPrivate)}
    >
        {isPrivate ? <EyeOff className={`h-[1.5rem] w-[1.3rem]`} /> : <Eye className={`h-[1.5rem] w-[1.3rem]`} />}
      
      
      <span className="sr-only">Toggle Privacy Mode</span>
    </Button>
  )
}