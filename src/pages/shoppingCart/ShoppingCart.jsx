import { Input, Button, Divider, useDisclosure, Textarea } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { APISpot } from "src/api";
import { DarkModal, DefaultButton, ShoppingCartSkeleton } from "src/components";
import { actionsShoppingCart } from "src/redux/reducers";
import { onViewFadeIn, onViewFadeInBottom, fadeInTop, onViewZoomIn } from "src/styles/framerVariants";
import { formatPrices } from "src/utils";
import { saveInStorage } from "src/utils/localStorage";
import { useDebouncedCallback } from "use-debounce";

const MAX_AMOUNT = 15;

export default function ShoppingCart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reduxCart = useSelector((state) => state.cart);
  const { web_role } = useSelector((state) => state.user);
  const { managedClient } = useSelector((state) => state.seller);

  const [discountCode, setDiscountCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [SkeletonLoading, setSkeletonLoading] = useState(true);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleUpdateCart = useDebouncedCallback(async () => {
    if (reduxCart.id) {
      return await APISpot.cart.updateCart(reduxCart);
    }
  }, [500]);

  const handlePickDate = () => {
    onOpen();
  };

  const handleApplyDiscount = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const exist = reduxCart.coupon?.name === discountCode;

      if (exist) {
        return toast.info("ya esta usando este cupon");
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

  //   const resetCart = async () => {
  //     try {
  //       setLoading(true);
  //       dispatch(actionsShoppingCart.clearCart());
  //       toast.success(`Se vacio el carrito`);
  //     } catch (e) {
  //       console.log(e);
  //       const backErr = e?.response?.data;
  //       toast.error("Hubo un error al aplicar el cupon", { description: backErr ? backErr?.message : e.message });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const handleAddCartToClient = async () => {
    setLoading(true);
    try {
      const res = await handleUpdateCart();
      if (res) {
        toast.success(`Carrito agregado con exito al cliente ${managedClient.fantasyName}`);
      }
    } catch (e) {
      console.log(e);
      toast.error(`Hubo un problema al agregar el carrito al cliente ${managedClient.fantasyName}`);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    document.title = "SPOTSLINE - Carrito de compras";
  }, [document]);

  useEffect(() => {
    handleUpdateCart();
  }, [reduxCart]);

  useEffect(() => {
    setTimeout(() => {
      setSkeletonLoading(false);
    }, 800);
  }, [SkeletonLoading]);

  useEffect(() => {
    setSkeletonLoading(true);
    navigate();
  }, [managedClient]);

  if (SkeletonLoading) return <ShoppingCartSkeleton />;

  return (
    <main className="text-center">
      <section className="relative flex flex-col items-center gap-10 p-6">
        {web_role === Number(import.meta.env.VITE_USER_ROLE) && (
          <motion.h1 {...fadeInTop()} className="text-3xl font-bold text-dark drop-shadow-xl">
            MI CARRITO
          </motion.h1>
        )}
        {managedClient.fantasyName && (
          <motion.h1 {...fadeInTop()} className="text-3xl font-bold text-dark drop-shadow-xl">
            CARRITO DE <strong className="yellowGradient">{managedClient.fantasyName}</strong>{" "}
          </motion.h1>
        )}

        <Divider className="h-1 w-[105vw] bg-primary lg:-translate-x-10" />

        {reduxCart.items.length === 0 && (
          <motion.div {...fadeInTop()} className="flex flex-col items-center gap-6">
            <h3 className="font-semibold">NO HAY NINGUN PRODUCTO EN TU CARRITO</h3>
            <DefaultButton as={Link} to="/productos/0" className={"w-fit"}>
              VER PRODUCTOS
            </DefaultButton>
          </motion.div>
        )}
        {reduxCart.items.map(({ img, name, price, qty, id, productId, marcaId }, index) => (
          //TODO @Tomi Aca se puede hacer una orquestacion de variants para que quede tipo acordion de arriba hacia abajo. https://www.framer.com/motion/animation/#variants
          <motion.article
            {...onViewZoomIn}
            key={index}
            className="z-10 flex min-w-[80vw] max-w-[50vw] flex-col items-center  gap-6 rounded-xl bg-gradient-to-l from-secondary/30 to-white p-6 md:flex-row md:bg-gradient-to-r lg:gap-12 xl:min-w-[60vw]"
          >
            <NavLink
              className="flex max-h-[200px] w-fit max-w-[200px] items-center justify-center rounded-xl border-3 border-primary p-5"
              to={`/producto/${marcaId}`}
            >
              <img
                loading="lazy"
                src={img}
                alt={`${name} img`}
                className="mx-auto aspect-square w-full object-cover drop-shadow-xl"
              />
            </NavLink>
            <div className="flex w-60 flex-col items-center gap-6 md:w-full md:items-start">
              <h4 className="line-clamp-1 w-auto text-lg font-bold md:line-clamp-none">{name}</h4>
              <div className="flex w-80 flex-col items-center space-y-4 text-left text-sm">
                <p className="flex w-60 justify-between font-bold tracking-wider text-dark md:w-80">
                  ITEM: <strong className="md:w-40">{formatPrices(price)}</strong>
                </p>
                <p className="flex w-60 justify-between font-bold  tracking-wider text-dark md:w-80">
                  TOTAL({qty}): <strong className="md:w-40">{formatPrices(price * qty)}</strong>
                </p>
              </div>
              <div className="flex w-full items-center justify-between gap-4 text-xl md:w-40">
                <div className="flex items-center gap-3 font-secondary font-bold">
                  <Button
                    isIconOnly
                    radius="full"
                    className={`flex bg-dark text-xl  text-primary ${qty === 1 && "bg-red-600"}`}
                    onPress={() =>
                      dispatch(actionsShoppingCart.updateCartItemQuantity({ id: id ?? productId, quantity: qty - 1 }))
                    }
                  >
                    <i className="ri-subtract-line" />
                  </Button>
                  <p>{qty}</p>
                  <Button
                    isIconOnly
                    radius="full"
                    disabled={qty >= MAX_AMOUNT ? true : false}
                    className={`flex bg-dark text-xl font-bold text-primary disabled:opacity-50 ${
                      qty >= MAX_AMOUNT && "pointer-events-none"
                    }`}
                    onPress={() =>
                      dispatch(actionsShoppingCart.updateCartItemQuantity({ id: id ?? productId, quantity: qty + 1 }))
                    }
                  >
                    <i className="ri-add-line" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </section>
      <Divider className="h-1 bg-primary" />
      <motion.section
        {...onViewFadeIn(0.8, 0.2)}
        className="relative m-6 mx-auto flex max-w-[80vw] flex-col items-start  gap-6 overflow-hidden rounded-xl bg-secondary/30 p-6 font-secondary font-bold text-white shadow-xl xl:max-w-[60vw]"
      >
        <h2 className="text-xl font-bold text-dark">RESUMEN</h2>
        <div className="z-10 flex w-full items-center justify-between">
          <h3>SUBTOTAL</h3>
          <h3 className="font-extrabold text-white">{formatPrices(reduxCart.subtotal)}</h3>
        </div>
        {reduxCart.discount !== 0 && Object.values(reduxCart.coupon)?.length && (
          <Divider className="h-[3px] rounded-xl bg-gradient-to-r from-primary to-yellow-600" />
        )}
        <AnimatePresence mode="wait" key="cupon">
          {reduxCart.discount !== 0 && Object.values(reduxCart.coupon)?.length && (
            <motion.div {...onViewZoomIn} className="relative z-10 flex w-full items-center justify-between">
              <h3 className="text-md">
                CUPÓN <strong className="yellow-neon">{reduxCart.coupon.name}</strong>
              </h3>
              <h3 className="mr-10 font-bold text-white">{reduxCart.coupon.discountPercentaje} %</h3>
              <i
                className="ri-delete-bin-line icons absolute right-0 text-lg text-red-600"
                onClick={() => dispatch(actionsShoppingCart.removeDiscount())}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <Divider className="h-[3px] rounded-xl bg-gradient-to-r from-primary to-yellow-600" />
        <div className="z-10 flex w-full items-center justify-between">
          <h3>TOTAL A PAGAR</h3>
          <h3 className="font-extrabold text-white">{formatPrices(reduxCart.total)}</h3>
        </div>
        <Divider className="h-[3px] rounded-xl bg-gradient-to-r from-primary to-yellow-600" />

        {web_role === Number(import.meta.env.VITE_USER_ROLE) && (
          <motion.div
            {...onViewFadeInBottom(0.8, 0.3)}
            className="mx-auto flex w-full flex-col justify-between gap-6 lg:flex-row lg:items-end"
          >
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
                  isDisabled={reduxCart.items.length === 0 || discountCode === ""}
                >
                  APLICAR
                </Button>
              </form>
            </div>
            <DefaultButton
              onPress={handlePickDate}
              className={"mx-auto lg:mx-0"}
              isLoading={loading}
              isDisabled={reduxCart.items.length === 0 || loading}
            >
              CONTINUAR
            </DefaultButton>
          </motion.div>
        )}
        {web_role === Number(import.meta.env.VITE_SELLER_ROLE) && (
          <motion.div
            {...onViewFadeInBottom()}
            className="mx-auto flex w-full flex-col justify-center gap-6 lg:flex-row"
          >
            <DefaultButton
              onPress={handleAddCartToClient}
              className={"mx-auto !w-60 text-xs lg:mx-0 lg:!w-80 lg:text-sm"}
              isLoading={loading}
              isDisabled={reduxCart.items.length === 0 || loading}
            >
              AGREGAR CARRITO AL CLIENTE
            </DefaultButton>
          </motion.div>
        )}
      </motion.section>
      {isOpen && (
        <PickDateModal
          onOpenChange={onOpenChange}
          isOpen={isOpen}
          onClose={onClose}
          items={reduxCart.items}
          coupon={reduxCart.coupon}
          discount={reduxCart.discount}
        />
      )}
    </main>
  );
}

function PickDateModal({ isOpen, onOpenChange, onClose, items, coupon, discount }) {
  const user = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

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
        description: description || "",
        coupon: coupon || false,
        items: items.map(({ id, qty, productId }) => {
          return { productId: id ?? productId, qty: qty };
        }),
        deliveryDate: new Date(date).toISOString(),
      };

      //* Guardo para recuperar en `PaymentOK.jsx`
      const res = await APISpot.checkout.create(body);
      if (res) {
        saveInStorage("orderBody", body);
        window.location.replace(res);
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
    <>
      <DarkModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        title={"FECHA DE ENTREGA"}
        description={"Seleccione fecha de entrega para el pedido"}
        size="xl"
        modalClassName={"flex items-center"}
      >
        <form className={`z-20 mx-auto flex w-80 flex-col items-center justify-start gap-10 px-5`}>
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
            } w-full rounded-full bg-background p-2 text-center font-bold tracking-widest text-dark transition hover:cursor-pointer focus:outline-none`}
          />
          <Textarea
            maxRows={3}
            maxLength={250}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Observaciones"
            placeholder="Escriba detalles de la compra de ser necesario"
            className="max-w-xs"
          />
          <DefaultButton onPress={handleCreateCheckout} className={"mx-auto lg:mx-0"} isLoading={loading}>
            IR A PAGAR
          </DefaultButton>
        </form>
      </DarkModal>
    </>
  );
}
