import React from "react";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Socila() {
  return (
    <div className="w-full flex justify-between items-end">
        <h1 className="p-4 text-muted-foreground">Logo 2024</h1>
      <div className="p-4">
        <h1 className="font-bold text-muted-foreground mb-4">Social</h1>
      <div className="flex justify-center items-center gap-4">
        <FaLinkedin className="hover:text-[#0077b5] text-muted-foreground cursor-pointer duration-200" size={30} />
        <FaFacebook className="hover:text-[#0866ff] text-muted-foreground cursor-pointer duration-200" size={30} />
        <FaInstagram className="hover:text-[#cf2972] text-muted-foreground cursor-pointer duration-200" size={30} />
        <FaXTwitter className="hover:text-black text-muted-foreground cursor-pointer duration-200" size={30} />
      </div>
      </div>
    </div>
  );
}
