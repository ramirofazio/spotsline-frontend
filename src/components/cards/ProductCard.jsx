import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { assets } from "src/assets";
import { DefaultButton } from "..";
import AwsImage from "../images/AwsImage";

export function ProductCard({ description, codigo, pathImage }) {
  return (
    <NavLink
      className="col-span-2 mx-auto w-[250px]  sm:col-span-1 lg:col-span-1 s:w-full  s:max-w-[300px]"
      to={`/producto/${codigo}`}
    >
      <Card className="aspect-square max-h-[400px] min-h-[300px] w-full overflow-visible  bg-white shadow-xl transition hover:scale-105">
        <CardBody className="flex min-h-[100px] items-center justify-center overflow-hidden p-0">
          <Image
            loading="lazy"
            className="w-full max-w-[200px]"
            width={150}
            height={150}
            alt={description}
            src={pathImage || assets.logos.logoBlack}
          />
        </CardBody>
        <CardFooter className="relative flex flex-col items-start gap-3 border-t-8 border-background bg-gradient-to-tr from-dark/30 to-primary/30">
          <AwsImage type="logos" identify={"logoBlack"} className={"absolute -right-28 -top-20 -z-10 blur-sm"} />
          <p className="line-clamp-1 font-semibold text-dark">{description}</p>
          <DefaultButton className={"-ml-1 w-full py-2"} endContent={<i className="ri-arrow-right-s-line" />}>
            VER MÁS
          </DefaultButton>
        </CardFooter>
      </Card>
    </NavLink>
  );
}

export function SkeletonCard() {
  const className = "animate-pulse bg-gradient-to-r from-dark to-primary opacity-20 ";

  return (
    <Card className="max-h-[400px] w-[250px]  space-y-3 bg-transparent py-2 shadow-none" radius="none">
      <div className={`${className} mb-1 h-[180px] rounded-lg`}></div>
      <div className={`${className} h-5 rounded-md`}></div>
      <div className={`${className} h-5 w-11/12 rounded-md`}></div>
      <div className={`${className} h-8 w-1/2 rounded-full`}></div>
    </Card>
  );
}
