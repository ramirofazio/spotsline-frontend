import { Button } from "@nextui-org/react";

export function DefaultButton({
  children,
  isDisabled,
  type = "button",
  className,
  isLoading,
  onPress,
  startContent,
  endContent,
  as,
  to,
  props,
}) {
  return (
    <Button
      isDisabled={isDisabled}
      type={type}
      variant="solid"
      color={"primary"}
      className={`w-60 rounded-full bg-gradient-to-r from-primary to-yellow-200 p-6 font-bold  tracking-widest text-dark hover:scale-105 hover:opacity-50 disabled:pointer-events-none disabled:opacity-50 ${className}`}
      isLoading={isLoading}
      onPress={onPress}
      startContent={startContent}
      endContent={endContent}
      as={as}
      to={to}
      {...props}
    >
      {children}
    </Button>
  );
}
