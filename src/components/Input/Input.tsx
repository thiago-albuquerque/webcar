import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  errors?: string;
  rules?: RegisterOptions;
}

export function Input({
  type,
  placeholder,
  name,
  errors,
  register,
  rules,
}: InputProps) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        id={name}
        className="w-full outline-none border-2 rounded-md px-4 h-12"
      />
      {errors && <p className="my-1 text-red-500">{errors}</p>}
    </div>
  );
}
