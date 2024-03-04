import { Input, Button, Divider, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DefaultButton } from "src/components";

const mockCart = [
  { img: "/logo.png", name: "Art. Spotsline", price: 9999, qty: 1 },
  { img: "/logo.png", name: "Art. Spotsline", price: 9999, qty: 2 },
  { img: "/logo.png", name: "Art. Spotsline", price: 9999, qty: 1 },
  { img: "/logo.png", name: "Art. Spotsline", price: 9999, qty: 5 },
];

export default function ShoppingCart() {
  const [discountCode, setDiscountCode] = useState("");

  const handleSubmitCheckout = () => {
    console.log("checkout");
  };

  const handleApplyDiscount = () => {
    console.log("apply discount");
  };

  useEffect(() => {
    document.title = "SPOTSLINE - Carrito de compras";
  }, [document]);

  return (
    <main className="text-center">
      <section className="grid place-items-center gap-2 p-6">
        <h3 className="text-xl font-bold">INFORMACIÓN IMPORTANTE</h3>
        <p className="px-4 font-secondary text-sm">
          Para guardar tu carrito, es necesario <strong className="font-bold">iniciar a tu cuenta</strong> dentro de
          Spotsline. Si aún no lo has hecho, no pierdas tu carrito e{" "}
          <Link to="/sign-in" className="icons font-bold">
            inicia sesión
          </Link>
        </p>
      </section>
      <Divider className="h-1 bg-primary" />

      <section className="relative grid place-items-center gap-6  p-6">
        <div className="absolute -left-40 top-20">
          <Image src="logo.png" alt="logo" width={350} height={350} className="rotate-12" />
        </div>
        <div className="absolute -right-40 bottom-20">
          <Image src="logo.png" alt="logo" width={350} height={350} className="-rotate-12" />
        </div>

        {mockCart.map(({ img, name, price, qty }, index) => (
          <article key={index} className="z-10 flex min-w-[80vw] items-center gap-6 rounded-xl bg-white p-6">
            <Image src={img} width={150} height={150} alt={`${name} img`} className="shadow-inner" />
            <div className="flex w-full flex-col items-start gap-4">
              <div className="w-full space-y-2 text-left text-lg">
                <h4 className="line-clamp-1 w-40 font-bold">{name}</h4>
                <p className="font-bold tracking-wider text-primary">
                  {price.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </p>
              </div>
              <div className="flex w-full items-center justify-between gap-4 text-xl">
                <Button isIconOnly radius="full" className="flex bg-dark text-xl  text-primary ">
                  <i className="ri-delete-bin-line icons text-xl text-primary" />
                </Button>
                <div className="flex items-center gap-3 font-secondary font-bold">
                  <Button isIconOnly radius="full" className="flex bg-dark text-xl font-bold text-primary ">
                    <i className="ri-subtract-line" />
                  </Button>
                  <p>{qty}</p>
                  <Button isIconOnly radius="full" className="flex bg-dark text-xl font-bold text-primary ">
                    <i className="ri-add-line" />
                  </Button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
      <Divider className="h-1 bg-primary" />
      <div className="absolute -left-40">
        <Image src="logo.png" alt="logo" width={350} height={350} className="-rotate-12" />
      </div>
      <section className="relative m-6 mx-auto flex max-w-[80vw] flex-col  items-start gap-6 rounded-xl border-2 border-primary/50 bg-dark/60 p-6 font-secondary font-bold text-white">
        <h2 className="yellow-neon text-xl font-extrabold">RESUMEN</h2>
        <div className="z-10 flex w-full items-center justify-between border-b-1 border-dotted border-primary/40">
          <h3>SUBTOTAL</h3>
          <h3 className="font-bold text-primary">$99.5</h3>
        </div>
        <div className="z-10 flex w-full items-center justify-between border-b-1 border-dotted border-primary/40">
          <h3>ENVIO</h3>
          <h3 className="font-bold text-primary">$80</h3>
        </div>
        <div className="z-10 flex w-full items-center justify-between border-b-1 border-dotted border-primary/40">
          <h3>TOTAL A PAGAR</h3>
          <h3 className="font-bold text-primary">$120.5</h3>
        </div>
        <div className="mx-auto flex w-full flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="flex flex-col">
            <p className="mx-auto text-left font-thin lg:mx-0">Tengo un código promocional</p>
            <form className="mx-auto flex items-center justify-center rounded-xl md:w-80">
              <Input
                type="text"
                radius="none"
                classNames={{
                  inputWrapper: "h-10 rounded-tl-xl rounded-bl-xl",
                  clearButton: "text-dark",
                  input: "uppercase",
                }}
                placeholder="CÓDIGO"
                isClearable
                onClear={() => setDiscountCode("")}
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <Button
                onPress={handleApplyDiscount}
                className="icons h-10 rounded-none rounded-br-xl rounded-tr-xl bg-background from-background to-primary font-bold text-black transition hover:bg-gradient-to-r"
              >
                APLICAR
              </Button>
            </form>
          </div>
          <DefaultButton onPress={handleSubmitCheckout} className={"mx-auto lg:mx-0"}>
            PAGAR COMPRA
          </DefaultButton>
        </div>
      </section>
    </main>
  );
}
