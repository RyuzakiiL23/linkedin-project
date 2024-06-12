"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import ImageUploader from "./ImageUploader";

export default function CreateCategory(props: any) {

  const { dialogOpen, setDialogOpen } = props;

  return (
    <div className="m-4 w-full relative">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">+ New Category</Button>
        </DialogTrigger>
        <DialogContent className="min-w-full">
          <div className="">
          <ImageUploader setDialogOpen={setDialogOpen}/>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
