import { ComponentPropsWithoutRef } from "react";

function InputField({ ...inputProps }: ComponentPropsWithoutRef<"input">) {
  return (
    <input
      {...inputProps}
      className="outline-none shadow-lg h-[45px] rounded-xl pl-3 text-[16px]"
    />
  );
}

export default InputField;
