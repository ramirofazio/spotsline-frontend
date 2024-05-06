import { Divider, Image } from "@nextui-org/react";
import { NavLink, useLoaderData } from "react-router-dom";
import { assets } from "src/assets";
import { convertISOToDate, copyToClipboard, formatPrices } from "src/utils";
import { calculateTotal } from "src/redux/reducers/shoppingCart";

export default function OrderDetail() {
  const order = useLoaderData();
  const { id, date, mobbexId, total, products, subtotal, coupon, type } = order;
  console.log(order);
  console.log(subtotal);

  return (
    <main className="relative flex flex-col items-center gap-6 py-10 pt-20 text-center">
      <Header
        title={"RESUMEN DE TU ORDEN"}
        subTitle={"Consulta los detalles de la orden"}
        id={id}
        date={date}
        type={true}
      />
      <Divider className="h-[3px] w-[60vw] rounded-xl bg-gradient-to-r from-primary to-yellow-600 md:hidden" />

      <ProductsSection products={products} coupon={coupon} total={total} subtotal={subtotal} />
      <Divider className="h-[3px] w-[60vw] rounded-xl bg-gradient-to-r from-primary to-yellow-600 md:hidden" />
      <PaymentDetailSection type={type} total={total} date={convertISOToDate(date)} mobbexId={mobbexId} />
    </main>
  );
}

function Header({ type = false, title, subTitle, id, date }) {
  return (
    <header className="w-[70vw] md:text-left">
      {type && (
        <NavLink to="/user/profile" className="icons -ml-10 flex items-center self-start md:my-10 md:ml-0">
          <i className="ri-arrow-left-s-line yellow-neon  animate-pulse text-4xl" />
          <p className="hidden font-semibold text-secondary underline md:inline">VOLVER</p>
        </NavLink>
      )}
      <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
      <Divider className="my-2 hidden h-[3px] w-full rounded-xl bg-gradient-to-r from-primary to-yellow-600 md:flex" />
      <div className="md:flex md:justify-between">
        <p className="line-clamp-2 text-xs">
          {subTitle}{" "}
          <strong className="yellowGradient icons" onClick={() => copyToClipboard(id)}>
            <i className="ri-clipboard-line icons yellowGradient mx-1 animate-pulse text-sm" />#
            {`${id}`.slice(0, 8) + "..."}
          </strong>
        </p>
        {type && <p className="text-xs">{convertISOToDate(date)}</p>}
      </div>
    </header>
  );
}

function ProductsSection({ products, coupon, total, subtotal }) {
  console.log("COUPON", coupon);
  return (
    <section className=" gap-10 md:grid md:grid-cols-2 md:place-items-center">
      {products.map(({ description, quantity, total, image }, index) => (
        <article
          className="flex max-h-fit w-[70vw] flex-col items-center justify-between gap-4 md:col-span-2 md:flex-row md:items-stretch"
          key={index}
        >
          <div className="flex items-center space-x-4 rounded-md border-3 border-primary bg-white p-6 text-left shadow-xl">
            <Image
              src={image?.length ? image : assets.lights.light}
              alt={description}
              width={500}
              height={500}
              shadow="sm"
              className="w-24 md:w-40"
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
      {coupon && <DiscountDetail coupon={coupon} total={total} subtotal={subtotal} />}
    </section>
  );
}

function DiscountDetail({ total, coupon, subtotal }) {
  const { name, discountPercentaje } = coupon;
  const totalDiscount = subtotal - calculateTotal(subtotal, discountPercentaje);

  return (
    <section className="mt-10 flex w-[70vw] flex-col items-center gap-4 rounded-md border-3 border-primary p-4 shadow-md md:col-start-2 md:mt-0 md:w-full">
      <div className="flex w-full items-start justify-between text-left">
        <p className="text-xs">
          Cúpon <strong>{name}</strong> aplicado <br />%{discountPercentaje} OFF
        </p>
        <span>
          <p className="line-through">{formatPrices(subtotal)}</p>
          <p className="line-through">{formatPrices(totalDiscount)}</p>
        </span>
      </div>

      <div className="flex  w-full items-center justify-between bg-background text-left text-xl font-bold tracking-wider  md:text-2xl">
        <p className="yellowGradient from-yellow-500 to-yellow-700 drop-shadow-lg">TOTAL</p>
        <p className="yellowGradient from-yellow-500 to-yellow-700 drop-shadow-lg">{formatPrices(total)}</p>
      </div>
    </section>
  );
}

function ProductInfo({ text, value }) {
  return (
    <div className="flex items-center justify-between rounded-md border-3 border-dark/50 p-2 uppercase shadow-md">
      <p className="yellowGradient w-full text-left">{text}</p>
      <div className="w-48 text-left">
        <p className="font-bold">{value}</p>
      </div>
    </div>
  );
}

function PaymentDetailSection({ type, total, date, mobbexId }) {
  return (
    <section className="flex w-[70vw] flex-col items-center justify-between gap-4">
      <Header title={"DETALLES DE PAGO"} subTitle={"ID de transacción"} id={mobbexId} />
      <div className="flex flex-col gap-4 md:w-full md:flex-row md:gap-0 md:shadow-md">
        <CustomTable
          title="MÉTODO"
          value={type}
          className={"md:rounded-br-none md:rounded-tr-none md:border-r-3 md:shadow-none "}
        />
        <CustomTable
          title="MONTO"
          value={formatPrices(total)}
          className={"md:rounded-none md:border-l-0 md:border-r-0 md:shadow-none"}
        />
        <CustomTable
          title="FECHA"
          value={date}
          className={"md:rounded-bl-none md:rounded-tl-none md:border-l-3 md:shadow-none "}
        />
      </div>
    </section>
  );
}

function CustomTable({ title, value, className }) {
  return (
    <article
      className={`flex w-[70vw] flex-col items-center justify-center rounded-md border-3 border-dark  bg-white shadow-md ${className}`}
    >
      <div className="h-full w-full bg-dark/20">
        <p className="yellowGradient p-1 text-lg font-bold">{title}</p>
      </div>
      <Divider className="h-[2px] bg-dark" />
      <p className="p-3 text-sm font-semibold uppercase">{value}</p>
    </article>
  );
}
