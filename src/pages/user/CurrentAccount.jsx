import { Divider, ScrollShadow } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { GoBackButton } from "src/components/buttons/GoBackButton";
import CurrentAccountCard from "src/components/cards/CurrentAccountCard";
import { fadeInBottom, fadeInTop } from "src/styles/framerVariants";
import { formatPrices } from "src/utils";

export default function CurrentAccount() {
  const { userCA } = useLoaderData();
  const { managedClient } = useSelector((state) => state.seller);

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
      <main className="relative flex w-full flex-col items-center gap-6 pt-20">
        <GoBackButton textClassName={"!text-dark font-semibold"} iconClassName={"yellowGradient !animate-none"} />
        <header className="flex w-full flex-col items-center gap-4 text-center sm:gap-6">
          <motion.h1 {...fadeInTop()} className="text-2xl font-bold text-dark drop-shadow-xl sm:text-3xl">
            {!managedClient.id && "MI "}
            <br className="xs:hidden" />
            <strong className="yellowGradient">CUENTA CORRIENTE</strong>
            <br className={`sm:hidden ${!managedClient.id && "hidden"}`} />
            {managedClient.id && ` DE ${managedClient.fantasyName}`}
          </motion.h1>
          <Divider className="h-1 w-screen bg-primary" />
          <motion.p {...fadeInBottom()} className="text-sm font-semibold text-dark sm:text-[16px]">
            Consulta el saldo tu de cuenta corriente.
          </motion.p>
        </header>

        <motion.section
          {...fadeInBottom()}
          className="mx-auto flex w-fit flex-col gap-2 sm:w-full sm:max-w-3xl sm:flex-row sm:justify-around"
        >
          <h3 className="text-sm font-semibold md:font-bold">
            TOTAL BONIFICADO: <strong className="text-green-600">{formatPrices(userCA.totalBalance)}</strong>
          </h3>
          <h3 className="text-sm font-semibold md:font-bold">
            TOTAL ADEUDADO: <strong className="text-red-600">{formatPrices(userCA.totalDue)}</strong>
          </h3>
        </motion.section>

        <Divider className="h-1 w-screen bg-primary" />
        <section className="flex w-full flex-col items-start gap-6 overflow-x-scroll  p-6 pt-0">
          <div className="flex min-w-[700px] flex-col gap-5 self-start  pl-1 text-sm sm:mx-auto">
            <CASection
              childen={
                <>
                  <p className="yellowGradient">{userCA.clientNumber}</p>
                  <p>{userCA.fantasyName}</p>
                  <p>{userCA.fantasyName}</p>
                  <p>{userCA.address}</p>
                  <p>
                    <strong className="yellowGradient">CUIT:</strong> {userCA.cuit}
                  </p>
                </>
              }
            />
            <CASection
              childen={
                <>
                  <p>
                    <strong className="yellowGradient">Vend:</strong> {userCA.sellerCode}
                  </p>
                  <p className="uppercase">{userCA.sellerName}</p>
                  {/* <p>{"Cta. Cte 20 dias ff"}</p> */}
                  <p>{userCA.clientEmail}</p>
                </>
              }
            />
            <CASection
              childen={
                <>
                  <p>
                    <strong className="yellowGradient">Zona:</strong> {userCA.zone}
                  </p>
                  <p>{userCA.phone}</p>
                </>
              }
            />
          </div>
          <section className="flex flex-col gap-3 sm:mx-auto">
            {/* <motion.h2
            {...fadeInBottom()}
            className="mx-auto font-primary text-sm font-semibold uppercase sm:text-[16px]"
          >
            Ultimos 10 comprobantes emitidos:
          </motion.h2> */}
            {userCA.data.map((CC, index) => (
              <CurrentAccountCard {...CC} key={index} />
            ))}
          </section>
        </section>
      </main>
    </AnimatePresence>
  );
}

function CASection({ childen, className }) {
  return <div className={`flex items-center gap-10 font-bold ${className}`}>{childen}</div>;
}
