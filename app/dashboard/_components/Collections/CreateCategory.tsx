"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function CreateCategory(props: any) {
  props.setDialogOpen(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">+ New Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add category</DialogTitle>
          <DialogDescription>
            Add a new category to your store
          </DialogDescription>
        </DialogHeader>
        <form action=''
          // action={async (FormData) => {
          //   FormData.append("store", dashState);
          //   const response = await createCategory(FormData);
          //   if (response.message === "category created successfully") {
          //     props.setDialogOpen(false);
          //     // props.setCategoryLength(-1);
          //     setOpen(false);
          //     setError("");
          //   } else {
          //     setError(response.message);
          //   }
          //   console.log(response);
          // }}
        >
          <div className="grid w-80 gap-4 py-4">
            <div className="">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                name="name"
                placeholder="Category"
                className="w-full"
              />
            </div>
            <p className={error !== '' ? 'text-destructive text-center w-full' : 'hidden' }>{error}</p>
          </div>
          <DialogFooter>
            <Button type="button" onClick={() => setOpen(false)} variant="secondary">
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
