// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export function VariantSwiper({ variants }) {
  console.log(variants);

  const bullet = <picture>holaaaa</picture>;

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<img src="' + variants[index].pathImage + '" class="' + className + '"/>';
    },
  };

  // const pagination = {
  //   clickable: true,
  //   renderBullet: function (index, className) {
  //     return '<div class="' + className + '">' + (index + 1) + "</div";
  //   },
  // };

  return (
    <Swiper
      modules={[Pagination]}
      pagination={pagination}
      scrollbar={{ draggable: false }}
      spaceBetween={10}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      className="border-2 border-green-400"
    >
      {variants?.map((variant, i) => (
        <SwiperSlide key={i} className=" border-2 border-red-500">
          Slide {i}
          <img src={variant.pathImage} alt="no taaaaa" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
