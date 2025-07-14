import React from "react";
import ImageUploadSection from "./ImageUploadSection";
import PostDetailsForm from "./PostDetailsForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const CreatePost: React.FC<Props> = ({ isOpen, onClose, onConfirm }) => {
  const [step, setStep] = React.useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex h-[650px] bg-white dark:bg-secondary-color w-3/5 max-w-5xl border border-zinc-400 dark:border-zinc-700 rounded-lg overflow-hidden">
        <ImageUploadSection />
        <PostDetailsForm
          onClose={onClose}
          onConfirm={onConfirm}
          setStep={setStep}
          step={step}
        />
      </div>
    </div>
  );
};

export default CreatePost;