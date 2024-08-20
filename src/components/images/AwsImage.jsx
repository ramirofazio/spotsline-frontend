import { assets } from "src/assets/index";

export default function AwsImage({ type, identify, className, loading = "lazy", priority, ...props }) {
  return (
    <>
      <img
        loading={loading}
        radius="none"
        src={assets[type][identify]}
        alt={identify}
        className={`${className} pointer-events-none max-w-[500px]`}
        {...props}
      />
      {/* eslint-disable-next-line react/no-unknown-property */}
      {priority && <link rel="preload" fetchPriority="high" as="image" href={assets[type][identify]} type="image/*" />}
    </>
  );
}
