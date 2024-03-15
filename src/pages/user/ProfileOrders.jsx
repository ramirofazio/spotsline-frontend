import { useLoaderData } from "react-router-dom";
import BorderedWhiteCard from "src/components/cards/BorderedWhiteCard";
import { convertISOToDate } from "src/utils";

export default function ProfileOrders() {
  const { userOrders } = useLoaderData();

  return (
    <main className="relative flex flex-col items-center gap-6 py-10 text-center">
      <header>
        <h2 className="text-xl font-bold">COMPRAS REALIZADAS</h2>
        <p className="text-xs">Consulta tu historial de compras Spotsline.</p>
      </header>
      <section className="flex flex-col gap-10 p-10">
        {userOrders.map((order, index) => (
          <BorderedWhiteCard
            key={index}
            title={convertISOToDate(order.date)}
            description={order.mobbexId.slice(0, 8) + "..."}
            text="DETALLES"
            link={`${order.id}`}
            type="order"
          />
        ))}
      </section>
    </main>
  );
}
