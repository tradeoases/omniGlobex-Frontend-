import React, { useState, DragEvent, ChangeEvent } from "react";

// Convert file to base64 string
const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

interface SingleImageUploadProps {
  image: string | null;
  setImage: (image: string | null) => void;
  fieldName?: string;
}

const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
  image,
  setImage,
  fieldName
}: SingleImageUploadProps) => {
  const [dragging, setDragging] = useState(false);
  const [imageData, setImageData] = useState<{
    name: string;
    type: string;
  } | null>(null);
  const handleFile = async (file: File) => {
    const base64Image = await toBase64(file);
    setImageData({
      name: file.name,
      type: file.type,
    });
    setImage(base64Image);
  };

  console.log({ image });
  // Handle drag and drop events
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0]; // Only allow one image
    if (file) {
      handleFile(file);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const uploadToBackend = async () => {
    try {
      const response = await fetch("/api/imagekit/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }),
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      console.log("Uploaded successfully:", data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <h2>{fieldName? fieldName :'Upload an Image'}</h2>

      {/* Drag and drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
          marginBottom: "20px",
          backgroundColor: dragging ? "#f0f8ff" : "#fff",
        }}
      >
        {image ? (
          <>
            <img
              src={image}
              alt={imageData?.name}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <p>{imageData?.name}</p>
            <button onClick={removeImage}>Remove</button>
          </>
        ) : (
          <>
            <p>Drag and drop an image here</p>
            <p>or</p>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </>
        )}
      </div>

      {/* Upload button */}
      {image && <button onClick={uploadToBackend}>Upload Image</button>}
    </div>
  );
};

export default SingleImageUpload;
