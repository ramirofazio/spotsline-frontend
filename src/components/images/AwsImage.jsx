import { assets } from "src/assets/index";

export default function AwsImage({ type, identify, className, ...props }) {
  return (
    <img
      loading="eager"
      radius="none"
      src={assets[type][identify]}
      width={200}
      height={200}
      alt={identify}
      className={`${className} pointer-events-none max-w-[500px]`}
      {...props}
    />
  );
}
