import { useSelector } from "react-redux";
import { DarkModal, DefaultButton } from "..";
import { useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APISpot } from "src/api";
import { toast } from "sonner";
import { deleteOfStorage, getOfStorage } from "src/utils/localStorage";

export function PaymentOk({ transactionId, type }) {
  const { id } = useSelector((state) => state.user);
  const orderBody = getOfStorage("orderBody");

  const { onOpen, isOpen, onOpenChange, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onOpen();

    return () => {
      setLoading(true);

      try {
        if (orderBody) {
          console.log("orden");
          APISpot.user.createOrder({ ...orderBody, transactionId, type }).then((res) => {
            if (res) {
              toast.success("Orden de compra creada con exito", { description: "¡Gracias por comprar en Spotsline!" });
            }
          });
        } else {
          toast.info("Faltan datos para crear la orden");
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }

      deleteOfStorage("orderBody");
      deleteOfStorage("shoppingCart");
    };
  }, []);

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
          TU ID DE TRANSACCION ES <strong className="icons text-primary underline">#{transactionId}</strong>
        </p>

        <i className="ri-checkbox-circle-fill mx-auto animate-pulse text-7xl text-green-600" />

        <Link to={`/user/profile`}>
          <DefaultButton isLoading={loading}>VER EN MI PERFIL</DefaultButton>
        </Link>
      </main>
    </DarkModal>
  );
}
