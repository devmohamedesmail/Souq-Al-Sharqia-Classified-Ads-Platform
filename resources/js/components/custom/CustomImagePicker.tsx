import React, { useRef, useState, useEffect } from 'react';

interface CustomImagePickerProps {
  label: string;
  value: string | File | null;
  onChange: (file: File | null) => void;
  error?: string;
}

const CustomImagePicker: React.FC<CustomImagePickerProps> = ({ label, value, onChange, error }) => {
  const [preview, setPreview] = useState<string | null>(
    typeof value === 'string'
      ? value
      : value instanceof File
        ? URL.createObjectURL(value)
        : null
  );
  const inputRef = useRef<HTMLInputElement>(null);






  useEffect(() => {
    if (typeof value === 'string' && value) {
      setPreview(value); // URL from server
    } else if (value instanceof File) {
      setPreview(URL.createObjectURL(value));
    } else {
      setPreview(null);
    }
    // Clean up object URL when component unmounts or value changes
    return () => {
      if (value instanceof File) {
        URL.revokeObjectURL(preview || '');
      }
    };
    // eslint-disable-next-line
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div
        className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer h-32 bg-gray-50 hover:bg-gray-100 transition"
        onClick={() => inputRef.current && inputRef.current.click()}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="h-full object-contain rounded"
          />
        ) : (
          <span className="text-gray-400">Click to select image</span>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      {preview && (
        <button
          type="button"
          onClick={handleRemove}
          className="mt-2 text-xs text-red-500 underline"
        >
          Remove
        </button>
      )}
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
};

export default CustomImagePicker;