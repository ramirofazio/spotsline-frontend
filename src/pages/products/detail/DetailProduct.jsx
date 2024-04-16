import { Button, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { APISpot } from "src/api";
import { assets } from "src/assets";
import { SkeletonDetail } from "./SkeletonDetail";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "src/redux/reducers/shoppingCart";
import colors from "../../../data/colors.json";
import { VariantsProduct } from "./VariantsProducts";
export function DetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { email, lista } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [current, setCurrent] = useState();
  const [state, setState] = useState(1);
  const qty = 2;

  useEffect(() => {
    document.title = "SPOTSLINE - Cargando...";
    APISpot.product // TODO estaria bueno fetchear la data en el loader de react-router
      .getOne({ id })
      .then(({ data }) => {
        setProduct(data);
        setCurrent(data.variants[0]);
        document.title = "SPOTSLINE - " + data.description;
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () =>    (document.title = "SPOTSLINE");
  }, [id]);

  function addProductToShoppingCart() {

    dispatch(
      addItemToCart( {
        id: current.id,
        name: current.description,
        img: current.pathImage || assets.lights.light2,

        price: parseFloat(current["precio" + ((lista || 0) + 1)]),
        qty: state,
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
    <main className="mb-10 mt-20 min-h-[500px] max-w-7xl flex-wrap px-6 md:mt-32 md:flex md:gap-6 lg:mx-auto lg:gap-10 lg:px-12">
      <VariantsProduct variants={product.variants} current={{ set: setCurrent, values: current }} />
      <section        className="my-10 md:my-0 md:flex-1">
        <h1 className="mb-8 font-primary text-3xl font-semibold">{product?.description}</h1>

        {email && (
          <>
            <p className="-mt-2 mb-4 text-xl ">{"$ " + current["precio" + ((lista || 0) + 1)]}</p>
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
      </section>
      <div className="space-y-4 rounded-md bg-primary/30 p-6 md:w-[55%] lg:mt-6 lg:w-3/5">
        <h2 className="text-center text-lg font-semibold uppercase">Caracteristicas</h2>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum totam itaque quod nihil! Tenetur, perferendis
        molestiae dolor optio commodi
        <h3 className="text-lg font-semibold">Colores</h3>
        {product.variants.map(({ subRub }) => {
          let [interno, externo] = subRub.split("-");
          interno = colors[interno];
          externo = colors[externo];

          return (
            <div className="flex max-w-md" key={subRub}>
              <p className="flex flex-1 items-center gap-2">
                <span
                  className="inline-block aspect-square w-5 items-center rounded-full"
                  style={{ background: interno.color }}
                ></span>
                {interno.name}
              </p>
              {externo && (
                <p className="flex flex-1 items-center gap-2 ">
                  <span
                    className="inline-block aspect-square w-5 items-center rounded-full"
                    style={{ background: externo.color }}
                  ></span>
                  {externo.name}
                </p>
              )}
            </div>
          );
        })}
        <h3 className="text-lg font-semibold ">Lámpara</h3>
        E27
        <h3 className="text-lg font-semibold ">Material</h3>
        Aluminio Esmeralizado.
        <h3 className="text-lg font-semibold ">Dimensiones</h3>
        Ø: 443mm – H: 326mm
        <h3 className="text-lg font-semibold ">Caja Cerrada</h3>4 Unidades
      </div>
    </main>
  );
}

/*

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
}*/
