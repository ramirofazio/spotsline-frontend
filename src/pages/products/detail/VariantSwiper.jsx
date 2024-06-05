import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination } from "swiper/modules";
import { assets } from "src/assets";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";

function ChangeSlide({ slideIndex }) {
  const swiper = useSwiper();
  return (
    <button className="hidden" id="change-slide" onClick={() => swiper.slideTo(slideIndex)}>
      change slide
    </button>
  );
}

export function VariantSwiper({ variants, currentVariant, setCurrentVariant }) {
  const [slideIndex, setSlideIndex] = useState(variants.indexOf(currentVariant));
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<img src="' + variants[index].pathImage + '" class="' + className + '" />';
    },
  };

  const handleVariantChange = (variantIndex) => {
    const newVariant = variants[variantIndex];
    setCurrentVariant(newVariant);
  };

  useEffect(() => {
    setSlideIndex(variants.indexOf(currentVariant));
  }, [currentVariant]);

  return (
    <Swiper
      initialSlide={slideIndex}
      modules={[Pagination]}
      pagination={pagination}
      scrollbar={{ draggable: true }}
      spaceBetween={10}
      slidesPerView={1}
      onSlideChange={({ activeIndex }) => handleVariantChange(activeIndex)}
      onSwiper={(swiper) => console.log(swiper)}
      className=""
    >
      <ChangeSlide slideIndex={slideIndex} />
      {variants?.map((variant, i) => (
        <SwiperSlide id={variant.id} key={i} className="mb-4 rounded-lg bg-white ">
          <img src={variant.pathImage || assets.logos.logoBlack} alt="Imagen de producto no disponible" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
