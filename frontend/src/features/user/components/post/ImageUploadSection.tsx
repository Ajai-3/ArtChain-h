import React, { useState, useRef } from "react";
import { Button } from "../../../../components/ui/button";
import { ArrowLeft, Plus, X } from "lucide-react";
import ReactCrop from 'react-image-crop';
import type { Crop } from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css';

const ASPECT_RATIOS = ["1:1", "4:3", "3:4", "16:9", "9:16"];

const ImageUploadSection: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [images, setImages] = useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [crop, setCrop] = useState<Crop>({ unit: "%", width: 90, x: 5, y: 5 });
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (images.length >= 3) return;
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImages(prev => [...prev, reader.result as string]);
        setActiveImageIndex(images.length);
      };
      reader.readAsDataURL(file);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setCrop({ unit: "%", width: 80, x: 10, y: 10 });
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setActiveImageIndex(newImages.length > 0 ? Math.min(index, newImages.length - 1) : null);
  };

  return (
    <div className="w-1/2 p-6 pb-8 border-r border-zinc-400 dark:border-zinc-700 flex flex-col h-full bg-black text-white">
      <div className="mb-4">
        <Button onClick={onClose} variant="ghost" className="hover:bg-gray-800 p-0">
          <ArrowLeft className="h-5 w-5 mr-2" /> Back
        </Button>
      </div>
      <div className="flex-grow flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg mb-4 overflow-hidden">
        {images.length === 0 ? (
          <div className="text-center p-4 flex flex-col items-center">
            <p className="text-gray-400">Drag or click to upload</p>
            <Button onClick={() => fileInputRef.current?.click()} className="mt-2" variant="outline">
              <Plus className="h-4 w-4 mr-2" /> Browse
            </Button>
            <p className="text-xs mt-2 text-gray-500">(Up to 3 images)</p>
          </div>
        ) : activeImageIndex !== null && (
          <div className="relative w-full h-full">
            <ReactCrop 
              crop={crop} 
              onChange={c => setCrop(c)} 
              aspect={Number(aspectRatio.split(":")[0]) / Number(aspectRatio.split(":")[1])}
            >
              <img ref={imgRef} src={images[activeImageIndex]} onLoad={onImageLoad} className="max-h-full max-w-full" alt="Crop" />
            </ReactCrop>
            <button onClick={() => removeImage(activeImageIndex)} className="absolute top-4 right-4 bg-white rounded-full p-1 hover:bg-gray-200">
              <X className="h-4 w-4 text-black" />
            </button>
          </div>
        )}
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
      </div>
      {images.length > 0 && (
        <>
          <div className="flex gap-2 mb-4">
            {images.map((img, idx) => (
              <div key={idx} className={`relative w-16 h-16 rounded-md overflow-hidden border-2 ${activeImageIndex === idx ? "border-blue-500" : "border-transparent"}`} onClick={() => setActiveImageIndex(idx)}>
                <img src={img} className="w-full h-full object-cover" alt={`Preview ${idx + 1}`} />
                <button onClick={(e) => { e.stopPropagation(); removeImage(idx); }} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">×</button>
              </div>
            ))}
            {images.length < 3 && (
              <Button variant="outline" className="w-16 h-16 p-0 flex items-center justify-center border-dashed" onClick={() => fileInputRef.current?.click()}>
                <Plus className="h-5 w-5 text-gray-400" />
              </Button>
            )}
          </div>
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2 text-gray-300">Aspect Ratio</h3>
            <div className="flex gap-2">
              {ASPECT_RATIOS.map(ratio => (
                <Button key={ratio} variant={aspectRatio === ratio ? "default" : "outline"} size="sm" className="text-white" onClick={() => setAspectRatio(ratio)}>
                  {ratio}
                </Button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageUploadSection;