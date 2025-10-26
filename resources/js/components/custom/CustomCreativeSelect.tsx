import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface CustomSelectProps {
  label: string;
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  error?: string;
}

const CustomCreativeSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Choose...",
  error,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="mb-4" ref={ref}>
      <label className="block mb-1 font-semibold text-main">{label}</label>
      <div
        className="relative cursor-pointer"
        tabIndex={0}
        onClick={() => setOpen(!open)}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") setOpen(!open);
          if (e.key === "Escape") setOpen(false);
        }}
      >
        <div className={`
          flex items-center justify-between w-full px-3 py-2 rounded border
          ${open ? "border-main ring-2 ring-main/20" : "border-gray-300"}
          bg-white transition
        `}>
          <span className={selectedOption ? "text-gray-900" : "text-gray-400"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg className={`w-4 h-4 ml-2 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {open && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-main/20 rounded shadow-lg max-h-60 overflow-auto animate-fade-in">
            {options.map(opt => (
              <li
                key={opt.value}
                className={`
                  px-4 py-2 hover:bg-main/10 cursor-pointer transition
                  ${value === opt.value ? "bg-main/10 text-main font-semibold" : ""}
                `}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default CustomCreativeSelect;