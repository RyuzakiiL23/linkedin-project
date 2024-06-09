'use client'
import React, { useState } from 'react';
import Image from 'next/image';

export default function UploadPage() {
  const [image, setImage] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);

  const handleImageChange = (e: any) => {
    setImage(e.target.files);
  };
  console.log(image);

  const handleUpload = async () => {
    if (!image) {
      alert('Please select an image to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME || '');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      setUploadResult(data);
      console.log('Image uploaded successfully:', data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Upload an Image</h1>
      <input type="file" onChange={handleImageChange} />
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={handleUpload}
      >
        Upload Image
      </button>
      {image ? (
        <div className="mt-4">
          <h2 className="text-xl">Upload Result:</h2>
            <Image
              src={URL.createObjectURL(image[0])}
              alt="Uploaded"
              width={200}
              height={200}
            //   objectFit="cover"
            />
        </div>
      ) : null}
    </div>
  );
}
