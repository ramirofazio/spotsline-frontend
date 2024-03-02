import { Button, Divider, Image } from "@nextui-org/react";
import { Link } from "react-router-dom";

const mockCart = [
  { img: "/logo.png", name: "Art. Spotsline", price: 9999, qty: 1 },
  { img: "/logo.png", name: "Art. Spotsline", price: 9999, qty: 2 },
  { img: "/logo.png", name: "Art. Spotsline", price: 9999, qty: 1 },
  { img: "/logo.png", name: "Art. Spotsline", price: 9999, qty: 5 },
];

export default function ShoppingCart() {
  return (
    <main className="text-center">
      <section className="grid place-items-center gap-2 p-6">
        <h2 className="text-xl font-bold">INFORMACIÓN IMPORTANTE</h2>
        <p className="px-4 font-secondary text-sm">
          Para guardar tu carrito, es necesario <strong className="font-bold">iniciar a tu cuenta</strong> dentro de
          Spotsline. Si aún no lo has hecho, no pierdas tu carrito e{" "}
          <Link to="/sign-in" className="icons font-bold">
            inicia sesión
          </Link>
        </p>
      </section>
      <Divider className="h-1 bg-primary" />
      <section className="grid place-items-center gap-6 p-6">
        {mockCart.map(({ img, name, price, qty }, index) => (
          <article key={index} className="flex min-w-[80vw] items-center gap-6 rounded-xl bg-white p-6">
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
    </main>
  );
}
