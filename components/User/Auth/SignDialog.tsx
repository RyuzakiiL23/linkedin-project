import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Sign } from "./Sign"

export function SignDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">SignUp</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[465px]">
        <Sign />
      </DialogContent>
    </Dialog>
  )
}
