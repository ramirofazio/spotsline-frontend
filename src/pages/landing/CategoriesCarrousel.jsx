import { Button } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useLoaderData, Link } from "react-router-dom";
import { getOfStorage } from "src/utils/localStorage";
import AwsImage from "src/components/images/AwsImage";

export default function CategoriesCarrousel() {
  const categories = getOfStorage("categories") || useLoaderData();

  return (
    <section id="landing-categories-carrousel" className="relative my-10  w-screen">
      <Swiper
        id="carrousel-container"
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={20}
        slidesPerView={3}
        loop={categories.legnth > 6}
        className="mySwiper !overflow-visible hover:cursor-grab"
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
      >
        {categories.map((c, index) => (
          <SwiperSlide key={index} className="!flex !justify-center ">
            <div className="grid aspect-square w-24 place-items-center rounded-full bg-background bg-gradient-to-b from-primary/60 to-primary p-2 shadow-xl md:w-32">
              <Button
                isIconOnly
                variant="solid"
                radius="full"
                className="group-[]: relative h-full w-full overflow-hidden text-center text-xs font-bold uppercase text-black/70 shadow shadow-black  transition hover:scale-125"
              >
                <Link to={`/products/cat/${c}`}>
                  <AwsImage type="lights" identify={"light"} className="-z-10 w-full bg-secondary/30" />
                  <div className="absolute inset-0 flex items-center justify-center transition hover:backdrop-blur-sm">
                    <span className="md:text-md w-[80%] whitespace-normal break-words font-secondary font-extrabold group-hover:text-dark">
                      {c}
                    </span>
                  </div>
                </Link>
              </Button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
