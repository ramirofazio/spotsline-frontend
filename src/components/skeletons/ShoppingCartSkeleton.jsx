import { Divider } from "@nextui-org/react";
import { defaultClassName } from "./index.js";

export const ShoppingCartSkeleton = () => {
  return (
    <main className="mx-auto flex max-w-5xl flex-col items-center gap-4 p-10">
      <div className={`${defaultClassName} h-20 w-60 lg:h-8 lg:w-80 `} />
      <Divider className={`${defaultClassName} h-1 bg-primary`} />
      <div className={`${defaultClassName} h-80 w-full lg:h-40`} />
      <div className={`${defaultClassName} h-80 w-full lg:h-40`} />
      <Divider className={`${defaultClassName} my-4 h-[3px] w-screen`} />
      <div className={`${defaultClassName} flex h-80 w-full flex-col items-center justify-center gap-32 `}>
        <div className="w-full border-2"></div>
        <div className="w-full border-2"></div>
      </div>
    </main>
  );
};
