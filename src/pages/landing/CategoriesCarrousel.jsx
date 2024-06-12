import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useRouteLoaderData } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { twMerge } from "tailwind-merge";
import { actionProducts } from "src/redux/reducers";
import { useMediaQuery } from "src/hoooks/mediaQuerys";

export default function CategoriesCarrousel() {
  const isMobile = useMediaQuery(800);

  const dispatch = useDispatch();
  const categories = useRouteLoaderData("root");

  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const firstRowRef1 = useRef(null);
  const firstRowRef2 = useRef(null);
  const secondRowRef1 = useRef(null);
  const secondRowRef2 = useRef(null);

  const defaultVelocity = isMobile ? 0.04 : 0.03;

  let velocity1 = defaultVelocity;
  let velocity2 = defaultVelocity;

  let xPercent1 = 0;
  let xPercent2 = 0;
  let direction1 = -1;
  let direction2 = 1;

  const firstRowCategories = categories;
  const secondRowCategories = categories.reverse();

  const animate = () => {
    if (xPercent1 < -100) {
      xPercent1 = 0;
    } else if (xPercent1 > 0) {
      xPercent1 = -100;
    }

    if (xPercent2 < -100) {
      xPercent2 = 0;
    } else if (xPercent2 > 0) {
      xPercent2 = -100;
    }

    gsap.set(firstRowRef1.current, { xPercent: xPercent1 });
    gsap.set(firstRowRef2.current, { xPercent: xPercent1 });
    gsap.set(secondRowRef1.current, { xPercent: xPercent2 });
    gsap.set(secondRowRef2.current, { xPercent: xPercent2 });

    requestAnimationFrame(animate);

    xPercent1 += velocity1 * direction1;
    xPercent2 += velocity2 * direction2;
  };

  useEffect(() => {
    gsap.set(firstRowRef2.current, { left: firstRowRef2.current.getBoundingClientRect().width });
    gsap.set(secondRowRef2.current, { left: secondRowRef2.current.getBoundingClientRect().width });

    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(slider1.current, {
      scrollTrigger: {
        trigger: document.body,
        scrub: 2,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (direction1 = e.direction * -1),
      },
      x: "-800px",
    });

    gsap.to(slider2.current, {
      scrollTrigger: {
        trigger: document.body,
        scrub: 2,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (direction2 = e.direction),
      },
      x: "800px",
    });

    requestAnimationFrame(animate);
  }, []);

  const cardContainerStyles =
    " min-w-[100px] lg:min-w-[300px] min-h-[40px] lg:min-h-[60px] hover:bg-primary/50 hover:border-secondary transition group  cursor-pointer px-5 overflow-hidden  flex items-center justify-center gap-1 mx-5 lg:mx-10  border-2 lg:border-3 rounded-full border-primary font-medium lg:font-semibold uppercase";

  return (
    <main className="relative  my-6 flex flex-col items-center gap-6 overflow-hidden lg:my-10 lg:gap-10">
      <div className="absolute left-0 top-0 z-20 h-full w-[50px] bg-gradient-to-r from-background to-transparent lg:w-[100px]" />
      {/* SLIDER 1 */}
      <div
        ref={slider1}
        className="relative whitespace-nowrap"
        onTouchEnd={() => (velocity1 = defaultVelocity)}
        onMouseLeave={() => (velocity1 = defaultVelocity)}
      >
        <div ref={firstRowRef1} className="relative flex w-fit">
          {firstRowCategories.map((c, index) => (
            <Link
              key={index}
              onClick={() => dispatch(actionProducts.setCategory(c.value))}
              to={`/productos/1?category=${c.value}`}
            >
              <div
                className={twMerge(cardContainerStyles)}
                onTouchStart={() => (velocity1 = 0)}
                onMouseEnter={() => (velocity1 = 0)}
              >
                <i className="ri-arrow-right-s-line text-lg text-secondary" /> {c.name}
              </div>
            </Link>
          ))}
        </div>
        <div ref={firstRowRef2} className="absolute left-[100%] top-0 flex w-fit">
          {firstRowCategories.map((c, index) => (
            <Link
              key={index}
              onClick={() => dispatch(actionProducts.setCategory(c.value))}
              to={`/productos/1?category=${c.value}`}
            >
              <div
                className={twMerge(cardContainerStyles)}
                onTouchStart={() => (velocity1 = 0)}
                onMouseEnter={() => (velocity1 = 0)}
              >
                <i className="ri-arrow-right-s-line text-lg text-secondary" /> {c.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* SLIDER 2 */}
      <div
        ref={slider2}
        className="relative whitespace-nowrap"
        onTouchEnd={() => (velocity2 = defaultVelocity)}
        onMouseLeave={() => (velocity2 = defaultVelocity)}
      >
        <div ref={secondRowRef1} className="relative flex w-fit">
          {secondRowCategories.map((c, index) => (
            <Link
              key={index}
              onClick={() => dispatch(actionProducts.setCategory(c.value))}
              to={`/productos/1?category=${c.value}`}
            >
              <div
                className={twMerge(cardContainerStyles)}
                onTouchStart={() => (velocity2 = 0)}
                onMouseEnter={() => (velocity2 = 0)}
              >
                <i className="ri-arrow-right-s-line text-lg text-secondary" /> {c.name}
              </div>
            </Link>
          ))}
        </div>
        <div ref={secondRowRef2} className="absolute left-[100%] top-0 flex w-fit">
          {secondRowCategories.map((c, index) => (
            <Link
              key={index}
              onClick={() => dispatch(actionProducts.setCategory(c.value))}
              to={`/productos/1?category=${c.value}`}
            >
              <div
                className={twMerge(cardContainerStyles)}
                onTouchStart={() => (velocity2 = 0)}
                onMouseEnter={() => (velocity2 = 0)}
              >
                <i className="ri-arrow-right-s-line text-lg text-secondary" /> {c.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="absolute right-0 top-0 z-20 h-full w-[50px] bg-gradient-to-l from-background to-transparent lg:w-[100px]" />
    </main>
  );
}
