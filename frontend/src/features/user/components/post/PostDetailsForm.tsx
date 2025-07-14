import React, { useState, useRef } from "react";
import { Button } from "../../../../components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const ASPECT_RATIOS = [
  { value: "1/1", label: "1:1" },
  { value: "4/3", label: "4:3" },
  { value: "3/4", label: "3:4" },
  { value: "16/9", label: "16:9" },
  { value: "9/16", label: "9:16" },
];

interface ImageData {
  src: string;
  cropData: string | null;
}

const ImageUploadSection: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [aspectRatio, setAspectRatio] = useState<string>("1/1");
  const cropperRef = useRef<Cropper>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_IMAGES = 3;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (images.length >= MAX_IMAGES) return;
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result?.toString() || "";
      setImages(prev => [...prev, { src: imageUrl, cropData: null }]);
      setActiveImageIndex(images.length);
    };
    reader.readAsDataURL(file);
  };

  const getCropData = () => {
    if (activeImageIndex === null) return;
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const croppedCanvas = cropperRef.current?.cropper.getCroppedCanvas();
      const cropData = croppedCanvas.toDataURL();
      
      const updatedImages = [...images];
      updatedImages[activeImageIndex].cropData = cropData;
      setImages(updatedImages);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setActiveImageIndex(newImages.length > 0 ? Math.min(index, newImages.length - 1) : null);
  };

  return (
    <div className="w-1/2 p-8 pb-10 border-r border-zinc-400 dark:border-zinc-700 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={onClose} variant="ghost" className="text-black dark:text-white hover:bg-transparent p-0">
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </Button>
      </div>

      <div className="flex flex-col flex-grow" style={{ minHeight: "0" }}>
        <div className="flex-grow flex items-center justify-center border-2 border-dashed rounded-lg mb-4 relative overflow-hidden"
          style={{ height: "400px" }}>
          {images.length === 0 ? (
            <div className="text-center p-4 flex flex-col items-center">
              <p className="text-gray-500">Drag and drop your image here</p>
              <p className="text-sm text-gray-400 mt-2">or</p>
              <Button onClick={() => fileInputRef.current?.click()} className="mt-2" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Click to browse
              </Button>
              <p className="text-xs text-gray-400 mt-2">(Up to {MAX_IMAGES} images)</p>
            </div>
          ) : (
            activeImageIndex !== null && (
              <Cropper
                src={images[activeImageIndex].src}
                style={{ height: "100%", width: "100%" }}
                initialAspectRatio={1}
                aspectRatio={eval(aspectRatio)} // Convert string like "4/3" to number
                guides={true}
                ref={cropperRef}
                viewMode={1}
                minCropBoxHeight={50}
                minCropBoxWidth={50}
                background={false}
                responsive={true}
                autoCropArea={0.8}
                checkOrientation={false}
                crop={getCropData}
              />
            )
          )}
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" multiple={false} />
        </div>

        <div className="mb-4">
          <div className="flex gap-2 items-center">
            {images.map((image, index) => (
              <div
                key={index}
                className={`relative w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${
                  activeImageIndex === index ? "border-blue-500" : "border-transparent"
                }`}
                onClick={() => setActiveImageIndex(index)}
              >
                <img 
                  src={image.cropData || image.src} 
                  className="w-full h-full object-cover" 
                  alt={`Preview ${index + 1}`} 
                />
                <button
                  onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}

            {images.length < MAX_IMAGES && (
              <Button
                variant="outline"
                size="sm"
                className="w-20 h-20 p-0 flex flex-col items-center justify-center border-dashed"
                onClick={() => fileInputRef.current?.click()}
              >
                <Plus className="h-5 w-5 text-gray-400" />
                <span className="text-xs mt-1 text-gray-400">Add</span>
              </Button>
            )}
          </div>
        </div>

        {images.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Crop Aspect Ratio</h3>
            <div className="flex gap-2">
              {ASPECT_RATIOS.map((ratio) => (
                <Button
                  key={ratio.value}
                  variant={aspectRatio === ratio.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAspectRatio(ratio.value)}
                >
                  {ratio.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto">
        {images.length > 0 && (
          <div className="text-sm text-gray-500 mb-2">
            Image {activeImageIndex !== null ? activeImageIndex + 1 : 0} of {images.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploadSection;