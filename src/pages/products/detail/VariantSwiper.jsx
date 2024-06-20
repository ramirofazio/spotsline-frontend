import { useEffect, useState } from "react";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { assets } from "src/assets";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { DarkModal } from "src/components";
import { Image, useDisclosure } from "@nextui-org/react";

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
  const [bigVariant, setBigVariant] = useState({ name: "", img: "" });
  let tap = 0;

  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<img src="' + variants[index].pathImage + '" class="' + className + '" />';
    },
    //! Los estilos de esto estan en index.css
  };

  const handleVariantChange = (variantIndex) => {
    const newVariant = variants[variantIndex];
    setCurrentVariant(newVariant);
  };

  useEffect(() => {
    setSlideIndex(variants.indexOf(currentVariant));
  }, [currentVariant]);

  return (
    <>
      <Swiper
        initialSlide={slideIndex}
        grabCursor={true}
        modules={[Pagination, Autoplay, EffectCreative]}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        loop={true}
        pagination={pagination}
        autoplay={{ delay: 4000, disableOnInteraction: true }}
        scrollbar={{ draggable: true }}
        spaceBetween={10}
        slidesPerView={1}
        onSlideChange={(props) => handleVariantChange(props.realIndex)}
        className="w-full"
      >
        <ChangeSlide slideIndex={slideIndex} />
        {variants?.map((variant, i) => (
          <SwiperSlide
            id={variant.id}
            key={i}
            onClick={() => {
              if (tap === 0) {
                tap++;
                setTimeout(() => {
                  tap = 0;
                }, 600);
              } else {
                onOpen();
                setBigVariant({ name: variant.description, img: variant.pathImage });
              }
            }}
            className="relative flex w-full items-center justify-center rounded-lg border-2 border-primary bg-white"
          >
            <i
              className="ri-fullscreen-line icons absolute bottom-3 right-3 z-20 text-xl text-secondary"
              onClick={() => {
                onOpen();
                setBigVariant({ name: variant.description, img: variant.pathImage });
              }}
            />
            <Image
              src={variant.pathImage || assets.logos.logoBlack}
              alt={`${variant.description} Image`}
              className="mx-auto w-full max-w-[700px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <DarkModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        size="5xl"
        title={bigVariant.name}
        placement="center"
        modalClassName={"flex items-center justify-center"}
      >
        <Image isZoomed src={bigVariant.img} alt={`big-variant-image`} className="h-full w-full" />
      </DarkModal>
    </>
  );
}
