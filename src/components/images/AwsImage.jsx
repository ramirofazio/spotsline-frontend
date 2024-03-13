import { Image } from "@nextui-org/react";
import { assets } from "src/assets/index";

export default function AwsImage({ type, identify, className, ...props }) {
  return (
    <Image src={assets[type][identify]} width={500} height={500} alt={identify} className={`${className}`} {...props} />
  );
}
