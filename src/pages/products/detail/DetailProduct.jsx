import { Button, Image } from "@nextui-org/react";
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
        price: parseFloat(current.precio1),
        qty: 1,
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
    <main className="mt-24 min-h-[500px] max-w-7xl gap-16 px-6 md:mt-32  md:flex md:px-12 lg:mx-auto">
      <VariantsProduct variants={product.variants} current={{ set: setCurrent, values: current }} />
      <section className="my-10 space-y-10 md:my-0 md:w-1/2">
        <h1 className="font-primary text-3xl font-semibold">
          {product.variants[0].category + " " + product?.description}
        </h1>

        {email && (
          <>
            <p className="text-xl ">{"$ " + current.precio1}</p>
          </>
        )}
        <Button
          color="primary"
          radius="full"
          className="p-5 font-secondary text-lg uppercase"
          onClick={email ? addProductToShoppingCart : () => navigate("/sign-in")}
        >
          {email ? "Agregar al carrito" : "Acceder para ver precios"}
        </Button>
        <div className="rounded-md bg-primary/30 p-6">
          <h3 className="text-lg font-semibold uppercase">Descripción</h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          <h3 className="text-lg font-semibold uppercase">Lámpara</h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          <h3 className="text-lg font-semibold uppercase">Material</h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          <h3 className="text-lg font-semibold uppercase">Dimensiones</h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          <h3 className="text-lg font-semibold uppercase">Caja Cerrada</h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
      </section>
    </main>
  );
}

function VariantsProduct({ variants, current }) {
  const { id, description, pathImage } = current.values;
  return (
    <div className="mb-4 grid grid-cols-6 place-content-start gap-y-3 md:w-1/2">
      <PreviewImage description={description} pathImage={pathImage || assets.lights.light2} />
      {variants.map(({ description, pathImage, ...variant }, i) => (
        <div key={"variants" + i} className="col-span-1 aspect-[10/6]">
          <Image
            className={`${id !== variant.id && "brightness-75 hover:brightness-100"}`}
            src={pathImage || assets.lights.light2}
            alt={description}
            onClick={() => current.set({ description, pathImage, ...variant })}
          />
        </div>
      ))}
    </div>
  );
}
