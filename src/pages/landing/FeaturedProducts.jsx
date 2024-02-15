import { Button, Image } from "@nextui-org/react";
import light2 from "assets/light2.png";
import { useNavigate } from "react-router-dom";

const featuredFooter = [
  { icon: "ri-tools-fill", text: "fabricantes" },
  { icon: "ri-truck-fill", text: "envios" },
  { icon: "ri-box-3-fill", text: "mayoristas" },
];

const mockFeaturedProducts = [
  { id: 241, img: light2 },
  { id: 241, img: light2 },
  { id: 241, img: light2 },
  { id: 241, img: light2 },
  { id: 241, img: light2 },
];
//! UPDATEAR MOCK

export default function FeaturedProducts() {
  const navigate = useNavigate();

  return (
    <section
      id="landing-featured-products"
      className="to-seoc relative grid place-content-center gap-6 bg-gradient-to-b from-background px-4 py-6 sm:px-6 xl:px-20"
    >
      <div className="absolute inset-x-0 top-0 z-20 h-2 !w-screen bg-secondary" />
      <div className="absolute top-0  grid w-full place-content-center">
        <Image src={light2} className="mx-auto w-[35%] sm:w-[30%]" />
      </div>
      <h1 className="text-xl font-bold sm:mt-4 sm:text-4xl">
        PRODUCTOS <br /> DESTACADOS
      </h1>

      <article className="mt-10 grid grid-cols-2 grid-rows-3 sm:mt-14 md:grid-flow-row md:grid-cols-3 md:grid-rows-2">
        {mockFeaturedProducts.map(({ id, img }, index) => (
          <Button
            key={index}
            className={`grid h-auto !place-items-start bg-landingbg bg-cover bg-center pb-10 ${
              index === 2 && "col-span-2 md:col-span-1"
            }
${index === 1 && "md:row-span-2"}
`}
            onPress={() => navigate(`/products/detail/${id}`)}
          >
            <div className="absolute h-full w-full bg-black/70" />
            <Image src={img} className={`${index === 2 && "w-[60%] md:w-auto "} mx-auto xl:w-[60%] `} isZoomed />
          </Button>
        ))}
      </article>

      <Button
        color="primary"
        size="lg"
        className="text-md white-neon font-bold hover:scale-110 hover:text-white md:mx-20 xl:mx-auto xl:w-fit xl:p-6 xl:text-xl"
        radius="full"
        startContent={<i className="ri-shopping-bag-2-line" />}
        onPress={() => navigate("/productos/0")}
      >
        VER TODOS LOS PRODUCTOS
      </Button>

      <article className="flex items-center justify-around md:mx-20 xl:mx-auto xl:w-[40%]">
        {featuredFooter.map(({ icon, text }, index) => (
          <div key={index} className="flex flex-grow flex-col items-center">
            <i className={`${icon} text-4xl text-primary drop-shadow-xl md:text-6xl`} />
            <p className="-mt-1 font-secondary text-xs uppercase text-black md:m-0 md:text-sm">{text}</p>
          </div>
        ))}
      </article>
    </section>
  );
}