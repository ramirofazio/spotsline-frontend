import { Input } from "@nextui-org/react";
import { useState } from "react";

export function PasswordInput({ name, isRequired = true, label, onChange, isInvalid, errorMessage }) {
  const [revealPasswordInput, setRevealPasswordInput] = useState(false);

  return (
    <Input
      classNames={{ label: "text-white", inputWrapper: "bg-primary/30 rounded-full" }}
      color="secondary"
      name={name}
      isRequired={isRequired}
      size="lg"
      type={revealPasswordInput ? "text" : "password"}
      label={label}
      variant="bordered"
      labelPlacement="outside"
      radius="full"
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      startContent={<i className="ri-key-fill text-xl text-secondary" />}
      endContent={
        <i
          className={`${
            revealPasswordInput ? "ri-lightbulb-fill text-primary" : "ri-lightbulb-line text-white"
          }  icons text-xl`}
          onClick={() => setRevealPasswordInput(!revealPasswordInput)}
        />
      }
      onChange={onChange}
    />
  );
}
