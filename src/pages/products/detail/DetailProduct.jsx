import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { assets } from "src/assets";
import { SkeletonDetail } from "./SkeletonDetail";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "src/redux/reducers/shoppingCart";
import colors from "../../../data/colors.json";
import { SelectQuantity } from "./SelectQuantity";
import { SelectVariant } from "./SelectVariant";
import { DefaultButton } from "src/components";
import { formatPrices } from "src/utils";
import { deleteOfStorage, getOfStorage, saveInStorage } from "src/utils/localStorage";
import { VariantSwiper } from "./VariantSwiper";

export function DetailProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useLoaderData();

  const { email, priceList } = useSelector((state) => state.user);
  const { managedClient } = useSelector((state) => state.seller);
  const { items } = useSelector((state) => state.cart);

  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const localVariant = getOfStorage("currentVariant");
  const [currentVariant, setCurrentVariant] = useState(
    localVariant
      ? product.variants[product.variants.findIndex((variant) => variant.id === localVariant.id)]
      : product.variants[0]
  );
  const [qty, setQty] = useState(getOfStorage("qty") || 1);

  useEffect(() => {
    document.title = "SPOTSLINE - Cargando...";
    console.log(product.variants);
    const localVariant = getOfStorage("currentVariant");
    if (localVariant) {
      console.log(product.variants.findIndex((variant) => variant.id === localVariant.id));
    }
    // console.log(localVariant);
    // setCurrentVariant(product.variants[0]);
    document.title = "SPOTSLINE - " + product.description;

    return () => (document.title = "SPOTSLINE");
  }, []);

  useEffect(() => {
    saveInStorage("currentVariant", currentVariant);
    saveInStorage("qty", qty);
  }, [currentVariant, qty]);

  useEffect(() => {
    return () => {
      deleteOfStorage("currentVariant");
      deleteOfStorage("qty");
    };
  }, []);

  function addProductToShoppingCart() {
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
    }, 250);
  }

  const getVariantPrice = () => {
    const currentPrice = `precio${managedClient.priceList ? managedClient.priceList : priceList}`;

    const format = formatPrices(currentVariant[currentPrice] * qty);
    return format;
  };

  if (isLoading) return <SkeletonDetail />;
  const isInCart = items.find((i) => i.productId === currentVariant.id);

  return (
    <main className="mt-30 mb-10 min-h-[500px] max-w-7xl flex-wrap px-6 md:mt-32 md:flex md:gap-6 lg:mx-auto lg:gap-10 lg:px-12">
      <div className="w-[50%]">
        <VariantSwiper
          variants={product?.variants}
          currentVariant={currentVariant}
          setCurrentVariant={setCurrentVariant}
        />
      </div>
      <section className="my-10 md:my-0 md:flex-1">
        <h1 className="mb-8 font-primary text-3xl font-bold">{product?.description}</h1>

        {email && (
          <div className="flex w-full flex-col gap-6">
            <SelectVariant
              variants={product.variants}
              currentVariant={currentVariant}
              setCurrentVariant={setCurrentVariant}
              // defaultSelectedKeys={currentVariant.description}
            />
            <SelectQuantity qty={qty} setQty={setQty} />
            <div className={`flex justify-between ${!qty && "animate-pulse text-red-600"}`}>
              <p className="text-2xl font-semibold">TOTAL:</p>
              <p className="text-2xl font-semibold">{getVariantPrice()}</p>
            </div>
          </div>
        )}
        <div className="my-10 w-full rounded-xl bg-primary/20 p-4 shadow-xl">
          <h3 className="mb-4 text-lg font-bold">Colores</h3>
          <ColorPalette variants={product.variants} currentVariant={currentVariant} />
        </div>
        {isInCart && (
          <h1 className="mx-auto my-2 w-fit">
            Ya dispones de <strong>{isInCart.qty}</strong> de estos productos en tu carrito
          </h1>
        )}
        <DefaultButton
          isLoading={loading}
          isDisabled={email ? !qty && true : false}
          className="mb-8 w-full p-6 font-secondary text-lg uppercase"
          onPress={email ? addProductToShoppingCart : () => navigate("/sign-in")}
        >
          {email ? "Agregar al carrito" : "Acceder para ver precios"}
        </DefaultButton>
      </section>
    </main>
  );
}

function ColorPalette({ variants = [], currentVariant }) {
  const _colors = new Set();
  variants.forEach((v) => {
    const { subRub } = v;
    if (subRub) {
      let [interno, externo] = subRub.split("-");
      if (interno) _colors.add(interno);
      if (externo) _colors.add(externo);
    }
  });
  const colorsArr = Array.from(_colors);
  return (
    <div className="flex flex-col gap-2">
      {colorsArr.map((interno) => {
        const _interno = interno;
        interno = colors[interno];
        return (
          <div className="flex w-fit" key={`interno:${interno.name}`}>
            <p
              className={`flex w-fit flex-1 items-center gap-2 ${
                _interno === currentVariant?.subRub ? "border-b-[1.5px] border-black" : ""
              }`}
            >
              <span
                className={`inline-block aspect-square w-5 items-center rounded-full ${
                  _interno === currentVariant?.subRub ? "animate-pulse border-[1.5px] border-black" : ""
                }`}
                style={{ background: interno.color }}
              ></span>
              {interno.name}
            </p>
          </div>
        );
      })}
    </div>
  );
}
