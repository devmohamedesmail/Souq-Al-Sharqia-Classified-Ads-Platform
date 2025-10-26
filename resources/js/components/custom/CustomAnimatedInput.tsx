import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

interface CustomAnimatedInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  error?: string;
}

const CustomAnimatedInput: React.FC<CustomAnimatedInputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  name,
  error,
}) => {



const {t,i18n}=useTranslation()


  return (
    <div className="mb-7">
      <label className={`block mb-2 text-lg font-bold text-main tracking-wide ${i18n.language === 'ar' ? 'text-right arabic-font' : 'text-left'} `}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`
          w-full px-5 py-3 rounded-2xl border-2
          ${error ? 'border-red-400' : 'border-main/40'}
          bg-gradient-to-r from-white via-main/5 to-white shadow-lg
          focus:border-main focus:ring-2 focus:ring-main/20
          text-gray-900 text-base font-medium transition-all duration-200 outline-none
          placeholder-gray-400
        `}
        autoComplete="off"
        placeholder={label}
      />
      {error && (
        <span className="text-xs text-red-500 mt-2 block font-semibold">{error}</span>
      )}
    </div>
  );
};

export default CustomAnimatedInput;