import { Select } from "@nextui-org/react";
import { useState } from "react";

export default function CustomSelect({
  items,
  children,
  name,
  isRequired = true,
  label,
  onChange,
  labelClass,
  baseClass,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Select
      isOpen={isOpen}
      scrollShadowProps={{ hideScrollBar: false, size: 20 }}
      items={items}
      name={name}
      isRequired={isRequired}
      label={label}
      onOpenChange={(open) => open !== isOpen && setIsOpen(open)}
      selectorIcon={<i />}
      endContent={
        <i
          className={`${
            isOpen ? "ri-arrow-down-s-line" : "ri-arrow-up-s-line"
          } absolute inset-y-0 right-2 flex items-center justify-center`}
        />
      }
      onChange={onChange}
      classNames={{
        label: `${labelClass}`,
        base: `w-80 p-3 hover:opacity-70 transition ${baseClass}`,
        popoverContent: "bg-background/20 backdrop-blur-lg",
      }}
      {...props}
    >
      {items && children}
    </Select>
  );
}
