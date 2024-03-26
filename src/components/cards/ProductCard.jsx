import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { assets } from "src/assets";

export function ProductCard({ description, id, pathImage }) {
  const navigate = useNavigate();
  return (
    <Card className=" w-[200px] overflow-visible bg-transparent shadow-none hover:scale-105">
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width={200}
          height={150}
          alt={description}
          className="bg-white object-cover px-6 pb-10"
          src={pathImage || assets.lights.light2}
        />
      </CardBody>
      <CardFooter className="flex flex-col items-start space-y-2 overflow-visible bg-transparent font-secondary">
        <p className="line-clamp-2 h-12">{description}</p>
        <Button
          radius="full"
          className="bg-secondary px-6 text-[13px] uppercase text-primary shadow-xl hover:bg-primary hover:text-secondary"
          onClick={() => navigate(`/producto/${id}`)}
        >
          <b>Ver más</b>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function SkeletonCard() {
  const className = "bg-gray-500 animate-pulse";

  return (
    <Card className="w-[200px]  space-y-3 bg-transparent py-2 shadow-none" radius="none">
      <div className={`${className} mb-1 h-[180px] rounded-lg`}></div>
      <div className={`${className} h-5 rounded-md`}></div>
      <div className={`${className} h-5 w-11/12 rounded-md`}></div>
      <div className={`${className} h-8 w-1/2 rounded-full`}></div>
    </Card>
  );
}
