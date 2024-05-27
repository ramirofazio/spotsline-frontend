import { assets } from "src/assets/index";

export default function AwsImage({ type, identify, className, ...props }) {
  return (
    <img
      loading="lazy"
      radius="none"
      src={assets[type][identify]}
      alt={identify}
      className={`${className} pointer-events-none max-w-[500px]`}
      {...props}
    />
  );
}
