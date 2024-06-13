import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useRouteLoaderData } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { twMerge } from "tailwind-merge";
import { actionProducts } from "src/redux/reducers";
import { useMediaQuery } from "src/hoooks/mediaQuerys";
import { useSpring, animated } from "react-spring";
import { useDrag } from "@use-gesture/react";

export default function CategoriesCarrousel() {
  const isMobile = useMediaQuery(800);

  const categories = useRouteLoaderData("root");

  const slider1 = useRef(null);
  const slider2 = useRef(null);

  const firstRowRef1 = useRef(null);
  const firstRowRef2 = useRef(null);
  const secondRowRef1 = useRef(null);
  const secondRowRef2 = useRef(null);

  const defaultVelocity = 0.015;

  let velocity1 = defaultVelocity;
  let velocity2 = defaultVelocity;

  let xPercent1 = 0;
  let xPercent2 = 0;
  let direction1 = -1;
  let direction2 = 1;

  const firstRowCategories = categories;
  const secondRowCategories = [...categories].sort(() => Math.random() - 0.5).reverse();

  const [springProps1, setSpringProps1] = useSpring(() => ({ x: 0 }));
  const [springProps2, setSpringProps2] = useSpring(() => ({ x: 0 }));

  const bind1 = useDrag(
    (state) => {
      setSpringProps1({ x: state.offset[0] });
      velocity1 = 0;
    },
    {
      bounds: { left: -window.innerWidth, right: window.innerWidth },
      rubberband: true,
    }
  );

  const bind2 = useDrag(
    (state) => {
      setSpringProps2({ x: state.offset[0] });
      velocity2 = 0;
    },
    {
      bounds: { left: -window.innerWidth, right: window.innerWidth },
      rubberband: true,
    }
  );

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

    xPercent1 += velocity1 * direction1;
    xPercent2 += velocity2 * direction2;

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    gsap.set(firstRowRef2.current, { left: firstRowRef2.current.getBoundingClientRect().width });
    gsap.set(secondRowRef2.current, { left: secondRowRef2.current.getBoundingClientRect().width });

    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const animation1 = gsap.to(slider1.current, {
      scrollTrigger: {
        trigger: document.body,
        scrub: 2,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (direction1 = e.direction * -1),
      },
      x: isMobile ? "-300px" : "-600px",
    });

    const animation2 = gsap.to(slider2.current, {
      scrollTrigger: {
        trigger: document.body,
        scrub: 2,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (direction2 = e.direction),
      },
      x: isMobile ? "300px" : "600px",
    });

    requestAnimationFrame(animate);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      animation1.kill();
      animation2.kill();
    };
  }, [isMobile]);

  return (
    <main className="relative flex flex-col items-center gap-6 overflow-hidden py-6 lg:gap-10 lg:py-10">
      <div className="absolute left-0 top-0 z-20 h-full w-[50px] bg-gradient-to-r from-background to-transparent lg:w-[100px]" />
      {/* SLIDER 1 */}
      <animated.div
        ref={slider1}
        className="relative whitespace-nowrap hover:cursor-grab"
        style={{ x: springProps1.x, touchAction: "none" }}
        onTouchStart={() => (velocity1 = 0)}
        onTouchMove={() => (velocity1 = 0)}
        onMouseEnter={() => (velocity1 = 0)}
        onTouchEnd={() => (velocity1 = defaultVelocity)}
        onMouseLeave={() => (velocity1 = defaultVelocity)}
        {...bind1()}
      >
        <div ref={firstRowRef1} className="relative flex w-fit">
          {firstRowCategories.map((c, index) => (
            <CategoryCard key={index} {...c} />
          ))}
        </div>
        <div ref={firstRowRef2} className="absolute left-[100%] top-0 flex w-fit">
          {firstRowCategories.map((c, index) => (
            <CategoryCard key={index} {...c} />
          ))}
        </div>
      </animated.div>
      {/* SLIDER 2 */}
      <animated.div
        ref={slider2}
        className="relative whitespace-nowrap hover:cursor-grab"
        style={{ x: springProps2.x, touchAction: "none" }}
        onTouchStart={() => (velocity2 = 0)}
        onTouchMove={() => (velocity2 = 0)}
        onMouseEnter={() => (velocity2 = 0)}
        onTouchEnd={() => (velocity2 = defaultVelocity)}
        onMouseLeave={() => (velocity2 = defaultVelocity)}
        {...bind2()}
      >
        <div ref={secondRowRef1} className="relative flex w-fit">
          {secondRowCategories.map((c, index) => (
            <CategoryCard key={index} {...c} />
          ))}
        </div>
        <div ref={secondRowRef2} className="absolute left-[100%] top-0 flex w-fit">
          {secondRowCategories.map((c, index) => (
            <CategoryCard key={index} {...c} />
          ))}
        </div>
      </animated.div>
      <div className="absolute right-0 top-0 z-20 h-full w-[50px] bg-gradient-to-l from-background to-transparent lg:w-[100px]" />
    </main>
  );
}

const CategoryCard = ({ name, value }) => {
  const dispatch = useDispatch();

  return (
    <div
      className={twMerge(
        "mx-5 flex min-h-[40px] min-w-[100px] cursor-pointer items-center justify-center gap-1 overflow-hidden rounded-full border-2 border-primary px-5 font-medium uppercase shadow-md transition hover:border-secondary hover:bg-primary/50 lg:mx-10 lg:min-h-[60px] lg:min-w-[300px] lg:font-semibold"
      )}
    >
      <Link onClick={() => dispatch(actionProducts.setCategory(value))} to={`/productos/1?category=${value}`}>
        <i className="ri-arrow-right-s-line text-lg text-secondary" /> {name}
      </Link>
    </div>
  );
};
