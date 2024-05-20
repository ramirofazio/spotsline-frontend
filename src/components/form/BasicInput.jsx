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
  labelClass = "text-white",
  inputWrapperClass = "bg-primary/30 rounded-xl",
  maxLength,
  ...props
}) {
  return (
    <Input
      classNames={{
        label: labelClass,
        inputWrapper: inputWrapperClass,
        input: "lg:ml-4 disabled:opacity-50",
      }}
      color="secondary"
      name={name}
      isRequired={isRequired}
      size="lg"
      type={type}
      label={label}
      variant="bordered"
      labelPlacement="outside"
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      startContent={<i className={startContentIcon} />}
      onChange={onChange}
      maxLength={maxLength ? maxLength : 80}
      {...props}
    />
  );
}
