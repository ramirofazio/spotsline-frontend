import { Link } from "react-router-dom";
import AwsImage from "../images/AwsImage";
import FloatingLogos from "../images/FloatingLogos";

export default function BorderedWhiteCard({ title, description, text, link, type }) {
  return (
    <div className="relative flex min-h-[250px] w-[60vw]  flex-col items-center gap-4 overflow-hidden  rounded-md border-3 border-primary  bg-white shadow-xl md:aspect-auto md:h-24 md:min-h-[100px] md:w-full md:flex-row lg:w-[80%] lg:justify-evenly lg:px-4">
      <FloatingLogos
        qty={1}
        positions={["-top-20 -right-40 md:opacity-50 lg:-top-40 lg:-right-60"]}
        size={"scale-[70%] lg:scale-[50%]"}
      />
      <AwsImage type={"logos"} identify={"logoYellow"} className={"mx-auto w-24 drop-shadow-xl lg:left-0"} />
      <div className="space-y-2 md:text-left md:text-xs lg:flex-1 lg:text-[15px]">
        <h2 className="font-bold">{title}</h2>
        <h3 className="line-clamp-2 text-xs">
          {type === "order" && "ORDEN N° "}
          <br />
          <strong>{description}</strong>
        </h3>
      </div>
      <Link to={link} className="icons yellowGradient absolute bottom-4 md:relative md:bottom-auto md:mr-2">
        {text}
      </Link>
    </div>
  );
}
