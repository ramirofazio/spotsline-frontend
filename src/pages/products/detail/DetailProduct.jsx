import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { assets } from "src/assets";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "src/redux/reducers/shoppingCart";
import colors from "../../../data/colors.json";
import { SelectQuantity } from "./SelectQuantity";
import { SelectVariant } from "./SelectVariant";
import { DefaultButton } from "src/components";
import { formatDescription, formatPrices } from "src/utils";
import { deleteOfStorage, getOfStorage, saveInStorage } from "src/utils/localStorage";
import { VariantSwiper } from "./VariantSwiper";
import { GoBackButton } from "src/components/buttons/GoBackButton";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";

export const DetailProduct = () => {
  const { id } = useParams();
  const product = useLoaderData();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const localVariant = getOfStorage("currentVariant");

  const { email, priceList } = useSelector((state) => state.user);
  const { managedClient } = useSelector((state) => state.seller);
  const { items } = useSelector((state) => state.cart);

  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(getOfStorage("qty") || 1);

  //TODO ANALIZAR ESTA LOGICA PORQUE HACE COSAS RARAS CUADNO YA EXISTE CURRENT VARIANT EN LOCAL STORAGE Y NO ES DE ESTA MARCA
  //TODO EN LA LANDING SE BORRA EL STORAGE ESTE, PERO SI VIENEN DE UN LINK Y TIENEN ESTE STORAGE PROBABLEMENTE ROMPA PORQUE NO ENCUENTRA EL ID DE LA VARIANTE EN LA MARCA
  const [currentVariant, setCurrentVariant] = useState(
    localVariant && localVariant.id
      ? product.variants[product.variants.findIndex((variant) => variant.id === localVariant.id)]
      : product.variants[0]
  );

  useEffect(() => {
    document.title = "SPOTSLINE - " + product.description;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    return () => {
      document.title = "SPOTSLINE";
      deleteOfStorage("currentVariant");
      deleteOfStorage("qty");
    };
  }, []);

  useEffect(() => {
    saveInStorage("currentVariant", currentVariant);
    saveInStorage("qty", qty);
  }, [currentVariant, qty]);

  const addProductToShoppingCart = () => {
    //? Agrega variantes al carrito
    setLoading(true);
    const currentPrice = `precio${managedClient.priceList ? managedClient.priceList : priceList}`;

    dispatch(
      addItemToCart({
        productId: currentVariant.id,
        marcaId: parseInt(id),
        name: currentVariant.description,
        img: currentVariant.pathImage || assets.logos.logoBlack,
        price: currentVariant[currentPrice],
        qty: Number(qty),
      })
    );
    setTimeout(() => {
      toast("Producto Agregado", {
        action: {
          label: "Ver Carrito",
          onClick: () => navigate("/carrito"),
        },
      });
      setLoading(false);
    }, 800);
  };

  const getVariantPrice = () => {
    //? Manega el precio dinamico para cada usuario dependiendo su `priceList`
    const currentPrice = `precio${managedClient.priceList ? managedClient.priceList : priceList}`;

    const format = formatPrices(currentVariant[currentPrice] * qty);
    return format;
  };

  const isInCart = items?.find((i) => i?.productId === currentVariant?.id);

  return (
    <main className="mx-auto mb-10 flex max-w-7xl flex-col items-center gap-6 px-10 pt-4 md:grid md:grid-flow-dense md:grid-cols-2 md:place-items-start md:gap-10">
      <GoBackButton className="self-start md:col-span-2" />
      <h1 className="line-clamp-1 self-start font-primary text-3xl font-semibold md:col-span-2">
        {product?.description}
      </h1>
      <VariantSwiper
        variants={product?.variants}
        currentVariant={currentVariant}
        setCurrentVariant={setCurrentVariant}
      />
      <section className="min-w-full md:col-start-2  md:row-start-3 md:grid md:h-full xl:h-auto xl:gap-20">
        {email && (
          <div className="flex w-full flex-col gap-5 md:gap-20">
            <SelectVariant
              variants={product.variants}
              currentVariant={currentVariant}
              setCurrentVariant={setCurrentVariant}
            />
            <SelectQuantity qty={qty} setQty={setQty} />
            <div className={`yellowGradient flex justify-between text-xl font-semibold`}>
              <p>TOTAL:</p>
              <p className="font-bold !text-secondary">{getVariantPrice()}</p>
            </div>
          </div>
        )}
        <div className="my-10 w-full rounded-md bg-primary/50 p-4 shadow-md md:hidden">
          <ColorPalette variants={product.variants} currentVariant={currentVariant} />
        </div>
        <div className="md:self-end">
          <DefaultButton
            isLoading={loading}
            isDisabled={email ? !qty && true : false}
            className="w-full font-secondary text-[15px] uppercase md:self-end"
            onPress={email ? addProductToShoppingCart : () => navigate("/sign-in")}
          >
            {email ? "Agregar al carrito" : "Acceder para ver precios"}
          </DefaultButton>
          <AnimatePresence key={currentVariant?.description}>
            {isInCart && (
              <motion.h1
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ type: "spring" }}
                className="mt-10 w-full break-all text-center text-sm md:mt-4 md:self-end"
              >
                Tienes{" "}
                <strong className="yellowGradient">
                  {isInCart.qty} {isInCart.qty > 1 ? "unidades" : "unidad"}
                </strong>{" "}
                de esta variante en tu carrito.
              </motion.h1>
            )}
          </AnimatePresence>
        </div>
      </section>
      <div className="hidden w-full rounded-md bg-primary/50 p-4 shadow-md md:col-start-1  md:inline lg:col-span-2 lg:p-10">
        <ColorPalette variants={product.variants} currentVariant={currentVariant} />
      </div>
    </main>
  );
};

function ColorPalette({ variants = [], currentVariant }) {
  const colours = new Set();

  variants.forEach((v) => {
    //? Esto divide los colores y los acomoda para mostrar los colores unicos. Es dinamico con los camppos subrub y rubro (Un bardo)
    const { subRub } = v;
    if (subRub) {
      let [interno, externo] = subRub.split("-");
      if (interno) colours.add(interno);
      if (externo) colours.add(externo);
    }
  });
  const coloursArray = Array.from(colours);

  /**${
                _interno === currentVariant?.subRub && "border-b-[1.5px] border-black"
               */

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
      <p
        className="text-left text-sm sm:text-lg"
        dangerouslySetInnerHTML={{
          __html: formatDescription(
            currentVariant.description2 !== ""
              ? currentVariant.description2
              : "DESCRIPCIÓN: --- LAMPARA: --- MATERIAL: --- DIMENSIONES: --- CAJA CERRADA: ---"
          ),
        }}
      ></p>
      <div className="flex flex-col gap-5">
        <p className="text-lg font-semibold">Colores:</p>
        {coloursArray.map((interno) => {
          const _interno = interno;
          interno = colors[interno];
          return (
            <div className="relative flex w-full" key={interno.name}>
              <AnimatePresence mode="wait" key={interno.name}>
                {_interno === currentVariant.subRub && (
                  <motion.i
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ type: "spring" }}
                    className={twMerge("ri-arrow-right-s-line absolute -left-12 top-0 text-2xl text-secondary")}
                  />
                )}
              </AnimatePresence>
              <p
                className={twMerge(
                  `line-clamp-1 flex w-fit flex-1 items-center gap-5 transition-all`,
                  _interno === currentVariant.subRub && "font-bold"
                )}
              >
                <span
                  className={twMerge("aspect-square w-6 rounded-full")}
                  style={{ background: interno.color }}
                ></span>
                {interno.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
