import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export function ProductCard({ description, id }) {
  const navigate = useNavigate();
  return (
    <Card className="w-[200px] overflow-visible bg-transparent shadow-none">
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width={200}
          height={150}
          alt={description}
          className="bg-white object-cover p-7"
          src={"https://www.spotsline.com.ar/wp-content/uploads/2021/06/1004-neg.png"}
        />
      </CardBody>
      <CardFooter className="line-clamp-2 flex flex-col items-start space-y-2 overflow-visible bg-transparent font-secondary">
        <p>{description}</p>
        <Button
          radius="full"
          className="bg-secondary px-6 text-[13px] uppercase text-primary shadow-xl hover:bg-primary hover:text-secondary"
          onClick={() => navigate("/productos/" + id)}
        >
          <b>Ver más</b>
        </Button>
      </CardFooter>
    </Card>
  );
}
