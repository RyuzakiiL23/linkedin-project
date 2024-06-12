"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import CreateCategory from "../Collections/CreateCategory";

interface ProductDetails {
  name: string;
  price: number | string;
  image: string;
  brand: string;
  condition: string;
  description: string;
  category_id: string;
}
import Cookies from "universal-cookie";

function ImageUploader(props: any) {
  const cookies = new Cookies();
  const session = cookies.get("session");
  const [waiting, setWaiting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedFilePrincipal, setSelectedFilePrincipal] =
    useState<File | null>(null);
  const [categories, setCategories] = useState<any>();
  const [productDetails, setProductDetails] = useState<ProductDetails>({
    name: "",
    price: "",
    image: "",
    brand: "",
    condition: "",
    description: "",
    category_id: "",
  });
  const [uploadedSuccess, setUploadedSuccess] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.baseURL}/api/categories`, {
          method: "GET",
          credentials: "include",
          headers: {},
        });
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (value: string) => {
    const selectedCategory = categories.find(
      (category: any) => category.name === value
    );
    if (selectedCategory) {
      setProductDetails({
        ...productDetails,
        category_id: selectedCategory.id,
      });
    }
  };

  const handlePrincipalFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      setSelectedFilePrincipal(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFilePrincipal) {
      alert("Please select an image to upload");
      return;
    }

    setWaiting(true);
    const formData = new FormData();
    formData.append("file", selectedFilePrincipal);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME || ""
    );

    try {
      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!cloudinaryResponse.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }

      const cloudinaryData = await cloudinaryResponse.json();
      console.log("Image uploaded to Cloudinary:", cloudinaryData);

      const req = {
        name: productDetails.name,
        description: productDetails.description,
        image: cloudinaryData.secure_url,
      };

      console.log("req", req);

      const productResponse = await fetch(
        `${process.env.baseURL}/api/categories`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session}`,
          },
          body: JSON.stringify(req),
        }
      );

      if (!productResponse.ok) {
        setWaiting(false);
        throw new Error("Failed to create product");
      }
      if (productResponse.ok) {
        setUploadedSuccess(true);
        setTimeout(() => {
          setUploadedSuccess(false);
          props.setDialogOpen(false);
        }, 1000);
      }
      setWaiting(false);
      console.log("Product created:", productResponse.ok);
      const productData = await productResponse.json();
      return productData;
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  // const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setProductDetails({ ...productDetails, [name]: value });
  // };

  const handleCancelPrincipal = () => {
    setSelectedFilePrincipal(null);
  };

  const handleCancel = (indexToDelete: number) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter(
        (_, index) => index !== indexToDelete
      );
      return updatedFiles;
    });
  };

  return (
    <>
      <main className="flex w-full relative pr-8">
        <div
          className={`${
            waiting
              ? "absolute flex items-center h-full w-full bg-background opacity-80 z-50"
              : "hidden"
          }`}
        >
          <p className="text-4xl w-full text-center">Adding ...</p>
        </div>
        <div
          className={`${
            uploadedSuccess
              ? "absolute flex items-center h-full w-full bg-green-400 opacity-80 z-50"
              : "hidden"
          }`}
        >
          <p className="text-4xl w-full text-center">
            Collection added successully
          </p>
        </div>
        <section className="flex relative w-[50%] mt-4">
          <div className="flex flex-col gap-2 relative items-center w-full">
            <div className="overflow-hidden hover:text-primary transition duration-300 ease-in-out p-1 text-muted-foreground border-muted-foreground hover:border-primary border border-dashed rounded w-[100%] h-96 flex relative items-center justify-center">
              {!selectedFilePrincipal ? (
                <>
                  <label htmlFor="principalFile" className="">
                    <p className="hover:cursor-pointer text-[120px]">
                      <MdCloudUpload />
                    </p>
                  </label>
                  <input
                    type="file"
                    id="principalFile"
                    accept="image/*"
                    hidden
                    onChange={handlePrincipalFileChange}
                  />
                </>
              ) : (
                <div className="relative h-full w-full">
                  <p
                    onClick={handleCancelPrincipal}
                    className="absolute bottom-5 text-red-600 ml-5 hover:cursor-pointer z-50"
                  >
                    <FaRegTrashCan style={{ fontSize: "28px" }} />
                  </p>
                  <Image
                    className="h-full w-full rounded object-cover"
                    src={URL.createObjectURL(selectedFilePrincipal)}
                    alt="Principal"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
        <div className="p-4 flex w-[50%] relative">
          <div className="w-full ">
            <form
              action={handleSubmit}
              className="flex w-full flex-col relative mt-4"
            >
              <div className="flex relative w-full justify-around">
                <div className="flex flex-col gap-2 w-full">
                  <input
                    hidden
                    type="text"
                    onChange={handleInputChange}
                    value={selectedCategory}
                    name="category"
                  />
                  <div>
                    <Input
                      placeholder="Name"
                      type="text"
                      id="name"
                      name="name"
                      value={productDetails.name}
                      onChange={handleInputChange}
                      className="border p-2 w-full"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Description..."
                      id="description"
                      name="description"
                      value={productDetails.description}
                      onChange={handleTextareaChange}
                      className="border p-2 w-full h-60"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <div>
        <div className="flex gap-4 w-full items-start">
          <Button
            onClick={() => props.setDialogOpen(false)}
            type="button"
            variant="secondary"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} type="submit">
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}

export default ImageUploader;
