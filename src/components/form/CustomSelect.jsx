import { Select } from "@nextui-org/react";

export default function CustomSelect({
  items,
  children,
  name,
  isRequired = true,
  label,
  onChange,
  labelClass,
  ...props
}) {
  return (
    <Select
      scrollShadowProps={{ hideScrollBar: false, size: 20 }}
      items={items}
      name={name}
      isRequired={isRequired}
      label={label}
      onChange={onChange}
      classNames={{
        label: `${labelClass}`,
        base: "w-80 p-3",
        popoverContent: "bg-background/20 backdrop-blur-lg",
      }}
      {...props}
    >
      {items && children}
    </Select>
  );
}
