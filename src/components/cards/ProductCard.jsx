import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { images } from "src/assets";
import { DefaultButton } from "..";
import AwsImage from "../images/AwsImage";
import { fadeInBottom } from "src/styles/framerVariants";
import { AnimatePresence, motion } from "framer-motion";

export function ProductCard({ description, codigo, pathfoto }) {
  return (
    <AnimatePresence>
      <NavLink
        className="col-span-2 mx-auto w-[90%] sm:col-span-1 lg:col-span-1 s:w-full  s:max-w-[300px]"
        to={`/producto/${codigo}`}
      >
        <motion.div {...fadeInBottom()}>
          <Card className="aspect-square max-h-[400px] min-h-[300px] w-full overflow-visible  bg-white shadow-xl transition hover:scale-105">
            <CardBody className="flex min-h-[100px] items-center justify-center overflow-hidden p-0">
              <Image
                loading="lazy"
                className="w-full max-w-[250px] object-cover"
                width={0}
                height={0}
                alt={`product-image-${description}`}
                src={pathfoto || images.logoBlack}
              />
            </CardBody>
            <CardFooter className="relative flex flex-col items-start gap-3 border-t-8 border-background bg-gradient-to-tr from-dark/30 to-primary/30">
              <AwsImage type="logos" identify={"logoBlack"} className={"absolute -right-28 -top-20 -z-10 blur-sm"} />
              <p className="line-clamp-1 font-semibold uppercase text-dark">{description}</p>
              <DefaultButton
                as={NavLink}
                to={`/producto/${codigo}`}
                className={"-ml-1 w-full  py-2"}
                endContent={<i className="ri-arrow-right-s-line" />}
              >
                VER MÁS
              </DefaultButton>
            </CardFooter>
          </Card>
        </motion.div>
      </NavLink>
    </AnimatePresence>
  );
}

export function SkeletonCard() {
  const className = "animate-pulse bg-gradient-to-r from-dark/50 to-primary/50 opacity-20";

  return (
    <NavLink className="col-span-2 mx-auto w-[90%] sm:col-span-1 lg:col-span-1 s:w-full  s:max-w-[300px]">
      <Card
        className={`${className} aspect-square max-h-[400px] min-h-[300px] w-full overflow-visible  bg-white shadow-xl transition hover:scale-105`}
      >
        <CardBody className="flex min-h-[100px] items-center justify-center overflow-hidden p-0">
          <Image
            loading="eager"
            width={0}
            height={0}
            className="w-full max-w-[250px] object-cover"
            alt={`skeleton-product-image`}
            src={images.logoBlack}
          />
        </CardBody>
        <CardFooter className="relative flex flex-col items-start gap-3 border-t-8 border-background bg-gradient-to-tr from-dark/30 to-primary/30">
          <AwsImage type="logos" identify={"logoBlack"} className={"absolute -right-28 -top-20 -z-10 blur-sm"} />
          <p className="line-clamp-1 w-20 font-semibold text-dark"></p>
          <DefaultButton className={"flex w-full items-center justify-center py-2"}>Cargando...</DefaultButton>
        </CardFooter>
      </Card>
    </NavLink>
  );
}
