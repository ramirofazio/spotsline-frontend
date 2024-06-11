import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { assets, images } from "src/assets";
import { DefaultButton } from "..";
import AwsImage from "../images/AwsImage";
import { onViewFadeInBottom } from "src/styles/framerVariants";
import { AnimatePresence, motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFlip } from "swiper/modules";
import "swiper/css/effect-flip";
import "swiper/css";

export function ProductCard({ description, codigo, pathfoto }) {
  function getDelay() {
    return Math.floor(Math.random() * 2000) + 4000; // Genera un número aleatorio entre 4000 y 6000 milisegundos
  }
  return (
    <AnimatePresence>
      <NavLink
        className="col-span-2 mx-auto w-[90%] sm:col-span-1 lg:col-span-1 s:w-full  s:max-w-[300px]"
        to={`/producto/${codigo}`}
      >
        <motion.div {...onViewFadeInBottom()}>
          <Card className="aspect-square h-[300px] w-full overflow-visible  bg-white shadow-xl transition hover:scale-105">
            <CardBody className="flex h-[150px] items-center justify-center overflow-hidden  p-0">
              <Swiper
                loop={true}
                autoplay={{
                  delay: getDelay(),
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                flipEffect={{ slideShadows: false }}
                modules={[Autoplay, EffectFlip]}
                effect="flip"
                className="mx-auto !flex w-[90%]  !items-center !justify-center "
              >
                {pathfoto?.length ? (
                  pathfoto.map((path, i) => {
                    return (
                      <SwiperSlide className="w-fit" key={i}>
                        <Image
                          loading="lazy"
                          src={path ? path : assets.logos.logoBlack}
                          alt={`product-image-${description}`}
                          className="!my-auto mx-auto !max-h-full w-full max-w-[250px]  bg-white object-cover"
                        />
                      </SwiperSlide>
                    );
                  })
                ) : (
                  <>
                    <SwiperSlide>
                      <Image
                        loading="lazy"
                        src={assets.logos.logoWhite}
                        alt={`product-image-${description}`}
                        className="mx-auto  w-full max-w-[250px] object-cover"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        loading="lazy"
                        src={assets.logos.logoBlack}
                        alt={`product-image-${description}`}
                        className="mx-auto w-full max-w-[250px] object-cover"
                      />
                    </SwiperSlide>
                  </>
                )}
              </Swiper>
            </CardBody>
            <CardFooter className="relative flex flex-col items-start gap-3 border-t-8 border-background bg-gradient-to-tr from-dark/30 to-primary/30">
              <AwsImage
                type="logos"
                identify={"logoBlack"}
                className={"absolute -right-20 -top-6 -z-10 w-40 rotate-45 blur-sm"}
              />
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
