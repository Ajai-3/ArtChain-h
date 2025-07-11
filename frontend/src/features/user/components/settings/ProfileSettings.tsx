import { useSelector } from "react-redux";
import React, { useState, useCallback } from "react";
import { Input } from "../../../../components/ui/input";
import type { RootState } from "../../../../redux/store";
import { Button } from "../../../../components/ui/button";
import { Textarea } from "../../../../components/ui/textarea";
import { ImageCropper } from "../image/ImageCropper";

const ProfileSettings: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.user);
  const [user, setUser] = useState({
    name: currentUser?.name || "",
    username: currentUser?.username || "",
    bio: currentUser?.bio || "",
    country: currentUser?.country || "",
    profileImage: currentUser?.profileImage || "",
    bannerImage: currentUser?.bannerImage || "",
    backgroundImage: currentUser?.backgroundImage || "",
  });

  const [cropModal, setCropModal] = useState<{
    isOpen: boolean;
    field: keyof typeof user | null;
    imageSrc: string | null;
  }>({ isOpen: false, field: null, imageSrc: null });
  
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const handleImagePreview = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof user
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCropModal({ isOpen: true, field, imageSrc: url });
    }
  };

  const onCropComplete = useCallback(
    (_croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: any
  ): Promise<string> => {
    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(URL.createObjectURL(blob));
        }
      }, "image/jpeg");
    });
  };

  const handleCropSave = async () => {
    if (cropModal.imageSrc && cropModal.field && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(
        cropModal.imageSrc,
        croppedAreaPixels
      );
      setUser((prev) => ({ ...prev, [cropModal.field!]: croppedImage }));
      setCropModal({ isOpen: false, field: null, imageSrc: null });
    }
  };

  const ImageBox = ({
    label,
    field,
    isCircle = false,
    aspect,
  }: {
    label: string;
    field: keyof typeof user;
    isCircle?: boolean;
    aspect: number;
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <label className="group relative cursor-pointer block">
        <div
          className={`border-2 border-dashed border-gray-300 dark:border-gray-600 ${
            isCircle ? "w-28 h-28 rounded-full" : "w-full h-28 rounded-lg"
          } overflow-hidden flex items-center justify-center transition-all duration-200 hover:border-blue-500 bg-gray-50 dark:bg-gray-800`}
        >
          {user[field] ? (
            <img
              src={user[field]}
              alt={label}
              className={`object-cover w-full h-full ${
                isCircle ? "rounded-full" : "rounded-lg"
              }`}
            />
          ) : (
            <div className="flex flex-col items-center text-center p-2">
              <span className="text-gray-400 dark:text-gray-500 text-xs">
                Upload {label.toLowerCase()}
              </span>
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImagePreview(e, field)}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
      </label>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Edit Profile
      </h1>

      <form className="space-y-6">
        {/* Profile Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ImageBox label="Profile" field="profileImage" isCircle aspect={1} />
          <div className="md:col-span-2 space-y-4">
            <ImageBox label="Banner" field="bannerImage" aspect={3 / 1} />
            <ImageBox
              label="Background"
              field="backgroundImage"
              aspect={3 / 2}
            />
          </div>
        </div>

        {/* Text Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <Input
              variant="green-focus"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="John Doe"
              className="text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <Input
              variant="green-focus"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="johndoe123"
              className="text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bio
            </label>
            <Textarea
              variant="green-focus"
              value={user.bio}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
              rows={3}
              placeholder="Tell something about yourself..."
              className="text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Country
            </label>
            <Input
              variant="green-focus"
              value={user.country}
              onChange={(e) => setUser({ ...user, country: e.target.value })}
              placeholder="e.g., India"
              className="text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" variant="main" className="px-4 py-1.5 text-sm">
            Save Changes
          </Button>
        </div>
      </form>

      <ImageCropper
        isOpen={cropModal.isOpen}
        onClose={() => setCropModal({ isOpen: false, field: null, imageSrc: null })}
        imageSrc={cropModal.imageSrc || ""}
        aspect={
          cropModal.field === "profileImage"
            ? 1
            : cropModal.field === "bannerImage"
            ? 3 / 1
            : 3 / 2
        }
        cropShape={cropModal.field === "profileImage" ? "round" : "rect"}
        onCropComplete={onCropComplete}
        onSave={handleCropSave}
      />
    </div>
  );
};

export default ProfileSettings;