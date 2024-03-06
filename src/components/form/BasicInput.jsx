import { Input } from "@nextui-org/react";

export function BasicInput({
  name,
  isRequired = true,
  type = "text",
  label,
  startContentIcon /*? "ri-mail-line text-secondary text-xl..." */,
  onChange,
  isInvalid,
  errorMessage,
}) {
  return (
    <Input
      classNames={{ label: "text-white", inputWrapper: "bg-primary/30 rounded-full" }}
      color="secondary"
      name={name}
      isRequired={isRequired}
      size="lg"
      type={type}
      label={label}
      variant="bordered"
      labelPlacement="outside"
      radius="full"
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      startContent={<i className={startContentIcon} />}
      onChange={onChange}
    />
  );
}
