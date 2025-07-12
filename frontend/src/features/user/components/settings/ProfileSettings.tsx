import { useSelector } from "react-redux";
import React, { useState, useCallback, useEffect } from "react";
import { Input } from "../../../../components/ui/input";
import type { RootState } from "../../../../redux/store";
import { Button } from "../../../../components/ui/button";
import { Textarea } from "../../../../components/ui/textarea";
import { ImageCropper } from "../image/ImageCropper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UpdateProfileFormInputs } from "../../schemas/authShemas";
import { updateProfileSchema } from "../../schemas/authShemas";
import { useUpdateProfileMutation } from "../../../../api/user/profile/mutations";
import { uploadToFolder } from "../../../../utils/cloudinary";

const ProfileSettings: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.user);
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfileMutation();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UpdateProfileFormInputs>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: currentUser?.name || "",
      username: currentUser?.username || "",
      bio: currentUser?.bio || "",
      country: currentUser?.country || "",
      profileImage: currentUser?.profileImage || "",
      bannerImage: currentUser?.bannerImage || "",
      backgroundImage: currentUser?.backgroundImage || "",
    },
  });

  // Watch all form values
  const formValues = watch();

  const [cropModal, setCropModal] = useState<{
    isOpen: boolean;
    field: keyof UpdateProfileFormInputs | null;
    imageSrc: string | null;
    originalFile: File | null;
  }>({ isOpen: false, field: null, imageSrc: null, originalFile: null });

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const handleImagePreview = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof UpdateProfileFormInputs
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setServerError("Image size must be less than 5MB");
        return;
      }
      const url = URL.createObjectURL(file);
      setCropModal({ isOpen: true, field, imageSrc: url, originalFile: file });
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
  ): Promise<Blob> => {
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
          resolve(blob);
        }
      }, "image/jpeg");
    });
  };

  const handleCropSave = async () => {
    if (cropModal.imageSrc && cropModal.field && croppedAreaPixels && cropModal.originalFile) {
      try {
        const croppedBlob = await getCroppedImg(cropModal.imageSrc, croppedAreaPixels);
        const croppedFile = new File([croppedBlob], cropModal.originalFile.name, {
          type: "image/jpeg",
          lastModified: Date.now(),
        });

        // Show preview immediately
        const previewUrl = URL.createObjectURL(croppedBlob);
        setValue(cropModal.field, previewUrl);

        try {
          const cloudinaryUrl = await uploadToFolder(croppedFile, "user-profiles");
          setValue(cropModal.field, cloudinaryUrl);
        } catch (uploadError) {
          console.error("Cloudinary upload failed:", uploadError);
          setServerError("Image saved locally (upload failed)");
        }

        setCropModal({ isOpen: false, field: null, imageSrc: null, originalFile: null });
      } catch (error) {
        console.error("Error processing image:", error);
        setServerError("Failed to process image");
      }
    }
  };

  const ImageBox = ({
    label,
    field,
    isCircle = false,
    aspect,
  }: {
    label: string;
    field: keyof UpdateProfileFormInputs;
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
          {formValues[field] ? (
            <img
              src={formValues[field]}
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

  const onSubmit = async (data: UpdateProfileFormInputs) => {
    setServerError(null);
    try {
      await updateProfile(data);
    } catch (error) {
      console.error("Update error:", error);
      setServerError("Failed to update profile");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Edit Profile
      </h1>

      {serverError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ImageBox label="Profile" field="profileImage" isCircle aspect={1} />
          <div className="md:col-span-2 space-y-4">
            <ImageBox label="Banner" field="bannerImage" aspect={3 / 1} />
            <ImageBox label="Background" field="backgroundImage" aspect={3 / 2} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <Input
              variant="green-focus"
              {...register("name")}
              placeholder="John Doe"
              className="text-sm"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <Input
              variant="green-focus"
              {...register("username")}
              placeholder="johndoe123"
              className="text-sm"
            />
            {errors.username && (
              <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bio
            </label>
            <Textarea
              variant="green-focus"
              {...register("bio")}
              rows={3}
              placeholder="Tell something about yourself..."
              className="text-sm"
            />
            {errors.bio && (
              <p className="text-sm text-red-500 mt-1">{errors.bio.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Country
            </label>
            <Input
              variant="green-focus"
              {...register("country")}
              placeholder="e.g., India"
              className="text-sm"
            />
            {errors.country && (
              <p className="text-sm text-red-500 mt-1">{errors.country.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="main"
            className="px-4 py-1.5 text-sm"
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>

      <ImageCropper
        isOpen={cropModal.isOpen}
        onClose={() =>
          setCropModal({
            isOpen: false,
            field: null,
            imageSrc: null,
            originalFile: null,
          })
        }
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