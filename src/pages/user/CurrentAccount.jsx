import { Divider, ScrollShadow } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import CurrentAccountCard from "src/components/cards/CurrentAccountCard";
import { fadeIn } from "src/styles/framerVariants";
import { formatPrices } from "src/utils";

export default function CurrentAccount({ redirect }) {
  const { userCA } = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!redirect) navigate("cc");
  }, []);

  //? Esto es para saber cuanto debe y cuanto tiene de saldo, pero esto tiene impacto general en lo que trae el backend (10 items). En el backend lo calcula global con todas...
  //   const ccsDue = userCA.data.map(({ due }) => due);
  //   const ccsBalance = userCA.data.map(({ balance }) => balance);

  //   const dueTotal = ccsDue.reduce((acc, sum) => acc + sum, 0);
  //   const balanceTotal = ccsBalance.reduce((acc, sum) => acc + sum, 0);

  //   console.log(dueTotal, balanceTotal);

  //   console.log(dueTotal - balanceTotal);

  //? Se podria hacer una especie de filtro de que si el due - balance de cada item es `0` que ni la traiga porque se esta cancelando esa CC. De esta forma mostramos solo las que tienen saldo, a favor o en contra.

  return (
    <AnimatePresence>
      <motion.main {...fadeIn()} className="flex max-h-screen w-full flex-col items-center">
        <header className="my-10 w-full text-center">
          <h2 className="text-xl font-bold">CUENTA CORRIENTE</h2>
          <Divider className="my-2 h-[2px] w-full rounded-xl bg-dark" />
          <p className="text-xs">Consulta tu de cuenta corriente.</p>
        </header>
        <section className="mx-auto my-4 w-full space-y-2 pl-20 sm:flex sm:items-center sm:justify-around sm:space-y-0 sm:pl-0">
          <h3 className="font-semibold md:font-bold">
            TOTAL BONIFICADO: <strong className="text-green-600">{formatPrices(userCA.totalBalance)}</strong>
          </h3>
          <h3 className="font-semibold md:font-bold">
            TOTAL ADEUDADO: <strong className="text-red-600">{formatPrices(userCA.totalDue)}</strong>
          </h3>
        </section>

        <h3 className="text-md mx-auto mt-10 font-bold">Ultimos 10 comprobantes emitidos:</h3>
        <Divider className="my-2 h-[2px] w-full rounded-xl bg-dark" />
        <ScrollShadow hideScrollBar size={20} className="flex w-full flex-col gap-6 p-6">
          {userCA.data.map((CC, index) => (
            <CurrentAccountCard {...CC} key={index} />
          ))}
        </ScrollShadow>
      </motion.main>
    </AnimatePresence>
  );
}
