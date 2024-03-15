import { Button } from "@nextui-org/react";

export function DefaultButton({ children, isDisabled, type = "button", className, isLoading, onPress, startContent }) {
  return (
    <Button
      isDisabled={isDisabled}
      type={type}
      variant="solid"
      color={"primary"}
      className={`w-60 rounded-full bg-gradient-to-r from-primary to-yellow-200 p-6 font-bold tracking-widest text-dark hover:scale-110 ${className}`}
      isLoading={isLoading}
      onPress={onPress}
      startContent={startContent}
    >
      {children}
    </Button>
  );
}
