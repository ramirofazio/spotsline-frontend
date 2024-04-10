import { Input, Button, Divider, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { APISpot } from "src/api";
import { DefaultButton } from "src/components";
import { actionsShoppingCart } from "src/redux/reducers";
import { formatPrices } from "src/utils";
import { saveInStorage } from "src/utils/localStorage";

//? Faltan utilidades para los tipos de administradores y vendedores. Ideas en NOTION!

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { items, total, subtotal, discount, currentCoupon } = useSelector((state) => state.cart);

  const [discountCode, setDiscountCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateCheckout = async () => {
    setLoading(true);
    try {
      const body = {
        userId: user.id,
        discount,
        coupon: currentCoupon || false,
        items: items.map(({ id, quantity }) => {
          return { id: id, qty: quantity };
        }),
      };

      //* Guardo para recuperar en `PaymentOK.jsx`
      saveInStorage("orderBody", body);
      const res = await APISpot.checkout.create(body);
      if (res) {
        window.open(res);
      }
    } catch (e) {
      console.log(e);
      toast.error("Hubo un error al aplicar el cupon", { description: e.response.data.message || e });
    } finally {
      setLoading(false);
    }
  };

  const handleApplyDiscount = async () => {
    try {
      setLoading(true);
      if (currentCoupon) {
        return toast.error("ya estas utilizando un cupon");
      }

      const coupon = await APISpot.cart.validateCoupon(discountCode);
      if (coupon) {
        dispatch(actionsShoppingCart.applyDiscount(coupon));
        toast.success(`Descuento de ${coupon.discountPercentaje}% aplicado!`);
      }
    } catch (e) {
      console.log(e);
      const backErr = e?.response?.data;
      toast.error("Hubo un error al aplicar el cupon", { description: backErr ? backErr?.message : e.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "SPOTSLINE - Carrito de compras";
  }, [document]);

  return (
    <main className="text-center">
      <section className="grid place-items-center gap-2 p-6">
        <h3 className="text-xl font-bold">INFORMACIÓN IMPORTANTE</h3>
        <p className="px-4 font-secondary text-sm">
          Para guardar tu carrito, es necesario <strong className="font-bold">ingresar a tu cuenta</strong> dentro de
          Spotsline. Si aún no lo has hecho, no pierdas tu carrito e{" "}
          <Link to="/sign-in" className="icons font-bold">
            inicia sesión
          </Link>
        </p>
      </section>
      <Divider className="h-1 bg-primary" />

      <section className="relative grid place-items-center gap-6 p-6">
        {items.length === 0 && (
          <DefaultButton className={"w-fit"}>
            <Link to="/productos/0">VER PRODUCTOS</Link>
          </DefaultButton>
        )}
        {items.map(({ img, name, price, qty, id }, index) => (
          <article key={index} className="z-10 flex min-w-[80vw] items-center gap-6 rounded-xl bg-white p-6">
            <Image src={img} width={150} height={150} alt={`${name} img`} className="shadow-inner" />
            <div className="flex w-full flex-col items-start gap-4">
              <div className="w-full space-y-2 text-left text-lg">
                <h4 className="line-clamp-1 w-40 font-bold">{name}</h4>
                <p className="font-bold tracking-wider text-primary">{formatPrices(price)}</p>
              </div>
              <div className="w -full    flex items-center justify-between gap-4 text-xl">
                <Button
                  isIconOnly
                  radius="full"
                  className="flex bg-dark text-xl  text-primary"
                  onPress={() => dispatch(actionsShoppingCart.removeItemFromCart(id))}
                >
                  <i className="ri-delete-bin-line icons text-xl text-primary" />
                </Button>
                <div className="flex items-center gap-3 font-secondary font-bold">
                  <Button
                    isIconOnly
                    radius="full"
                    className="flex bg-dark text-xl font-bold text-primary"
                    onPress={() =>
                      dispatch(actionsShoppingCart.updateCartItemQuantity({ id: id, quantity: qty - 1 }))
                    }
                  >
                    <i className="ri-subtract-line" />
                  </Button>
                  <p>{qty}</p>
                  <Button
                    isIconOnly
                    radius="full"
                    className="flex bg-dark text-xl font-bold text-primary disabled:opacity-50"
                    onPress={() =>
                      dispatch(actionsShoppingCart.updateCartItemQuantity({ id, quantity: qty + 1 }))
                    }
                    isDisabled={qty >= 100}
                  >
                    <i className="ri-add-line" />
                  </Button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
      <Divider className="h-1 bg-primary" />
      <section className="relative m-6 mx-auto flex max-w-[80vw] flex-col  items-start gap-6 rounded-xl border-2 border-primary/50 bg-dark/50 p-6 font-secondary font-bold text-white">
        <h2 className="yellow-neon text-xl font-extrabold">RESUMEN</h2>
        <div className="z-10 flex w-full items-center justify-between border-b-1 border-dotted border-primary/40">
          <h3>SUBTOTAL</h3>
          <h3 className="font-bold text-primary">{formatPrices(subtotal)}</h3>
        </div>
        {discount !== 0 && currentCoupon && Object.keys(currentCoupon)?.length && (
          <div className="relative z-10 flex w-full items-center justify-between border-b-1 border-dotted border-primary/40">
            <h3>DESCUENTO</h3>
            <h3 className="mr-6 font-bold text-primary">{currentCoupon.discountPercentaje} %</h3>
            <i
              className="ri-delete-bin-line icons absolute right-0 text-sm text-dark"
              onClick={() => dispatch(actionsShoppingCart.removeDiscount(currentCoupon))}
            />
          </div>
        )}
        <div className="z-10 flex w-full items-center justify-between border-b-1 border-dotted border-primary/40">
          <h3>TOTAL A PAGAR</h3>
          <h3 className="font-bold text-primary">{formatPrices(total)}</h3>
        </div>
        <div className="mx-auto flex w-full flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="flex flex-col">
            <p className="mx-auto text-left font-thin lg:mx-0">Tengo un código promocional</p>
            <form className="z-20 mx-auto flex items-center justify-center rounded-xl md:w-80">
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
                isDisabled={items.length === 0}
              >
                APLICAR
              </Button>
            </form>
          </div>
          <DefaultButton
            onPress={handleCreateCheckout}
            className={"mx-auto lg:mx-0"}
            isLoading={loading}
            isDisabled={items.length === 0}
          >
            PAGAR COMPRA
          </DefaultButton>
        </div>
      </section>
    </main>
  );
}
