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
  const { items, total, subtotal, discount, currentCoupons } = useSelector((state) => state.cart);

  const [discountCode, setDiscountCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateCheckout = async () => {
    setLoading(true);
    try {
      const body = {
        userId: user.id,
        discount,
        coupon: Object.values(currentCoupons)[0]?.id || false,
        items: items.map(({ id, quantity }) => {
          return { id: id, qty: quantity };
        }),
      };

      //? Guardo para recuperar en `PaymentOK.jsx`
      saveInStorage("orderBody", body);
      const res = await APISpot.checkout.create(body);
      if (res) {
        window.open(res);
      }
    } catch (e) {
      console.log(e);
      toast.error("Hubo un error al aplicar el cupon", { description: e.response.data.message });
    } finally {
      setLoading(false);
    }
  };

  const handleApplyDiscount = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const exist = Object.keys(currentCoupons).includes(discountCode);

      if (exist) {
        return toast.error("ya esta usando este cupon");
      }
      if (discount || Object.keys(currentCoupons).length) {
        return toast.error("ya tiene un cupon en uso");
      }

      const coupon = await APISpot.cart.validateCoupon(discountCode);
      if (coupon) {
        setDiscountCode("");
        dispatch(actionsShoppingCart.applyDiscount(coupon));
        toast.success(`Descuento de ${coupon.discountPercentaje}% aplicado!`);
      }
    } catch (e) {
      toast.error("Hubo un error al aplicar el cupon", { description: e.message });
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
        {items.map(({ img, name, price, quantity, id }, index) => (
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
                      dispatch(actionsShoppingCart.updateCartItemQuantity({ id: id, quantity: quantity - 1 }))
                    }
                  >
                    <i className="ri-subtract-line" />
                  </Button>
                  <p>{quantity}</p>
                  <Button
                    isIconOnly
                    radius="full"
                    className="flex bg-dark text-xl font-bold text-primary"
                    onPress={() =>
                      dispatch(actionsShoppingCart.updateCartItemQuantity({ id: id, quantity: quantity + 1 }))
                    }
                    isDisabled={quantity >= 100}
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
        <h2 className="yellow-neon text-xl font-bold tracking-wider">RESUMEN</h2>
        <div className="z-10 flex w-full items-center justify-between">
          <h3>SUBTOTAL</h3>
          <h3 className="yellowGradient font-bold">{formatPrices(subtotal)}</h3>
        </div>
        {discount !== 0 && <Divider className="h-[3px] rounded-xl bg-gradient-to-r from-primary to-yellow-600" />}
        {discount !== 0 &&
          Object.keys(currentCoupons)?.length &&
          Object.values(currentCoupons).map((coupon, i) => (
            <div key={i} className="relative z-10 flex w-full items-center justify-between">
              <h3>
                Cupón <strong className="yellowGradient">{coupon.name}</strong>
              </h3>
              <h3 className="yellowGradient mr-10 font-bold">{coupon.discountPercentaje} %</h3>
              <i
                className="ri-delete-bin-line icons absolute right-0 text-lg text-background"
                onClick={() => dispatch(actionsShoppingCart.removeDiscount(coupon))}
              />
            </div>
          ))}
        <Divider className="h-[3px] rounded-xl bg-gradient-to-r from-primary to-yellow-600" />
        <div className="z-10 flex w-full items-center justify-between">
          <h3>TOTAL A PAGAR</h3>
          <h3 className="bg-gradient-to-r from-primary to-yellow-200 bg-clip-text font-extrabold text-transparent">
            {formatPrices(total)}
          </h3>
        </div>
        <Divider className="h-[3px] rounded-xl bg-gradient-to-r from-primary to-yellow-600" />
        <div className="mx-auto flex w-full flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="flex flex-col">
            <p className="mx-auto text-left font-thin lg:mx-0">Tengo un código promocional</p>
            <form
              className="z-20 mx-auto flex items-center justify-center rounded-xl md:w-80"
              onSubmit={handleApplyDiscount}
            >
              <Input
                type="text"
                radius="none"
                classNames={{
                  inputWrapper: "h-10 rounded-tl-xl rounded-bl-xl",
                  clearButton: "text-dark",
                }}
                placeholder="CÓDIGO"
                isClearable
                onClear={() => setDiscountCode("")}
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
              />
              <Button
                type="submit"
                className="icons h-10 rounded-none rounded-br-xl rounded-tr-xl bg-background from-background to-primary font-bold text-black transition hover:bg-gradient-to-r"
                isDisabled={items.length === 0 || discountCode === ""}
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
