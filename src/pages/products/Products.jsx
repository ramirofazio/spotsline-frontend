import { ProductCard } from "src/components/index";
import { PaginationComponent } from "components/index";
import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { APISpot } from "src/api";
import { useNavigate, useParams } from "react-router-dom";
import { SkeletonCard } from "src/components/cards/ProductCard";

const TAKE_PRODUCTS = 10;
const categories = [
  "Accesorios",
  "Apliques",
  "Artefactos para tubos led",
  "Cabezales",
  "Colgantes",
  "Empotrables",
  "Exterior",
  "Veladores y Apliques",
];

export function Products() {
  const navigate = useNavigate();
  const [currenPage, setCurrenPage] = useState(1);

  useEffect(() => {
    navigate("/productos/" + currenPage);
  }, [currenPage]);

  return (
    <>
      <header
        style={{ backgroundImage: 'url("../src/assets/empresa-scaled.jpg")' }}
        className="relative hidden shadow-medium min-h-[350px] flex-col items-center justify-center gap-2 bg-cover bg-bottom pt-16 text-white before:absolute before:inset-0 before:z-10 before:bg-black/10  before:content-[''] sm:flex"
      >
        <h1 className="z-20 font-primary text-5xl font-bold uppercase ">Productos</h1>
        <p className="z-20 font-secondary text-3xl">Encontra todo lo que necesites...</p>
      </header>
      <main className="flex gap-x-4 bg-[#D9D9D9] p-10">
        <article className="my-10 hidden pl-5 font-secondary md:block">
          <h2 className="text-lg font-semibold ">Categoria de Productos</h2>
          <ul className="pl-4">
            {categories.map((cat) => (
              <li key={cat}>{cat}</li>
            ))}
          </ul>
        </article>
        <section className="my-10 grid flex-1 grid-cols-1 place-items-center gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Heading />
          <ProductsView />
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
            <PaginationComponent qty={TAKE_PRODUCTS} page={currenPage} setCurrentPage={setCurrenPage} />
          </div>
        </section>
      </main>
    </>
  );
}

function ProductsView() {
  const [products, setProducts] = useState([]);
  const { page } = useParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    APISpot.getPaginatedProducts(TAKE_PRODUCTS, TAKE_PRODUCTS * page > 0 ? page - 1 : page)
      .then(({ data }) => {
        setLoading(false);
        setProducts(data);
      })
      .catch((err) => console.log(err));
  }, [page]);

  if (loading) {
    const fake = new Array(TAKE_PRODUCTS).fill(null).map((_x, i) => "fake-card-" + (i + 1));
    return fake.map((fake) => <SkeletonCard key={fake} />);
  }

  return (
    <>
      {" "}
      {products.map((p, index) => (
        <ProductCard {...p} key={index} />
      ))}
    </>
  );
}

function Heading() {
  return (
    <>
      <div className=" mb-5 flex w-full items-center gap-1 sm:col-span-2 md:w-10/12 lg:col-span-3 xl:col-span-4">
        <Input
          isClearable
          radius="full"
          className=""
          labelPlacement=""
          placeholder="Buscar producto"
          startContent={<i className="ri-search-line scale-125"></i>}
        />

        <Button className="bg-transparent hover:bg-secondary hover:text-white" isIconOnly aria-label="Like">
          <i className="ri-equalizer-line scale-125"></i>
        </Button>
      </div>
    </>
  );
}
