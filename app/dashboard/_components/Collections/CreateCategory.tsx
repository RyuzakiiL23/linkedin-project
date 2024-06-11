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
import Cookies from "universal-cookie";
import ImageUploader from "./ImageUploader";

export default function CreateCategory(props: any) {
  const cookies = new Cookies(null, { path: "/" });
  const [categoryInfo, setCategoryInfo] = useState({
    name: "",
    description: "",
    image: "",
  });

  const session = cookies.get("session");
  // console.log(session);

  const { dialogOpen, setDialogOpen } = props;
  const [error, setError] = useState("");

  const uploadCategory = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.baseURL}/api/categories`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session}`,
        },
        body: JSON.stringify(categoryInfo),
      });
      if (response.ok) {
        console.log("ok");
        setDialogOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-4 w-full relative">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">+ New Category</Button>
        </DialogTrigger>
        <DialogContent className="min-w-full">
          <div className="">
          <ImageUploader />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
