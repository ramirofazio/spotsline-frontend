import { Divider } from "@nextui-org/react";
import { defaultClassName } from ".";

export const ProfileSkeleton = () => {
  return (
    <main className="pt-16 md:pt-20">
      <header className="relative hidden flex-col items-center justify-center md:flex md:h-40">
        <h1 className={`${defaultClassName} h-10 w-60`}></h1>
        <Divider className="absolute bottom-0 mx-auto h-[3px] rounded-xl bg-gradient-to-r from-primary to-yellow-600" />
      </header>
      <div className="md:grid md:grid-cols-2">
        <section className="flex flex-col items-center justify-start gap-2 p-10 pt-10">
          <div className={`${defaultClassName} h-40 w-40 !rounded-full`} />
          <div className={`${defaultClassName} mt-10 h-10 w-60 !rounded-full`} />
          <div className={`${defaultClassName} mt-20 h-14 w-80`} />
          <div className={`${defaultClassName} h-14 w-80`} />
          <Divider className="mt-10 h-[3px] w-[60vw] rounded-xl bg-gradient-to-r from-primary to-yellow-600 md:hidden" />
        </section>
        <section className="flex flex-col items-start justify-center gap-6 pr-60 md:col-start-2">
          <div className={`${defaultClassName}  my-10 h-10 w-60 !rounded-full`} />

          <div className={`${defaultClassName}  h-14 w-full !rounded-full`} />
          <div className={`${defaultClassName}  h-14 w-full !rounded-full`} />
          <div className={`${defaultClassName}  h-14 w-full !rounded-full`} />
          <div className={`${defaultClassName}  h-14 w-full !rounded-full`} />

          <div className={`${defaultClassName} mx-auto mt-10 h-14 w-60 !rounded-full`} />
        </section>
        <Divider className="mx-auto mb-10 h-[3px] w-[60vw] rounded-xl bg-gradient-to-r from-primary to-yellow-600 md:hidden" />
      </div>
    </main>
  );
};
