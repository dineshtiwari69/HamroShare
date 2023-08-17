import {

    CircleIcon,

    StarIcon,
  } from "@radix-ui/react-icons"
  
  import { Button } from "@/components/ui/button"
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  
  export function GithubStar() {
    return (
      <Card className="mt-10">
        <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
          <div className="space-y-1">
            <CardTitle className="text-sm md:text-2xl ">dineshtiwari69/hamroshare</CardTitle>
            <CardDescription>
            HamroShare's clever hack simplifies the process, letting you apply for IPOs across all your accounts at once.
            </CardDescription>
          </div>
          <div className="flex items-center space-x-1 ml-auto rounded-md bg-secondary text-secondary-foreground">
            <Button variant="secondary" className="px-3 shadow-none">
              <StarIcon className="mr-2 h-4 w-4" />
              Star
            </Button>
           
            
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
              TypeScript
            </div>
            <div className="flex items-center">
              <StarIcon className="mr-1 h-3 w-3" />
              20k
            </div>
            <div>Updated April 2023</div>
          </div>
        </CardContent>
      </Card>
    )
  }