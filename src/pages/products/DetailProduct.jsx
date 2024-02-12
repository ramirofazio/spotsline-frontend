import { useParams } from "react-router-dom";

export function DetailProduct() {
  const { id } = useParams();
  return <div>product: {id}</div>;
}
