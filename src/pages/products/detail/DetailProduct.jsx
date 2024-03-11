import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { APISpot } from "src/api";

export function DetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    APISpot.product
      .getOne({ id })
      .then(({ data }) => {
        setProduct(data);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div>cargando...</div>;

  return (
    <main className="mt-20 min-h-[500px] px-6">
      <Image
        shadow=""
        radius="lg"
        width={350}
        height={350}
        alt={id}
        className="aspect-square w-full bg-white object-cover p-6"
        src={"https://www.spotsline.com.ar/wp-content/uploads/2021/06/1004-neg.png"}
      />
      <h1>{product.description}</h1>
    </main>
  );
}
