import { useParams } from "react-router-dom";

export function DetailProduct() {
  const { id } = useParams();
  return <div className="min-h-[500px] mt-52">product: {id}</div>;
}
