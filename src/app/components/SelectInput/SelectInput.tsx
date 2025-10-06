"use client";

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { FiChevronDown } from "react-icons/fi";

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  options: Option[];
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  disabled,
  required = false,
  register,
  errors,
  options,
}) => {
  const hasError = !!errors[id];

  return (
    <div className="w-full relative">
      <select
        id={id}
        {...register(id, { required })}
        disabled={disabled}
        required={required}
        defaultValue=""
        className={`
          peer
          w-full
          p-4
          pt-6
          font-light
          border-2
          rounded-md
          outline-none
          transition
          bg-white
          appearance-none
          ${hasError ? "border-rose-500" : "border-neutral-300"}
          ${disabled ? "opacity-70 cursor-not-allowed" : ""}
        `}
      >
        <option value="" disabled hidden>
          Selecione uma opção
        </option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <FiChevronDown
        size={20}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
      />

      <label
        htmlFor={id}
        className={`
          absolute
          text-md
          duration-150
          transform
          -translate-y-3
          top-5
          left-4
          z-10
          origin-[0]
          bg-white px-1
          peer-focus:scale-75
          peer-focus:-translate-y-4
          peer-valid:scale-75
          peer-valid:-translate-y-4
          ${hasError ? "text-rose-500" : "text-zinc-400"}
        `}
      >
        {label}
      </label>

      {hasError && (
        <p className="text-rose-500 text-xs mt-1">
          {String(errors[id]?.message || "Campo obrigatório")}
        </p>
      )}
    </div>
  );
};

export default SelectInput;
