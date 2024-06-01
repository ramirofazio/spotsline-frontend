// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { useEffect } from "react";

export function VariantSwiper({ variants, currentVariant, setCurrentVariant }) {
  console.log(variants);
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<img src="' + variants[index].pathImage + '" class="' + className + '"/>';
    },
  };

  const handleVariantChange = (variantIndex) => {
    const newVariant = variants[variantIndex];
    console.log("swipeo", newVariant);
    setCurrentVariant(newVariant);
  };
  // useEffect(() => {
  //   console.log("EFFECT");
  //   console.log(swiper);
  // }, [currentVariant]);
  return (
    <Swiper
      initialSlide={0}
      modules={[Pagination]}
      pagination={pagination}
      scrollbar={{ draggable: false }}
      spaceBetween={10}
      slidesPerView={1}
      onSlideChange={({ activeIndex }) => handleVariantChange(activeIndex)}
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
