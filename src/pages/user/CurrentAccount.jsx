import { Divider, ScrollShadow } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { useLoaderData } from "react-router-dom";
import { GoBackButton } from "src/components/buttons/GoBackButton";
import CurrentAccountCard from "src/components/cards/CurrentAccountCard";
import { fadeInBottom, fadeInTop } from "src/styles/framerVariants";
import { formatPrices } from "src/utils";

export default function CurrentAccount() {
  const { userCA } = useLoaderData();

  console.log(userCA);

  //? UPDATE creo que esto ya esta aplicado en el back.
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
      <main className="relative flex max-h-screen w-full flex-col items-center gap-6 pt-20">
        <GoBackButton textClassName={"!text-dark font-semibold"} iconClassName={"yellowGradient !animate-none"} />
        <header className="flex w-full flex-col items-center gap-4 text-center sm:gap-6">
          <motion.h1 {...fadeInTop()} className="text-2xl font-bold text-dark drop-shadow-xl sm:text-3xl">
            MI <br className="xs:hidden" />
            <strong className="yellowGradient">CUENTA CORRIENTE</strong>{" "}
          </motion.h1>
          <Divider className="h-1 w-screen bg-primary" />
          <motion.p {...fadeInBottom()} className="text-sm font-semibold text-dark sm:text-[16px]">
            Consulta el saldo tu de cuenta corriente.
          </motion.p>
        </header>

        <section className="mx-auto flex w-fit flex-col gap-2 sm:w-full sm:max-w-3xl sm:flex-row sm:justify-around">
          <h3 className="text-sm font-semibold md:font-bold">
            TOTAL BONIFICADO: <strong className="text-green-600">{formatPrices(userCA.totalBalance)}</strong>
          </h3>
          <h3 className="text-sm font-semibold md:font-bold">
            TOTAL ADEUDADO: <strong className="text-red-600">{formatPrices(userCA.totalDue)}</strong>
          </h3>
        </section>

        <Divider className="h-1 w-screen bg-primary" />
        <h2 className="mx-auto font-primary text-sm font-semibold uppercase sm:text-[16px]">
          Ultimos 10 comprobantes emitidos:
        </h2>
        <ScrollShadow hideScrollBar size={20} className="flex flex-col gap-6  px-6 pt-6 sm:w-full">
          {userCA.data.map((CC, index) => (
            <CurrentAccountCard {...CC} key={index} />
          ))}
        </ScrollShadow>
      </main>
    </AnimatePresence>
  );
}
