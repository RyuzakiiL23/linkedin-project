import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formadataSerialisation(formdata: FormData) {
  const formDataObj: { [key: string]: any } = {};
  formdata.forEach((value, key) => {
    formDataObj[key] = value;
  });
  
    return formDataObj;
}