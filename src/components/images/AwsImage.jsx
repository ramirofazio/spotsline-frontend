import { Image } from "@nextui-org/react";
import { assets } from "src/assets/index";

export default function AwsImage({ type, identify, className, ...props }) {
  return (
    <Image
      disableSkeleton
      src={assets[type][identify]}
      width={200}
      height={200}
      alt={identify}
      className={`${className} max-w-[500px]`}
      {...props}
    />
  );
}
