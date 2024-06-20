import { Link, useLoaderData } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Image } from "@nextui-org/react";
import { DefaultButton } from "src/components";
import { useRef, useState } from "react";
import { formatDescription } from "src/utils";

const featuredFooter = [
  { icon: "ri-tools-fill", text: "fabricantes" },
  { icon: "ri-box-3-fill", text: "mayoristas" },
  { icon: "ri-truck-fill", text: "envios" },
];

export default function FeaturedProducts() {
  const featuredProducts = useLoaderData();

  return (
    <section className="relative flex min-h-screen flex-col items-center gap-6 overflow-hidden py-6 lg:gap-10 lg:py-10">
      <Header />
      <div className="flex flex-col gap-20 pt-5 sm:pt-0 md:gap-32 lg:gap-40">
        {featuredProducts.map((product, index) => (
          <FeaturedCard key={index} {...product} index={index} />
        ))}
      </div>
      <div className="mt-10 flex w-full items-center justify-center gap-10 px-10 lg:mt-20">
        {featuredFooter.map(({ icon, text }, index) => (
          <article
            key={index}
            className={twMerge(
              "flex min-h-[100px] w-full flex-col items-center justify-center space-y-5 overflow-visible lg:space-y-8"
            )}
          >
            <i
              className={twMerge(
                icon,
                "yellowGradient text-5xl drop-shadow-xl transition hover:animate-spinner-ease-spin hover:drop-shadow-none lg:text-6xl"
              )}
            />
            <p className="hidden text-sm font-semibold uppercase md:block lg:text-lg">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const Header = () => {
  const headerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.header
      ref={headerRef}
      style={{ opacity }}
      className="flex w-full flex-col items-center gap-2 px-10 text-center md:max-w-[70vw] md:gap-5 md:space-y-5"
    >
      <h2 className="text-2xl font-semibold uppercase text-secondary md:text-3xl">Los más elegidos</h2>
      <p className="text-md font-medium text-secondary/80 md:text-xl">
        Descubrí nuestros mejores productos en relación precio-diseño-calidad
      </p>
      <i className="ri-arrow-down-s-line mt-5 animate-bounce self-center text-4xl md:!mt-10 md:text-5xl" />
    </motion.header>
  );
};

const FeaturedCard = ({ codigo, id, name, variants, index }) => {
  const cardRef = useRef(null);

  const [slideIndex, setSlideIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end end"],
    smooth: 4,
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 !== 0 ? 300 : -300, 0]);

  return (
    <motion.article
      style={{ opacity }}
      ref={cardRef}
      id={id}
      className={twMerge(
        "relative flex min-h-[60vh] w-screen flex-col items-center justify-center gap-10 md:min-h-[75vh] lg:!h-[55vh] lg:flex-row lg:justify-between xl:!min-h-[60vh] xs:h-[50vh] xs:min-h-[70vh]",
        index % 2 !== 0 && "lg:flex-row-reverse"
      )}
    >
      <motion.div
        style={{ x }}
        className={twMerge(
          "flex w-[80vw] flex-1 items-center justify-center self-start overflow-hidden rounded-r-full border-2 border-l-0 border-primary bg-gradient-to-l from-secondary/30 to-white shadow-xl md:min-h-[300px] lg:w-[50vw] lg:flex-1 lg:self-stretch xs:w-[70vw]",
          index % 2 !== 0 && "self-end rounded-l-full rounded-r-none border-l-2 border-r-0 bg-gradient-to-r"
        )}
      >
        <Swiper
          loop={true}
          autoplay={{
            delay: 6000,
            disableOnInteraction: true,
            reverseDirection: index % 2 !== 0,
          }}
          flipEffect={{ slideShadows: false }}
          modules={[Autoplay]}
          className={twMerge("-translate-x-2", index % 2 !== 0 && "translate-x-2")}
          onSlideChange={({ realIndex }) => setSlideIndex(realIndex)}
        >
          {variants?.map(({ img }, i) => {
            return (
              <SwiperSlide className="cursor-grab" key={i}>
                <Image loading="lazy" src={img} alt={`featured-product-image-${name}`} className="xl:scale-90" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </motion.div>
      <div
        className={twMerge(
          "flex flex-col gap-5 overflow-hidden text-center lg:h-full lg:w-fit lg:flex-1 lg:items-center lg:justify-center lg:gap-10"
        )}
      >
        <h2 className="text-lg font-semibold tracking-wider text-dark sm:!text-2xl  xl:font-bold xs:text-xl">{name}</h2>

        <p
          className="text-left text-sm sm:text-lg"
          dangerouslySetInnerHTML={{
            __html: formatDescription(
              variants[slideIndex].description ||
                "DESCRIPCIÓN: --- LAMPARA: --- MATERIAL: --- DIMENSIONES: --- CAJA CERRADA: ---"
            ),
          }}
        ></p>
        <DefaultButton
          as={Link}
          to={`producto/${codigo}`}
          endContent={<i className="ri-arrow-right-up-line text-sm lg:text-lg" />}
          className={"mx-auto mt-5 text-sm lg:w-80 lg:text-lg"}
        >
          CONOCER MÁS
        </DefaultButton>
      </div>
    </motion.article>
  );
};
