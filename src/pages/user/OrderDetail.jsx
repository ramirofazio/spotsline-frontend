import { Divider, Image } from "@nextui-org/react";
import { useLoaderData } from "react-router-dom";
import { assets } from "src/assets";
import { convertISOToDate, copyToClipboard, formatPrices } from "src/utils";
import { calculateTotal } from "src/redux/reducers/shoppingCart";
import { GoBackButton } from "src/components/buttons/GoBackButton";
import { twMerge } from "tailwind-merge";

export default function OrderDetail() {
  const order = useLoaderData();
  const { id, date, mobbexId, total, products, subtotal, coupon, type } = order;

  return (
    <main className="mx-auto mb-10 flex max-w-7xl flex-col items-center gap-6 px-10 pt-4 text-center md:pt-10 md:text-left xl:gap-10">
      <GoBackButton className={"self-start"} />
      <Header title={"RESUMEN DE TU ORDEN"} subTitle={"Detalles de la orden"} id={id} date={date} type={true} />
      <Divider className="h-[3px] w-screen rounded-xl bg-gradient-to-r from-primary to-yellow-600" />
      <ProductsSection products={products} coupon={coupon} total={total} subtotal={subtotal} />
      <Divider className="h-[3px] w-screen rounded-xl bg-gradient-to-r from-primary to-yellow-600" />
      <PaymentDetailSection type={type} total={total} date={convertISOToDate(date)} mobbexId={mobbexId} />
    </main>
  );
}

function Header({ type = false, title, subTitle, id, date }) {
  return (
    <header className="w-full text-secondary md:space-y-5">
      <h2 className="text-2xl font-bold md:text-3xl xl:text-4xl">{title}</h2>
      <div className="mt-4 flex flex-col gap-4 font-semibold md:flex-row md:justify-between">
        <p className="w-full text-sm md:text-lg xl:text-xl">
          {subTitle}
          <strong className="yellowGradient icons ml-2 animate-pulse" onClick={() => copyToClipboard(id)}>
            <i className="ri-clipboard-line icons yellowGradient mx-1" />#{id}
          </strong>
        </p>
        {type && <p className="text-sm md:text-lg xl:text-xl">{convertISOToDate(date)}</p>}
      </div>
    </header>
  );
}

function ProductsSection({ products, coupon, total, subtotal }) {
  return (
    <section className="flex w-full flex-col gap-10 md:gap-14 md:py-5">
      {products.map(({ description, quantity, total, image }, index) => (
        <article className={twMerge("flex w-full flex-col items-center gap-5 md:gap-10")} key={index}>
          <h4 className="line-clamp-1 self-start border-b-2 border-secondary text-left font-bold text-secondary md:text-lg xl:text-xl">
            <strong className="yellowGradient mr-2">{index + 1}:</strong>
            {description}
          </h4>
          <div className="space-y-5 md:grid md:grid-cols-2 md:justify-start md:gap-10 md:space-y-0">
            <div className="flex max-h-[350px] min-h-[200px] min-w-full items-center overflow-hidden rounded-md border-4 border-primary bg-white p-2 md:p-4">
              <Image
                loading="lazy"
                src={image?.length ? image : assets.lights.light}
                alt={description + "image"}
                className="min-h-full w-full min-w-full"
              />
            </div>
            <div className="flex w-full flex-col gap-5 md:justify-start md:gap-8 xl:gap-10">
              <ProductInfo text={"CANTIDAD"} value={quantity} />
              <ProductInfo text={"MONTO UNITARIO"} value={formatPrices(total / quantity)} />
              <ProductInfo text={"TOTAL"} value={formatPrices(total)} />
            </div>
          </div>
        </article>
      ))}
      {coupon && subtotal && <DiscountDetail coupon={coupon} total={total} subtotal={subtotal} />}
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
    <div className="flex w-full justify-between gap-5 border-b-2 border-secondary px-3 pb-2 text-sm md:text-[16px] xl:text-lg">
      <p className="yellowGradient text-left">{text}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
}

function PaymentDetailSection({ type, total, date, mobbexId }) {
  return (
    <section className="flex w-full flex-col items-center gap-5 md:gap-10">
      <Header title={"DETALLES DE PAGO"} subTitle={"ID de transacción"} id={mobbexId} />
      <div className="w-full space-y-5 md:space-y-10">
        <ProductInfo text={"FECHA"} value={date} />
        <ProductInfo text={"MÉTODO"} value={type ? type : "---"} />
        <ProductInfo text={"MONTO TOTAL"} value={formatPrices(total)} />
      </div>
    </section>
  );
}
