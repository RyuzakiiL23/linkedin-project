import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AddressDialog(props: any) {
  const address = props.address;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Address</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Client Address</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <h1>Name</h1>
            <p className="w-full">{address.full_name}</p>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <h1>Phone</h1>
            <p className="w-full">{address.phone}</p>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <h1>Country</h1>
            <p className="w-full">{address.country}</p>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <h1>City</h1>
            <p className="w-full">{address.city}</p>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <h1>ZIP Code</h1>
            <p className="w-full">{address.zip_code}</p>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <h1>Street</h1>
            <p className="w-full">{address.street}</p>
          </div>
        </div>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
