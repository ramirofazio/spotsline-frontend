import { Button, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { APISpot } from "src/api";
import { assets } from "src/assets";
import { SkeletonDetail } from "./SkeletonDetail";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "src/redux/reducers/shoppingCart";

export function DetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { email } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "SPOTSLINE - Cargando...";
    APISpot.product
      .getOne({ id })
      .then(({ data }) => {
        console.log(data);
        setProduct(data);
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
    dispatch(addItemToCart({ id: id, name: "", img: assets.lights.light2, price: 9999, quantity: 2 }));
  }

  if (isLoading) return <SkeletonDetail />;
  //if (!product?.variants?.length) throw "";

  return (
    <main className="mt-24 min-h-[500px] max-w-7xl gap-16 px-6 md:mt-32  md:flex md:px-12 lg:mx-auto">
      <VariantsProduct variants={product.variants} />
      <section className="my-10 space-y-10 md:my-0 md:w-1/2">
        <h1 className="font-primary text-3xl font-semibold">
          {product.variants[0].category + " " + product?.description}
        </h1>

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

function VariantsProduct({ variants }) {
  const [current, setCurrent] = useState(variants[0]);
  return (
    <div className="mb-4 grid grid-cols-6 place-content-start gap-y-3 md:w-1/2">
      <img
        className="col-span-6 aspect-[10/6] w-full overflow-hidden rounded-xl bg-gray-100 object-contain p-3"
        title={current.description}
        alt={current.description}
        src={current.pathImage || assets.lights.light2}
      />
      {variants.map(({ description, pathImage, id }, i) => (
        <div key={"variants" + i} className="col-span-1 aspect-[10/6]">
          <Image
            className={`${current.id !== id && "brightness-75 hover:brightness-100"}`}
            src={pathImage || assets.lights.light2}
            alt={description}
            onClick={() => setCurrent({ description, pathImage, id })}
          />
        </div>
      ))}
    </div>
  );
}
