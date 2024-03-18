import { Divider, Image } from "@nextui-org/react";
import { NavLink, useLoaderData } from "react-router-dom";
import { assets } from "src/assets";
import { convertISOToDate, copyToClipboard, formatPrices } from "src/utils";

export default function OrderDetail() {
  const order = useLoaderData();
  const { id, date, discount, mobbexId, total, type, products } = order;

  return (
    <main className="relative flex flex-col items-center gap-6 py-10 pt-20 text-center">
      <NavLink to="/user/profile" className="icons flex items-center self-start">
        <i className="ri-arrow-left-s-line yellow-neon  animate-pulse text-4xl" />
        <p className="white-neon font-secondary">VOLVER</p>
      </NavLink>
      <Header
        title={"RESUMEN DE TU ORDEN"}
        subTitle={"Consulta los detalles de la orden"}
        id={id}
        date={date}
        type={true}
      />
      <Divider className="h-[3px] w-[60vw] rounded-xl bg-gradient-to-r from-primary to-yellow-600" />
      <ProductsSection products={products} discount={discount} total={total} />
      <Divider className="h-[3px] w-[60vw] rounded-xl bg-gradient-to-r from-primary to-yellow-600" />
      <PaymentDetailSection type={type} total={total} date={convertISOToDate(date)} mobbexId={mobbexId} />
    </main>
  );
}

function Header({ type = false, title, subTitle, id, date }) {
  return (
    <header className="px-6">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="line-clamp-2 text-xs">
        {subTitle}{" "}
        <strong className="yellowGradient icons" onClick={() => copyToClipboard(id)}>
          <i className="ri-clipboard-line icons yellowGradient mx-1 animate-pulse text-sm" />#{id.slice(0, 8) + "..."}
        </strong>
      </p>
      {type && <p className="text-xs">{convertISOToDate(date)}</p>}
    </header>
  );
}

function ProductsSection({ products, discount, total }) {
  const { couponName = "Spotsline", discountPercentaje = 20, totalDiscount = 5000 } = discount; //TODO FORMATO DE DISCOUNT ARMAR EN DBE

  return (
    <>
      {products.map(({ description, quantity, total, image }, index) => (
        <article className="flex w-[70vw] flex-col items-center justify-between gap-4" key={index}>
          <div className="flex items-center space-x-4 rounded-md border-3 border-primary bg-white p-6 text-left shadow-xl">
            <Image
              src={image !== "imagen" ? image : assets.lights.light}
              alt={description}
              width={500}
              height={500}
              shadow="sm"
              className="w-24"
            />
            <h4>{description}</h4>
          </div>
          <div className="flex w-full flex-col gap-2">
            <ProductInfo text={"CANTIDAD"} value={quantity} />
            <ProductInfo text={"PRECIO UNITARIO"} value={formatPrices(total / quantity)} />
            <ProductInfo text={"TOTAL"} value={formatPrices(total)} />
          </div>
        </article>
      ))}
      <section className="flex w-[70vw] flex-col items-center gap-4 rounded-md border-3 border-primary p-4 shadow-md">
        <div className="flex w-full items-start justify-between text-left">
          <p className="text-xs">
            Cúpon <strong>{couponName}</strong> aplicado <br />%{discountPercentaje} OFF
          </p>
          <p className="line-through">{formatPrices(totalDiscount)}</p>
        </div>
        <div className="flex  w-full items-center justify-between bg-background text-left text-xl font-bold  tracking-wider">
          <p className="yellowGradient drop-shadow-lg">TOTAL</p>
          <p className="yellowGradient drop-shadow-lg">{formatPrices(total)}</p>
        </div>
      </section>
    </>
  );
}

function ProductInfo({ text, value }) {
  return (
    <div className="flex items-center justify-between rounded-md border-3 border-dark/50 p-2 uppercase shadow-md">
      <p className="yellowGradient">{text}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
}

function PaymentDetailSection({ type, total, date, mobbexId }) {
  return (
    <section className="flex w-[70vw] flex-col items-center justify-between gap-4">
      <Header title={"DETALLES DE PAGO"} subTitle={"ID de transacción"} id={mobbexId} />
      <CustomTable title="MÉTODO" value={type} />
      <CustomTable title="MONTO" value={total} />
      <CustomTable title="FECHA" value={date} />
    </section>
  );
}

function CustomTable({ title, value }) {
  return (
    <article className="flex w-[60vw] flex-col items-center justify-center rounded-md border-3 border-dark bg-white p-4 shadow-md">
      <p className="yellowGradient bg-dark/50 text-lg font-bold">{title}</p>
      <p className="text-lg font-bold uppercase">{value}</p>
    </article>
  );
}
