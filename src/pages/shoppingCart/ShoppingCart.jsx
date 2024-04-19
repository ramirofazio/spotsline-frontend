import { Input, Button, Divider, Image, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { APISpot } from "src/api";
import { DarkModal, DefaultButton } from "src/components";
import { actionsShoppingCart } from "src/redux/reducers";
import { formatPrices } from "src/utils";
import { saveInStorage } from "src/utils/localStorage";

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const { items, total, subtotal, discount, currentCoupon, id } = useSelector((state) => state.cart);
  const { web_role } = useSelector((state) => state.user);
  const { managedClient } = useSelector((state) => state.seller);

  const [discountCode, setDiscountCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handlePickDate = () => {
    onOpen();
  };

  const handleApplyDiscount = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const exist = Object.keys(currentCoupon).includes(discountCode);

      if (exist) {
        return toast.error("ya esta usando este cupon");
      }
      if (discount || Object.keys(currentCoupon).length) {
        return toast.error("ya tiene un cupon en uso");
      }

      const coupon = await APISpot.cart.validateCoupon(discountCode);
      if (coupon) {
        setDiscountCode("");
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

  const resetCart = async (cartId) => {
    try {
      setLoading(true);
      await APISpot.cart.deleteCart(cartId, false);
      dispatch(actionsShoppingCart.clearCart());
      toast.success(`Se vacio el carrito`);
    } catch (e) {
      console.log(e);
      const backErr = e?.response?.data;
      toast.error("Hubo un error al aplicar el cupon", { description: backErr ? backErr?.message : e.message });
    } finally {
      setLoading(false);
    }
  };

  const handleAddCartToClient = async () => {
    try {
      setLoading(true);
      const mappedItems = items.map((i) => {
        return { ...i, productId: i.id };
      });

      console.log(mappedItems);

      const res = await APISpot.cart.createCart({
        userId: managedClient.id,
        discount: discount,
        total: total,
        subtotal: subtotal,
        items: mappedItems,
        coupon: currentCoupon,
      });

      if (res) {
        toast.success(`Carrito agregado con exito al cliente ${managedClient.fantasyName}`);
        dispatch(actionsShoppingCart.clearCart());
      }
    } catch (e) {
      console.log(e);
      toast.error(`Hubo un problema al agregar el carrito al cliente ${managedClient.fantasyName}`);
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
        <h1 className="text-xl font-bold">INFORMACIÓN IMPORTANTE</h1>
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
          <div className="flex flex-col items-center gap-6">
            <h3 className="font-semibold">NO HAY NINGUN PRODUCTO EN TU CARRITO</h3>
            <DefaultButton className={"w-fit"}>
              <Link to="/productos/0">VER PRODUCTOS</Link>
            </DefaultButton>
          </div>
        )}
        <Button
          isIconOnly
          onPress={() => resetCart(id)}
          radius="full"
          disabled={!items.length && true}
          className="absolute bottom-4 right-4 ml-auto bg-gradient-to-tl from-primary to-background shadow-xl disabled:pointer-events-none disabled:opacity-40"
        >
          <i className="ri-delete-bin-6-line text-2xl"></i>
        </Button>

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
                    onPress={() => dispatch(actionsShoppingCart.updateCartItemQuantity({ id: id, quantity: qty - 1 }))}
                  >
                    <i className="ri-subtract-line" />
                  </Button>
                  <p>{qty}</p>
                  <Button
                    isIconOnly
                    radius="full"
                    className="flex bg-dark text-xl font-bold text-primary disabled:opacity-50"
                    onPress={() => dispatch(actionsShoppingCart.updateCartItemQuantity({ id, quantity: qty + 1 }))}
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
        <h2 className="yellow-neon text-xl font-bold tracking-wider">RESUMEN</h2>
        <div className="z-10 flex w-full items-center justify-between">
          <h3>SUBTOTAL</h3>
          <h3 className="bg-gradient-to-r from-primary to-yellow-200 bg-clip-text font-extrabold text-transparent">
            {formatPrices(subtotal)}
          </h3>
        </div>
        {discount !== 0 && <Divider className="h-[3px] rounded-xl bg-gradient-to-r from-primary to-yellow-600" />}
        {discount !== 0 && Object.values(currentCoupon)?.length && (
          <div className="relative z-10 flex w-full items-center justify-between">
            <h3>
              Cupón <strong className="yellowGradient">{currentCoupon.name}</strong>
            </h3>
            <h3 className="yellowGradient mr-10 font-bold">{currentCoupon.discountPercentaje} %</h3>
            <i
              className="ri-delete-bin-line icons absolute right-0 text-lg text-background"
              onClick={() => dispatch(actionsShoppingCart.removeDiscount(currentCoupon))}
            />
          </div>
        )}
        <Divider className="h-[3px] rounded-xl bg-gradient-to-r from-primary to-yellow-600" />
        <div className="z-10 flex w-full items-center justify-between">
          <h3>TOTAL A PAGAR</h3>
          <h3 className="bg-gradient-to-r from-primary to-yellow-200 bg-clip-text font-extrabold text-transparent">
            {formatPrices(total)}
          </h3>
        </div>
        <Divider className="h-[3px] rounded-xl bg-gradient-to-r from-primary to-yellow-600" />

        {web_role === Number(import.meta.env.VITE_USER_ROLE) && (
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
              onPress={handlePickDate}
              className={"mx-auto lg:mx-0"}
              isLoading={loading}
              isDisabled={items.length === 0}
            >
              CONTINUAR
            </DefaultButton>
          </div>
        )}
        {web_role === Number(import.meta.env.VITE_SELLER_ROLE) && (
          <div className="mx-auto flex w-full flex-col justify-center gap-6 lg:flex-row ">
            <DefaultButton
              onPress={handleAddCartToClient}
              className={"mx-auto !w-80 lg:mx-0"}
              isLoading={loading}
              isDisabled={items.length === 0 || loading}
            >
              AGREGAR CARRITO AL CLIENTE
            </DefaultButton>
          </div>
        )}
      </section>
      {isOpen && (
        <PickDateModal
          onOpenChange={onOpenChange}
          isOpen={isOpen}
          items={items}
          currentCoupon={currentCoupon}
          discount={discount}
        />
      )}
    </main>
  );
}

function PickDateModal({ isOpen, onOpenChange, items, currentCoupon, discount }) {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [date, setDate] = useState("");

  const handleCreateCheckout = async () => {
    if (date === "") {
      toast.error("Debe seleccionar la fecha de entrega");
      setError(true);
      return;
    }
    setLoading(true);
    try {
      const body = {
        userId: user.id,
        discount,
        coupon: currentCoupon || false,
        items: items.map(({ id, qty }) => {
          return { id: id, qty: qty };
        }),
        deliveryDate: new Date(date).toISOString(),
      };

      //* Guardo para recuperar en `PaymentOK.jsx`
      const res = await APISpot.checkout.create(body);
      if (res) {
        saveInStorage("orderBody", body);
        window.open(res);
      }
    } catch (e) {
      console.log(e);
      toast.error("Hubo un error al crear el link de pago", { description: e.response.data.message || e });
    } finally {
      setLoading(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const minDate = nextWeek.toISOString().split("T")[0];
    return minDate;
  };

  const getMaxDate = () => {
    const today = new Date();
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0); // Obtiene el último día del mes en 2 meses
    return maxDate.toISOString().split("T")[0];
  };

  return (
    <DarkModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={"FECHA DE ENTREGA"}
      description={"Seleccione fecha de entrega para el pedido"}
      size="xl"
    >
      <form className={`z-20 mx-auto flex w-80 flex-col items-center justify-start gap-10`}>
        <input
          type="date"
          value={date}
          min={getMinDate()}
          max={getMaxDate()}
          onChange={(e) => {
            setDate(e.target.value);
            if (date !== "") setError(false);
          }}
          className={`${
            error && "border-2 border-red-500"
          } w-60 rounded-full bg-background p-2 text-center font-bold tracking-widest text-dark transition hover:cursor-pointer focus:outline-none`}
        />
        <DefaultButton onPress={handleCreateCheckout} className={"mx-auto lg:mx-0"} isLoading={loading}>
          IR A PAGAR
        </DefaultButton>
      </form>
    </DarkModal>
  );
}
