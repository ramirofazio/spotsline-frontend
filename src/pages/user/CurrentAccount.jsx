import { Divider, ScrollShadow } from "@nextui-org/react";
import { useLoaderData } from "react-router-dom";
import CurrentAccountCard from "src/components/cards/CurrentAccountCard";
import { formatPrices } from "src/utils";

export default function CurrentAccount() {
  const { userCA } = useLoaderData();

  //? Esto es para saber cuanto debe y cuanto tiene de saldo, pero esto tiene impacto general en lo que trae el backend (10 items). En el backend lo calcula global con todas...
  //   const ccsDue = userCA.data.map(({ due }) => due);
  //   const ccsBalance = userCA.data.map(({ balance }) => balance);

  //   const dueTotal = ccsDue.reduce((acc, sum) => acc + sum, 0);
  //   const balanceTotal = ccsBalance.reduce((acc, sum) => acc + sum, 0);

  //   console.log(dueTotal, balanceTotal);

  //   console.log(dueTotal - balanceTotal);

  //? Se podria hacer una especie de filtro de que si el due - balance de cada item es `0` que ni la traiga porque se esta cancelando esa CC. De esta forma mostramos solo las que tienen saldo, a favor o en contra.

  return (
    <main className="relative flex flex-col items-center gap-6 py-10 text-center">
      <header className="md:w-full md:text-left">
        <h2 className="text-xl font-bold">CUENTA CORRIENTE</h2>
        <Divider className="my-2 hidden h-[2px] rounded-xl bg-dark md:flex lg:w-80" />
        <p className="text-xs">Consulta tu de cuenta corriente.</p>
      </header>
      <section className="space-y-2 md:w-full md:text-left lg:flex lg:items-center lg:space-x-10 lg:space-y-0">
        <h3 className="font-semibold md:font-bold">
          TOTAL BONIFICADO: <strong className="text-green-600">{formatPrices(userCA.totalBalance)}</strong>
        </h3>
        <h3 className="font-semibold md:font-bold">
          TOTAL ADEUDADO: <strong className="text-red-600">{formatPrices(userCA.totalDue)}</strong>
        </h3>
      </section>
      <h3 className="mx-auto font-bold md:mx-0 md:w-full md:text-left">Ultimos 10 comprobantes emitidos:</h3>
      <ScrollShadow
        hideScrollBar
        size={20}
        className="flex h-[400px] flex-col items-center gap-10 overflow-y-scroll p-10 !pt-10 md:mr-10 md:items-start md:p-0 lg:w-full md:ml-6"
      >
        {userCA.data.map((CC, index) => (
          <CurrentAccountCard {...CC} key={index} />
        ))}
      </ScrollShadow>
    </main>
  );
}
