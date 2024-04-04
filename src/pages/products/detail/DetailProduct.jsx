import { Button, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { APISpot } from "src/api";
import { assets } from "src/assets";
import { SkeletonDetail } from "./SkeletonDetail";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "src/redux/reducers/shoppingCart";
import { PreviewImage } from "./PreviewImage";

export function DetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { email } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [current, setCurrent] = useState();
  const [state, setState] = useState(1);
  const qty = 2;

  useEffect(() => {
    document.title = "SPOTSLINE - Cargando...";
    APISpot.product
      .getOne({ id })
      .then(({ data }) => {
        console.log(data);
        setProduct(data);
        setCurrent(data.variants[0]);
        document.title = "SPOTSLINE - " + data.description;
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => (document.title = "SPOTSLINE");
  }, [id]);

  function addProductToShoppingCart() {
    dispatch(
      addItemToCart({
        id: current.id,
        name: current.description,
        img: current.pathImage || assets.lights.light2,
        price: current.precio1,
        quantity: state,
      })
    );
    toast("Producto Agregado", {
      action: {
        label: "Ver Carrito",
        onClick: () => navigate("/carrito"),
      },
    });
  }

  if (isLoading) return <SkeletonDetail />;
  //if (!product?.variants?.length) throw "";

  return (
    <main className="mb-10 mt-20 min-h-[500px]  max-w-7xl gap-16 px-6 md:mt-32  md:flex md:px-12 lg:mx-auto">
      <VariantsProduct variants={product.variants} current={{ set: setCurrent, values: current }} />
      <section className="my-10 md:my-0 md:w-1/2">
        <h1 className="mb-8 font-primary text-3xl font-semibold">{product?.description}</h1>

        {email && (
          <>
            <p className="-mt-2 mb-4 text-xl ">{"$ " + current.precio1}</p>
            <Select
              className="mb-6"
              value={state}
              label="Cantidad"
              onChange={({ target }) => setState(target.value)}
              placeholder="2 Disponibles"
            >
              {Array(qty)
                .fill(1)
                .map((_x, i) => (
                  <SelectItem key={i + 1} textValue={i + 1}>
                    {i + 1}
                  </SelectItem>
                ))}
            </Select>
          </>
        )}
        <Button
          color="primary"
          radius="full"
          className="mb-8 w-full p-6 font-secondary text-lg uppercase"
          onClick={email ? addProductToShoppingCart : () => navigate("/sign-in")}
        >
          {email ? "Agregar al carrito" : "Acceder para ver precios"}
        </Button>
        <div className="rounded-md bg-primary/30 p-6">
          <h3 className="text-lg font-semibold uppercase">Descripción</h3>
          Colgante con pantalla grande.
          <h3 className="text-lg font-semibold uppercase">Lámpara</h3>
          E27
          <h3 className="text-lg font-semibold uppercase">Material</h3>
          Aluminio Esmeralizado.
          <h3 className="text-lg font-semibold uppercase">Dimensiones</h3>
          Ø: 443mm – H: 326mm
          <h3 className="text-lg font-semibold uppercase">Caja Cerrada</h3>4 Unidades
        </div>
      </section>
    </main>
  );
}

function VariantsProduct({ variants, current }) {
  const { id, pathImage, subRub } = current.values;
  return (
    <div className="mb-4 grid grid-cols-5 place-content-start gap-y-3 md:w-1/2">
      <PreviewImage description={subRub} pathImage={pathImage || assets.lights.light2} />
      {variants.map(({ description, pathImage, ...variant }, i) => (
        <img
          key={"variants" + i}
          className={`aspect-square  object-cover  ${id !== variant.id && "brightness-75  hover:brightness-100 "}`}
          src={pathImage || assets.lights.light2}
          alt={description}
          onClick={() => current.set({ description, pathImage, ...variant })}
        />
      ))}
    </div>
  );
}

function GoBack() {
  return (
    <Button
      className="my-2 px-0"
      variant="light"
      startContent={<i className="ri-arrow-left-s-line" />}
      onClick={() => window.history.back()}
    >
      Volver
    </Button>
  );
}
