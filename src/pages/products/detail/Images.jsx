import { useEffect, useState } from "react";
import { assets } from "src/assets";

const imagePerPage = 5;

export function Images({ variants, currentVariant, setCurrentVariant }) {
  //! Hay qeu conectar el currentVariant con las imagenes para que se cambien solas. lo missmo si apretan una imagen, hay que setear el currentVariant!

  const [state, setState] = useState({
    currentSlide: 0,
    currentPage: 1,
    totalPages: Math.ceil(variants.length / imagePerPage),
    cycles: 0,
    timerId: null,
  });

  function getChangeOfPage(currentSlide, currentPage) {
    const { totalPages } = state;
    if (currentSlide === 0) return 1;
    if (currentSlide === (imagePerPage - 1) * currentPage) {
      if (currentPage === totalPages) return 1;
      return currentPage + 1;
    }

    if (currentSlide === (imagePerPage - 1) * (currentPage - 1) && currentSlide !== 0) return currentPage - 1;

    return currentPage;
  }

  function handleClick(to) {
    setState((prevState) => ({
      ...prevState,
      currentSlide: to,
      currentPage: getChangeOfPage(to, prevState.currentPage),
    }));
  }

  function getPointIndexes() {
    const { currentPage } = state;
    const a = [...Array(imagePerPage).keys()].map((x) => x + (imagePerPage - 1) * (currentPage - 1));
    return a;
  }

  return (
    <div className="mx-auto mt-4 max-w-[450px]  md:mt-0 md:w-[55%] lg:w-3/5 lg:max-w-[580px]">
      <div className="relative aspect-[10/8] overflow-hidden rounded-lg">
        {variants.map(({ id, description, pathImage }, index) => (
          <img
            key={id}
            style={{ zIndex: index === state.currentSlide && "1" }}
            className={`absolute left-1/2 h-full w-full -translate-x-1/2 bg-slate-50 transition-all ${
              index === state.currentSlide ? "opacity-100" : "opacity-0"
            }`}
            src={pathImage || assets.logos.logoBlack}
            alt={description}
            title={description}
          />
        ))}
      </div>
      <div className="mt-5 flex items-center justify-start">
        {getPointIndexes().map((index) => {
          if (state.currentPage > state.totalPages || index >= variants.length) {
            return null;
          }

          return (
            <img
              key={"variants" + index}
              className={`object-cover transition-all ease-in-out ${index === state.currentSlide && "brightness-75"}`}
              src={variants[index].pathImage || assets.logos.logoBlack}
              onClick={() => handleClick(index)}
              style={{
                cursor: "pointer",
                width:
                  // Right
                  (index === (imagePerPage - 1) * state.currentPage && state.currentPage < state.totalPages) ||
                  // Left
                  (index === (imagePerPage - 1) * (state.currentPage - 1) && index !== 0)
                    ? "15%"
                    : "20%",
                color: state.currentSlide === index ? "salmon" : "pink",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
