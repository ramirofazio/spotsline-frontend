import { useLoaderData } from "react-router-dom";

export default function OrderDetail() {
  const order = useLoaderData();

  console.log(order);
  //TODO hacer toda la landing de la orden

  return <h1 className="">order detail</h1>;
}
