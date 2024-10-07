import React, { useState, DragEvent, ChangeEvent } from 'react';

// Define the type for an uploaded image
interface UploadedImage {
  id: string;
  name: string;
  type: string;
  data: string;
}

// Convert file to base64 string
const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const MultipleImageUpload: React.FC = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [dragging, setDragging] = useState(false);

  // Handle image selection
  const handleFiles = async (files: FileList) => {
    const uploadedImages: UploadedImage[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const base64Image = await toBase64(file);
      uploadedImages.push({
        id: `${file.name}-${Date.now()}`,
        name: file.name,
        type: file.type,
        data: base64Image,
      });
    }

    setImages((prevImages) => [...prevImages, ...uploadedImages]);
  };

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

    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  };

  // Handle file selection via input
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(files);
    }
  };

  // Function to remove an image
  const removeImage = (id: string) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  // // Function to send images to the backend
  // const uploadToBackend = async () => {
  //   try {
  //     const response = await fetch('/api/imagekit/upload', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ images }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to upload images');
  //     }

  //     const data = await response.json();
  //     console.log('Uploaded successfully:', data);
  //   } catch (error) {
  //     console.error('Error uploading images:', error);
  //   }
  // };

  return (
    <div>
      <h2>Upload Images</h2>

      {/* Drag and drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: '2px dashed #ccc',
          padding: '20px',
          textAlign: 'center',
          marginBottom: '20px',
          backgroundColor: dragging ? '#f0f8ff' : '#fff',
        }}
      >
        <p>Drag and drop images here</p>
        <p>or</p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      {/* Preview selected images with remove option */}
      <div>
        <h3>Image Preview:</h3>
        {images.length === 0 && <p>No images uploaded yet</p>}
        {images.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {images.map((image) => (
              <div key={image.id} style={{ margin: '10px', textAlign: 'center' }}>
                <img
                  src={image.data}
                  alt={image.name}
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <p>{image.name}</p>
                <button onClick={() => removeImage(image.id)}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload button */}
      {/* <button onClick={uploadToBackend}>Upload Images</button> */}
    </div>
  );
};

export default MultipleImageUpload;
