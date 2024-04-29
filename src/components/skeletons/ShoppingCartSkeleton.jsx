import { Divider } from "@nextui-org/react";
import { defaultClassName } from "./index.js";

export const ShoppingCartSkeleton = () => {
  return (
    <main className="mx-auto my-20 flex max-w-5xl flex-col items-center gap-4">
      <div className={`${defaultClassName} h-20 w-full `} />
      <div className={`${defaultClassName} h-20 w-full `} />
      <div className={`${defaultClassName} h-20 w-full `} />
      <Divider className={`${defaultClassName} h-[3px] w-screen`} />
      <div className={`${defaultClassName} h-80 w-full `} />
    </main>
  );
};
