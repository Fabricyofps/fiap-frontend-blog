"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface TextAreaProps {
  id: string;
  label: string;
  rows?: number;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required?: boolean;
  defaultValue?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  rows = 10,
  disabled,
  register,
  errors,
  required,
  defaultValue,
}) => {
  return (
    <div className="w-full relative">
      <textarea
        id={id}
        rows={rows}
        disabled={disabled}
        {...register(id, { required })}
        defaultValue={defaultValue}
        placeholder=" "
        className={`
          peer
          w-full
          p-4
          pt-8
          font-light
          border-2
          rounded-md
          outline-none
          transition
          resize-none
          text-black
          ${errors[id] ? "border-rose-500" : "border-neutral-300"}
          focus:${errors[id] ? "border-rose-500" : "border-black"}
          ${disabled ? "opacity-70 cursor-not-allowed" : ""}
        `}
      />
      <label
        htmlFor={id}
        className={`
          absolute
          text-md
          text-zinc-400
          duration-150
          transform
          -translate-y-3
          top-6
          left-4
          z-10
          origin-[0]
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-2
          peer-focus:scale-75
          peer-focus:-translate-y-3
          ${errors[id] ? "text-rose-500" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default TextArea;
