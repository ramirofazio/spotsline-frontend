import { DarkModal, DefaultButton } from "..";
import { useDisclosure } from "@nextui-org/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export function PaymentFailed() {
  const { onOpen, isOpen, onOpenChange, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <DarkModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={"¡HUBO UN PROBLEMA AL HACER EL PAGO!"}
      description={"No pudimos procesar tu pago, por favor, intentalo de nuevo."}
    >
      <i className="ri-close-line icons absolute right-0 top-0 text-xl text-background" onClick={() => onClose()} />
      <main className=" z-20 flex flex-col items-center gap-6">
        <i className="ri-information-fill mx-auto animate-pulse text-7xl text-red-600" />
        <Link to="/carrito">
          <DefaultButton className={"w-80"}>VOLVER A INTENTARLO</DefaultButton>
        </Link>
      </main>
    </DarkModal>
  );
}
