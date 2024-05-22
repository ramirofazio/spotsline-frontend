import { Image, SelectItem } from "@nextui-org/react";
import { DarkModal, DefaultButton } from "..";
import { APISpot } from "src/api";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import CustomSelect from "../form/CustomSelect";
import { assets, images } from "src/assets";
import { actionSeller } from "src/redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { loadUserData } from "src/utils/loadUserData";
import { motion } from "framer-motion";
import { fadeIn } from "src/styles/framerVariants";

export default function ManageClientsModal({ isOpen, onClose, onOpenChange }) {
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.auth);
  const { email } = useSelector((state) => state.user);

  const { managedClient } = useSelector((state) => state.seller);

  const [clients, setClients] = useState();
  const [client, setClient] = useState();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const res = clients.find((c) => c.fantasyName === e.target.value);
    setClient(res);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!client.shoppingCart) {
        //? Si entra aca es porque no tiene carrito y hay que crearlo
        await APISpot.cart.createEmptyCart(client.id);
      }

      await loadUserData(dispatch, access_token, email, client);
      onClose();
      dispatch(actionSeller.selectClientToManage(client));
      toast.success(`${client.fantasyName} seleccionado con exito`);
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
      isDismissable={managedClient.fantasyName ? true : false}
      onClose={onClose}
    >
      <motion.form
        {...fadeIn()}
        className={`z-20 flex flex-col items-center justify-start gap-10`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <CustomSelect
          items={clients}
          label="Selecciona un cliente"
          onChange={handleChange}
          defaultSelectedKeys={managedClient.fantasyName ? [managedClient.fantasyName] : false}
        >
          {(client) => (
            <SelectItem
              value={client.id}
              key={client.fantasyName}
              textValue={client.fantasyName || "NOMBRE"}
              classNames={{
                base: "!bg-gradient-to-r to-primary from-yellow-200 my-1 hover:opacity-70 !transition",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="flex-grow-1">
                  <Image
                    loading="lazy"
                    alt={client.fantasyName}
                    className="aspect-square w-10 rounded-full border-1 border-dark/50 bg-background shadow-xl"
                    src={client.avatar || images.logoBlack}
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
      </motion.form>
    </DarkModal>
  );
}
