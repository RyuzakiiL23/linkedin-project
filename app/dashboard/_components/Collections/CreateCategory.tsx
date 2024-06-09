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
  const [categoryInfo, setCategoryInfo] = useState({
    name: "",
    description: "",
    image: "",
  });

  console.log(categoryInfo)

  const uploadCategory = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.baseURL}/api/categories`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryInfo),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

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
        <form onSubmit={uploadCategory}>
          <div className="grid w-80 gap-4 py-4">
            <div className="">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                name="name"
                placeholder="Category"
                className="w-full"
                onChange={(e) =>
                  setCategoryInfo({
                    ...categoryInfo,
                    name: e.currentTarget.value,
                  })
                }
              />
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                name="desctiption"
                placeholder="Description"
                className="w-full"
                onChange={(e) =>
                  setCategoryInfo({
                    ...categoryInfo,
                    description: e.currentTarget.value,
                  })
                }
              />
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <Input
                name="image"
                placeholder="image url"
                className="w-full"
                onChange={(e) =>
                  setCategoryInfo({
                    ...categoryInfo,
                    image: e.currentTarget.value,
                  })
                }
              />
            </div>
            <p
              className={
                error !== "" ? "text-destructive text-center w-full" : "hidden"
              }
            >
              {error}
            </p>
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => setOpen(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
