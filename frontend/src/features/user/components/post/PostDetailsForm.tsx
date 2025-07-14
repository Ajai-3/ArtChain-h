import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Textarea } from "../../../../components/ui/textarea";
import { Input } from "../../../../components/ui/input";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";
import type { User } from "../../../../types/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Switch } from "../../../../components/ui/switch";
import { Label } from "../../../../components/ui/label";
import ART_TYPES from "../../../../constants/artTypesConstants";

type PostDetailsFormProps = {
  onConfirm: () => void;
  onClose: () => void;
  setStep: (step: number) => void;
  step: number;
};

const PostDetailsForm: React.FC<PostDetailsFormProps> = ({
  onConfirm,
  setStep,
  step,
}) => {
  const { user } = useSelector((state: RootState) => state.user) as {
    user: User | null;
  };

  // Step 1: Post details form
  if (step === 1) {
    return (
      <div className="w-1/2 p-8 pb-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div>
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center rounded-full">
                  <span className="text-xl font-bold text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h1 className="text-lg font-bold">{user?.name}</h1>
              <p className="text-gray-500 text-sm">@{user?.username}</p>
            </div>
          </div>

          <Button
            onClick={() => setStep(2)}
            variant="transparant"
            className="text-main-color hover:text-main-color-dark"
          >
            Next
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title <span className="text-main-color">*</span>
            </label>
            <Input
              type="text"
              variant="green-focus"
              placeholder="Enter art work title"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description <span className="text-main-color">*</span>
            </label>
            <Textarea
              variant="green-focus"
              placeholder="Enter description for your art work"
              className="w-full min-h-[180px]"
            />
          </div>

          <div className="border-t border-gray-200 pt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Art type <span className="text-main-color">*</span>
            </label>
            <Select>
              <SelectTrigger variant="green-focus" className="w-full">
                <SelectValue placeholder="Select art type" />
              </SelectTrigger>
              <SelectContent>
                {ART_TYPES.map((artType, i) => (
                    
                <SelectItem key={i} value={artType}>{artType}</SelectItem>
                ))}

              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Hashtags
            </label>
            <Input
              variant="green-focus"
              type="text"
              placeholder="#digitalart #ai"
              className="w-full"
            />
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Confirmation and pricing
  return (
    <div className="w-1/2 p-8 pb-10">
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={() => setStep(1)}
          variant="ghost"
          className="text-black dark:text-white hover:bg-transparent p-0"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </Button>

        <Button
          onClick={onConfirm}
          variant="transparant"
          className="hover:text-main-color"
        >
          Post
        </Button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Turn off commenting</h3>
            <p className="text-sm text-gray-500">
              You can edit this anytime from the menu.
            </p>
          </div>
          <Switch id="commenting" variant="green" />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Turn Off Downloading</h3>
            <p className="text-sm text-gray-500">
              Others won't be able to download your artwork.
            </p>
          </div>
          <Switch id="downloading" variant="green" />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Make as Private Collection</h3>
            <p className="text-sm text-gray-500">
              Only subscribers can view this. Hidden from public gallery.
            </p>
          </div>
          <Switch id="private" variant="green" />
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h2 className="font-medium mb-4">Pricing & Availability</h2>

          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-medium">Available for Sale</h3>
              <p className="text-sm text-gray-500">
                Enable to set a price for your artwork
              </p>
            </div>
            <Switch id="for-sale" variant="green" />
          </div>

          <div className="mb-4">
            <h3 className="font-medium mb-2">
              How would you like to set your price?
            </h3>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="border-main-color text-main-color hover:bg-main-color/10"
              >
                ArtCoin (Recommended)
              </Button>
              <Button variant="outline">Fiat Currency</Button>
            </div>
          </div>

          <div>
            <Label htmlFor="artcoins" className="block mb-2">
              Enter Art Coins (eg: 50, 100)
            </Label>
            <Input
              id="artcoins"
              variant="green-focus"
              type="number"
              placeholder="Enter amount"
              className="w-full"
            />
            <p className="text-sm text-gray-500 mt-2">
              Conversion Preview: ₹54543 = 545 ArtCoins
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsForm;
