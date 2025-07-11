import { useState } from "react";
import Cropper from "react-easy-crop";
import { Button } from "../../../../components/ui/button";
import { Slider } from "../../../../components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";

interface ImageCropperProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  aspect: number;
  cropShape: "round" | "rect";
  onCropComplete: (croppedAreaPixels: any) => void;
  onSave: () => void;
}

export const ImageCropper = ({
  isOpen,
  onClose,
  imageSrc,
  aspect,
  cropShape,
  onCropComplete,
  onSave,
}: ImageCropperProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-sm">Crop Image</DialogTitle>
        </DialogHeader>
        <div className="relative h-80">
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              cropShape={cropShape}
            />
          )}
        </div>
        <div className="mt-3">
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Zoom
          </label>
          <Slider
            value={[zoom]}
            onValueChange={([value]) => setZoom(value)}
            min={1}
            max={3}
            step={0.1}
            className="py-2"
          />
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="main" size="sm" onClick={onSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};