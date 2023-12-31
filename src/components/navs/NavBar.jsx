import { SearchInput, ModalNav } from "./index";
import logo from "assets/logo.png";
import { ButtonWithIcon } from "components/buttons";

export function NavBar() {
  return (
    <main className="flex w-full items-center justify-between  bg-white  p-6">
      <img src={logo} className="w-40" />
      <div className="flex w-full flex-col items-end gap-4 p-2">
        <section className="flex items-center space-x-4 mb-6">
          <SearchInput />
          <ButtonWithIcon icon={"ri-user-fill"} text={"INGRESA"} classname={"space-x-4 rounded-full"} />
        </section>
        <ModalNav />
      </div>
    </main>
  );
}
