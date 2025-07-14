import React, { useState, useRef, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";

const ASPECT_RATIOS = [
  { value: "1:1", label: "1:1" },
  { value: "4:3", label: "4:3" },
  { value: "3:4", label: "3:4" },
  { value: "16:9", label: "16:9" },
  { value: "9:16", label: "9:16" },
];

interface Crop {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageData {
  src: string;
  crop: Crop;
  naturalWidth: number;
  naturalHeight: number;
}

const ImageUploadSection: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [aspectRatio, setAspectRatio] = useState<string>("1:1");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, cropX: 0, cropY: 0 });
  const [scale, setScale] = useState(1);

  const MAX_IMAGES = 3;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (images.length >= MAX_IMAGES) return;
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result?.toString() || "";
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        const [widthRatio, heightRatio] = aspectRatio.split(":").map(Number);
        const aspect = widthRatio / heightRatio;
        const newCrop = calculateInitialCrop(img, aspect);
        
        setImages(prev => [...prev, {
          src: imageUrl,
          crop: newCrop,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight
        }]);
        setActiveImageIndex(images.length);
        setScale(1);
      };
    };
    reader.readAsDataURL(file);
  };

  const calculateInitialCrop = (img: HTMLImageElement, aspect: number): Crop => {
    const imgAspect = img.naturalWidth / img.naturalHeight;
    let width, height;
    
    if (imgAspect > aspect) {
      height = img.naturalHeight * 0.8;
      width = height * aspect;
    } else {
      width = img.naturalWidth * 0.8;
      height = width / aspect;
    }
    
    return { 
      x: (img.naturalWidth - width) / 2,
      y: (img.naturalHeight - height) / 2,
      width,
      height
    };
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (activeImageIndex === null) return;
    const img = e.currentTarget;
    const [widthRatio, heightRatio] = aspectRatio.split(":").map(Number);
    const aspect = widthRatio / heightRatio;
    const newCrop = calculateInitialCrop(img, aspect);
    
    const updatedImages = [...images];
    updatedImages[activeImageIndex] = {
      ...updatedImages[activeImageIndex],
      crop: newCrop,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight
    };
    setImages(updatedImages);
    drawCanvas();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (activeImageIndex === null || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      cropX: images[activeImageIndex].crop.x,
      cropY: images[activeImageIndex].crop.y
    });
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || activeImageIndex === null || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = (x - dragStart.x) / scale;
    const dy = (y - dragStart.y) / scale;

    const updatedImages = [...images];
    const currentCrop = updatedImages[activeImageIndex].crop;
    const img = images[activeImageIndex];
    
    updatedImages[activeImageIndex].crop = {
      ...currentCrop,
      x: Math.max(0, Math.min(dragStart.cropX + dx, img.naturalWidth - currentCrop.width)),
      y: Math.max(0, Math.min(dragStart.cropY + dy, img.naturalHeight - currentCrop.height))
    };
    
    setImages(updatedImages);
    drawCanvas();
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    if (activeImageIndex === null) return;
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const imgX = (mouseX / rect.width) * images[activeImageIndex].naturalWidth;
    const imgY = (mouseY / rect.height) * images[activeImageIndex].naturalHeight;

    const delta = -e.deltaY;
    const zoomFactor = 1 + delta * 0.001;
    const newScale = Math.min(Math.max(0.5, scale * zoomFactor), 2);

    if (newScale !== scale) {
      setScale(newScale);
      const updatedImages = [...images];
      const currentCrop = updatedImages[activeImageIndex].crop;
      const img = images[activeImageIndex];
      const [widthRatio, heightRatio] = aspectRatio.split(":").map(Number);
      const aspect = widthRatio / heightRatio;

      let newWidth, newHeight;
      if (img.naturalWidth / img.naturalHeight > aspect) {
        newHeight = img.naturalHeight * 0.8 * (1 / newScale);
        newWidth = newHeight * aspect;
      } else {
        newWidth = img.naturalWidth * 0.8 * (1 / newScale);
        newHeight = newWidth / aspect;
      }

      updatedImages[activeImageIndex].crop = {
        x: Math.max(0, Math.min(currentCrop.x - (imgX - currentCrop.x) * (zoomFactor - 1), img.naturalWidth - newWidth)),
        y: Math.max(0, Math.min(currentCrop.y - (imgY - currentCrop.y) * (zoomFactor - 1), img.naturalHeight - newHeight)),
        width: newWidth,
        height: newHeight
      };

      setImages(updatedImages);
      drawCanvas();
    }
  };

  const drawCanvas = () => {
    if (activeImageIndex === null || !canvasRef.current || !imgRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imgRef.current;
    const crop = images[activeImageIndex].crop;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(crop.x, crop.y, crop.width, crop.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, crop.y);
    ctx.fillRect(0, crop.y, crop.x, crop.height);
    ctx.fillRect(crop.x + crop.width, crop.y, canvas.width - (crop.x + crop.width), crop.height);
    ctx.fillRect(0, crop.y + crop.height, canvas.width, canvas.height - (crop.y + crop.height));
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setActiveImageIndex(newImages.length > 0 ? Math.min(index, newImages.length - 1) : null);
  };

  useEffect(() => {
    if (activeImageIndex !== null && imgRef.current) {
      const [widthRatio, heightRatio] = aspectRatio.split(":").map(Number);
      const aspect = widthRatio / heightRatio;
      const img = imgRef.current;
      const newCrop = calculateInitialCrop(img, aspect);
      
      const updatedImages = [...images];
      updatedImages[activeImageIndex].crop = newCrop;
      setImages(updatedImages);
      setScale(1);
      drawCanvas();
    }
  }, [aspectRatio]);

  useEffect(() => {
    drawCanvas();
  }, [activeImageIndex, scale]);

  return (
    <div className="w-1/2 p-8 pb-10 border-r border-zinc-400 dark:border-zinc-700 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={onClose} variant="ghost" className="text-black dark:text-white hover:bg-transparent p-0">
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </Button>
      </div>

      <div className="flex flex-col flex-grow" style={{ minHeight: "0" }}>
        <div
          ref={containerRef}
          className="flex-grow flex items-center justify-center border-2 border-dashed rounded-lg mb-4 relative overflow-hidden"
          style={{ height: "400px" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
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
              <>
                <img ref={imgRef} src={images[activeImageIndex].src} onLoad={onImageLoad} className="hidden" alt="Crop preview" />
                <canvas
                  ref={canvasRef}
                  width={images[activeImageIndex].naturalWidth}
                  height={images[activeImageIndex].naturalHeight}
                  className="max-h-full max-w-full object-contain"
                  style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  Scroll to zoom • Drag to move
                </div>
              </>
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
                <img src={image.src} className="w-full h-full object-cover" alt={`Preview ${index + 1}`} />
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