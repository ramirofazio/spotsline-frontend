import { Image } from "@nextui-org/react";
import { assets } from "src/assets/index";

export default function AwsImage({ type, identify, className, ...props }) {
  return (
    <Image
      loading="lazy"
      radius="none"
      disableSkeleton
      src={assets[type][identify]}
      width={0}
      height={0}
      alt={identify}
      className={`${className} pointer-events-none max-w-[500px]`}
      {...props}
    />
  );
}
