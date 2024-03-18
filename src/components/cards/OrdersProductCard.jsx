import { Link } from "react-router-dom";
import AwsImage from "../images/AwsImage";
import FloatingLogos from "../images/FloatingLogos";

export default function OrderProduct({ title, image, link, type }) {
  return (
    <div className="relative flex aspect-square w-[60vw]  flex-col items-center gap-4 overflow-hidden rounded-md border-3 border-primary bg-white shadow-xl">
      <FloatingLogos qty={1} positions={["-top-20 -right-40"]} size={"scale-[70%]"} />
      <AwsImage type={"logos"} identify={"logoYellow"} className={"mx-auto w-24 drop-shadow-xl"} />
      <div>
        <h2 className="font-bold">{title}</h2>
        <h3 className="line-clamp-1">
          {type === "order" && "ORDEN N° "}
          <strong>{description}</strong>
        </h3>
      </div>
      <Link to={link} className="icons yellowGradient absolute bottom-4">
        {text}
      </Link>
    </div>
  );
}
