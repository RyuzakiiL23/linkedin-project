"use client";

import React, { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColumnSpacingIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Image from "next/image";
import CreateCategory from "../Collections/CreateCategory";

interface ProductDetails {
  name: string;
  price: number | string;
  image: string;
  brand: string;
  condition: string;
  description: string;
}

function ImageUploader(props: any) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedFilePrincipal, setSelectedFilePrincipal] =
    useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<any>();
  // const [categoryLength, setCategoryLength] = useState<number>(0);

    const [productDetails, setProductDetails] = useState<ProductDetails>({
    name: "",
    price: '',
    image: "",
    brand: "",
    condition: "",
    description: "",
  });

  console.log('selectedCategory', selectedCategory)
  console.log(productDetails)

  const handleCategorySelect = (value: React.SetStateAction<string>) => {
    setSelectedCategory(value);
  };

  //Fetching categories
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const data = await getCategories();
  //       console.log(data);
  //       if (Array.isArray(data)) {
  //         setCategories(data);
  //         setCategoryLength(data.length);
  //         console.log(data.length);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //     }
  //   };

  //   fetchCategories();
  // }, [categoryLength]);

  // useEffect(() => {
  //   const storeCategories = async () => {
  //     const res = await getSpecificCategories(dashState);
  //     if (res && typeof res === "object" && "message" in res) {
  //       console.log(res.message);
  //       setCategories([{}]);
  //     } else {
  //       setCategories(res.categories);
  //     }
  //   };
  //   storeCategories();
  // }, [dashState, dialogOpen]);

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const newFiles = Array.from(fileList);
      setSelectedFiles((prevFiles) => {
        const updatedFiles = [...prevFiles];
        updatedFiles[index] = newFiles[0];
        return updatedFiles;
      });
    }
  };

  const handlePrincipalFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];

      // Extract the file extension
      const fileExtension = file.name.split(".").pop();

      // Change the name of the file to 'principal.<extension>'
      const renamedFile = new File([file], `principal.${fileExtension}`, {
        type: file.type,
      });

      setSelectedFilePrincipal(renamedFile);
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

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };


  const handleSubmit = async () => {
    const req = {
      title: productDetails.name,
      price: typeof (productDetails.price) === 'string' ? parseFloat(productDetails.price ) : productDetails.price,
      description: productDetails.description,
      category_id: parseFloat(productDetails.brand)
    };
    try {
      const response = await fetch(`${process.env.baseURL}/api/products`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
           "authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(req),
      });
      console.log('response', response.ok);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

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
        <section className="flex relative w-[50%] mt-4">
          <div className="flex flex-col gap-2 relative items-center w-full">
            <div className=" overflow-hidden hover:text-primary transition duration-300 ease-in-out p-1 text-muted-foreground border-muted-foreground hover:border-primary border border-dashed rounded w-[100%] h-96 flex relative items-center justify-center">
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

            {/* Primary Image Display */}
            {/* {selectedFilePrincipal && (
            <div>
              <img className='h-40 rounded' src={URL.createObjectURL(selectedFilePrincipal)} alt="Principal" />
            </div>
          )} */}

            {/* Secondary Image Uploads */}
            <div className="flex relative gap-2 w-full h-24">
              {[0, 1, 2, 3].map((index) => (
                <div
                  className=" overflow-hidden hover:text-primary transition duration-300 ease-in-out p-1 text-muted-foreground border-muted-foreground hover:border-primary border border-dashed rounded w-[24%] h-24 flex relative items-center justify-center"
                  key={index}
                >
                  {!selectedFiles[index] ? (
                    <>
                      <label
                        htmlFor={`file-${index}`}
                        className="hover:cursor-pointer "
                      >
                        <p className="text-[40px]">
                          <MdCloudUpload />
                        </p>
                      </label>
                      <input
                        type="file"
                        id={`file-${index}`}
                        accept="image/*"
                        hidden
                        onChange={(event) => handleFileChange(event, index)}
                      />
                    </>
                  ) : (
                    <div className="h-full w-full relative">
                      {/* <button onClick={() => handleCancel(index)} className='absolute top-2 right-2'>delete</button> */}
                      <div
                        onClick={() => handleCancel(index)}
                        className="absolute text-red-600 hover:cursor-pointer"
                      >
                        <FaRegTrashCan style={{ fontSize: "18px" }} />
                      </div>
                      <Image
                        className="h-full w-full rounded object-cover"
                        src='http://localhost:3000/omar.png'
                        alt={`Selected ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className="p-4 flex w-[50%] relative">
          <div className="w-full ">
            <Select
              onValueChange={handleCategorySelect}
              defaultValue={selectedCategory}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories
                    ? categories.map((category: any) => (
                        <div key={category._id as string}>
                          <SelectItem
                            className="cursor-pointer"
                            onClick={() => handleCategorySelect(category.name)}
                            value={category.name}
                          >
                            {category.name}
                          </SelectItem>
                        </div>
                      ))
                    : null}
                  <CreateCategory setDialogOpen={setDialogOpen}/>
                </SelectGroup>
              </SelectContent>
            </Select>
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
                      placeholder="Brand"
                      type="text"
                      id="brand"
                      name="brand"
                      value={productDetails.brand}
                      onChange={handleInputChange}
                      className="border p-2 w-full"
                    />
                  </div>
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
                    <Input
                      placeholder="Price"
                      type="text"
                      id="price"
                      name="price"
                      value={productDetails.price}
                      onChange={handleInputChange}
                      className="border p-2 w-full"
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="image url"
                      type="text"
                      id="image"
                      name="image"
                      value={productDetails.image}
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
                  <div>
                    <h1 className="text-sm py-2 mb-2 text-muted-foreground">
                      Condition of the product
                    </h1>
                    <div className="flex gap-4">
                      <div className="flex cursor-pointer items-center space-x-2">
                        <input
                          className="cursor-pointer"
                          required={true}
                          type="radio"
                          name="condition"
                          value="new"
                          id="r2"
                          onChange={(e) =>
                            setProductDetails({
                              ...productDetails,
                              condition: e.target.value,
                            })
                          }
                        />
                        <Label className="cursor-pointer" htmlFor="r2">
                          New
                        </Label>
                      </div>
                      <div className="flex cursor-pointer items-center space-x-2">
                        <input
                          className="cursor-pointer"
                          required={true}
                          type="radio"
                          name="condition"
                          value="used"
                          id="r3"
                          onChange={(e) =>
                            setProductDetails({
                              ...productDetails,
                              condition: e.target.value,
                            })
                          }
                        />
                        <Label className="cursor-pointer" htmlFor="r3">
                          Used
                        </Label>
                      </div>
                    </div>
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
            onClick={() => props.setOpen(false)}
            type="button"
            variant="secondary"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} type="submit">
            Submit
          </Button>
        </div>
        {/* <Button onClick={handleSubmit} type="submit" className='w-full' >
          Submit
        </Button> */}
      </div>
    </>
  );
}

export default ImageUploader;
