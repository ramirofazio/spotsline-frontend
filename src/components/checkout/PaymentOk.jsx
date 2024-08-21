import { DarkModal, DefaultButton } from "..";
import { useDisclosure } from "@nextui-org/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { APISpot } from "src/api";
import { deleteOfStorage } from "src/utils/localStorage";

export function PaymentOk() {
  const navigate = useNavigate();
  const { id } = useSelector((state) => state.cart);

  const { onOpen, isOpen, onOpenChange, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
    //? Elimino el shopping cart de la DB
    APISpot.cart.deleteCart(id, false);
    deleteOfStorage("shoppingCart");
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        navigate("/");
      }, 10000);
    }
  }, [onOpenChange]);

  return (
    <DarkModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={"¡GRACIAS POR TU COMPRA!"}
      description={"Si llegaste hasta acá porque registramos tu pedido con EXITO"}
    >
      <i className="ri-close-line icons absolute right-0 top-0 text-xl text-background" onClick={() => onClose()} />
      <main className="z-20 flex flex-col items-center gap-6">
        <p className="font-secondary text-sm text-background">
          Estamos validando tu pedido y nos contactaremos a la brevedad para confirmarlo
        </p>

        <i className="ri-checkbox-circle-fill mx-auto animate-pulse text-7xl text-green-600" />

        <Link to={`/user/profile`}>
          <DefaultButton>VER EN MI PERFIL</DefaultButton>
        </Link>
      </main>
    </DarkModal>
  );
}
