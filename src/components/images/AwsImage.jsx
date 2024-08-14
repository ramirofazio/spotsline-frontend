import { assets } from "src/assets/index";

export default function AwsImage({ type, identify, className, loading = "lazy", ...props }) {
  return (
    <img
      loading={loading}
      radius="none"
      src={assets[type][identify]}
      alt={identify}
      className={`${className} pointer-events-none max-w-[500px]`}
      {...props}
    />
  );
}
