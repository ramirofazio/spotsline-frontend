import { Divider } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLoaderData } from "react-router-dom";
import { DefaultButton } from "src/components";
import BorderedWhiteCard from "src/components/cards/BorderedWhiteCard";
import { zoomIn } from "src/styles/framerVariants";
import { convertISOToDate } from "src/utils";

export default function ProfileOrders() {
  const { userOrders } = useLoaderData();

  return (
    <AnimatePresence>
      <motion.main {...zoomIn} className="relative flex flex-col items-center gap-6 py-10 text-center">
        <header className="md:w-full md:text-left">
          <h2 className="text-xl font-bold">COMPRAS REALIZADAS</h2>
          <Divider className="my-2 hidden h-[2px] rounded-xl bg-dark md:flex lg:w-80" />
          <p className="text-xs">Consulta tu historial de compras Spotsline.</p>
        </header>
        <section className="flex flex-col gap-10 p-10 md:mr-10 md:p-0 lg:w-full">
          {Boolean(!userOrders.length) && (
            <div className="space-y-4">
              <h3 className="font-semibold">¡No hay nada que ver aqui!</h3>
              <DefaultButton as={Link} to={"/productos/1"}>
                VER PRODUCTOS
              </DefaultButton>
            </div>
          )}

          {userOrders.map((order, index) => (
            <BorderedWhiteCard
              key={index}
              title={convertISOToDate(order.date)}
              description={order.mobbexId}
              text="DETALLES"
              link={`${order.id}`}
              type="order"
            />
          ))}
        </section>
      </motion.main>
    </AnimatePresence>
  );
}
