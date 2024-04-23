import { ProductCard } from "src/components/index";
import { PaginationComponent } from "components/index";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { APISpot } from "src/api";
import { useNavigate, useParams } from "react-router-dom";
import { SkeletonCard } from "src/components/cards/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { actionProducts } from "src/redux/reducers";
import { toast } from "sonner";
import { FilterProducts } from "./FilterProducts";

const TAKE_PRODUCTS = 28;
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
  const { page } = useParams();
  const { totalPages, filters } = useSelector((state) => state.product);

  useEffect(() => {
    if (!parseInt(page)) navigate("/productos/1");
  }, [page]);

  function handleChangePage(page) {
    navigate("/productos/" + page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <header className="relative hidden min-h-[400px] flex-col items-center justify-center gap-2 bg-signIn bg-contain bg-bottom pt-16 text-white shadow-medium before:absolute before:inset-0 before:z-10 before:bg-black/50  before:content-[''] sm:flex">
        <h1 className="z-20 font-primary text-5xl font-bold uppercase ">Productos</h1>
        <p className="z-20 font-secondary text-3xl">Encontra todo lo que necesites...</p>
      </header>
      <main className="flex gap-x-4  bg-[#D9D9D9] p-1">
        <article className="mx-auto my-10 hidden border-r-2 p-6 font-secondary md:block">
          <h2 className="mb-4 text-lg font-semibold">CATEGORIA DE PRODUCTOS</h2>
          <ul>
            {categories.map((cat) => (
              <li key={cat} className={cat === filters.category && "font-semibold"}>
                {cat}
              </li>
            ))}
          </ul>
        </article>
        <section className="my-10 grid flex-1 grid-cols-1 place-items-center gap-y-8   ">
          <Heading />
          <ProductsView />
          {totalPages !== 1 && (
            <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
              <PaginationComponent qty={totalPages} page={parseInt(page)} onChange={handleChangePage} />
            </div>
          )}
        </section>
      </main>
    </>
  );
}

function ProductsView() {
  const dispatch = useDispatch();
  const { page } = useParams();
  const [loading, setLoading] = useState(false);
  const { products, search } = useSelector((state) => state.product);

  useEffect(() => {
    setLoading(true);
    if (products[page]) setLoading(false);
    else {
      APISpot.product
        .getAll({ page, search: !search.length ? null : search })
        .then(({ data }) => {
          dispatch(actionProducts.setTotalPages(data.metadata.total_pages));
          dispatch(actionProducts.setPageProducts({ page, products: data.rows }));
          setLoading(false);
        })
        .catch(({ response }) => {
          setLoading(false);
          dispatch(actionProducts.setSearch(""));
          toast.error(response.data.message);
        });
    }
  }, [page, search]);

  if (loading || !products[page]) {
    const fake = new Array(TAKE_PRODUCTS).fill(null).map((_x, i) => "fake-card-" + (i + 1));
    return fake.map((fake) => <SkeletonCard key={fake} />);
  }

  return (
    <div className="grid w-[90%] grid-cols-2  gap-4  p-2 lg:w-full lg:grid-cols-3">
      {products[page].map((p, index) => (
        <ProductCard {...p} key={index} />
      ))}
    </div>
  );
}

function Heading() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [_search, set_Search] = useState("");
  const { search } = useSelector((state) => state.product);

  useEffect(() => {
    set_Search(search);
  }, [search]);

  function handleChange({ target }) {
    let value = target.value.trimStart();
    set_Search(value);
  }

  function handleSearch({ code }) {
    if (code === "Enter" && _search.length) {
      dispatch(actionProducts.setSearch(_search));
      dispatch(actionProducts.resetPageProducts());
      navigate("/productos/1");
    }
  }

  function onClear() {
    if (search !== "") {
      dispatch(actionProducts.setSearch(""));
      dispatch(actionProducts.resetPageProducts());
      navigate("/productos/1");
    }
    set_Search("");
  }
  return (
    <>
      <div d className=" mb-5 flex w-full items-center gap-1 sm:col-span-2 md:w-10/12 lg:col-span-3 xl:col-span-4">
        <Input
          value={_search}
          onChange={handleChange}
          onKeyDown={handleSearch}
          isClearable
          radius="full"
          className=""
          labelPlacement=""
          onClear={onClear}
          onBlur={() => {
            if (_search.length && search !== _search) {
              toast.info('Presiona "Enter" para buscar');
            }
            if (!_search.length && search !== _search) {
              dispatch(actionProducts.resetPageProducts());
              dispatch(actionProducts.setSearch(""));
            }
          }}
          placeholder="Buscar producto"
          startContent={<i className="ri-search-line scale-125"></i>}
        />
        <FilterProducts categories={categories} />
      </div>
    </>
  );
}
