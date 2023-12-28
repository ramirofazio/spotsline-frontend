import { SearchInput, ModalNav } from "./index";
import logo from "assets/logo.png";
import { ButtonWithIcon } from "components/buttons";
import { useNavigate } from "react-router-dom";

export function NavBar() {
  const navigate = useNavigate();

  return (
    <main className="flex w-full items-center justify-between  bg-white p-6">
      <img src={logo} className="w-40" onClick={() => navigate("/")} />
      <div className="flex w-full flex-col items-end gap-4 p-2">
        <section className="mb-6 flex items-center space-x-4">
          <SearchInput />
          <ButtonWithIcon icon={"ri-user-fill"} text={"INGRESA"} classname={"space-x-4 rounded-full"} />
        </section>
        <ModalNav />
      </div>
    </main>
  );
}
