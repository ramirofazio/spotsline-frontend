import { Spinner } from "@nextui-org/react";

export default function Loader() {
  return (
    <main className="absolute z-50 grid h-screen w-screen place-content-center place-items-center bg-black/40">
      <Spinner color="primary" />
    </main>
  );
}
