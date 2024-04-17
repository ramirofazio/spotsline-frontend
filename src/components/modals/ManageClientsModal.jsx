import { Image, SelectItem } from "@nextui-org/react";
import { DarkModal, DefaultButton } from "..";
import { APISpot } from "src/api";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import CustomSelect from "../form/CustomSelect";
import { assets } from "src/assets";

export default function ManageClientsModal({ isOpen, onClose, onOpenChange }) {
  //TODO VALIDAR QUE YA TENGA UN CLIENTE GESTIONANDO, SINO NO PUEDE CERRAR EL MODAL
  const [clients, setClients] = useState();

  const [client, setClient] = useState();
  const [loading, setLoading] = useState(false);

  const handleChange = (client) => {
    setClient(client);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      //redux action

      toast.success(`${client.fantasy} seleccionado con exito`);
      onClose();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const loadClients = async () => {
    try {
      const res = await APISpot.seller.getManagedClients();
      if (res) {
        setClients(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  return (
    <DarkModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="xl"
      title={"SELECCIÓN DE CLIENTE"}
      description="Aca podes seleccionar el Cliente que queres gestionar en esta sesión"
      isDismissable={false}
      onClose={onClose}
    >
      <form className={`z-20 flex flex-col items-center justify-start gap-10`} onSubmit={(e) => handleSubmit(e)}>
        <CustomSelect items={clients} label="Selecciona un cliente" onChange={handleChange}>
          {(client, index) => (
            <SelectItem
              key={index}
              textValue={client.fantasyName || "NOMBRE"}
              classNames={{
                base: "!bg-gradient-to-r to-primary from-yellow-200 my-1 hover:opacity-70 !transition",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="flex-grow-1">
                  <Image
                    alt={client.fantasyName}
                    className="aspect-square w-10 rounded-full border-1 border-dark/50 bg-background shadow-xl"
                    src={client.avatar || assets.logos.logoBlack}
                  />
                </div>
                <div className="flex w-20 flex-col">
                  <span className="font-bold text-dark">{client.fantasyName.split(" ").slice(0, 2).join(" ")}</span>
                  <span className="text-dark/70">{client.email}</span>
                </div>
              </div>
            </SelectItem>
          )}
        </CustomSelect>

        <DefaultButton
          type="submit"
          endContent={<i className="ri-login-circle-line text-xl" />}
          className={"hover:scale-100"}
          isLoading={loading}
        >
          GESTIONAR
        </DefaultButton>
      </form>
    </DarkModal>
  );
}
