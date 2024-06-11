"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import ImageUploader from "./ImageUploader";

export default function AddProductDialog(props: any) {
  const { dialogOpen, setDialogOpen } = props;
  return (
    <div className="m-4">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">+ Add Product</Button>
        </DialogTrigger>
        <DialogContent className="max-w-fit">
          <DialogHeader>
            <DialogTitle>Add Your Product</DialogTitle>
          </DialogHeader>
          <div className="w-screen">
            <ImageUploader setDialogOpen={setDialogOpen} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
