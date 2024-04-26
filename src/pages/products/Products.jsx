import { ProductCard } from "src/components/index";
import { PaginationComponent } from "components/index";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { APISpot } from "src/api";
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import { SkeletonCard } from "src/components/cards/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { actionProducts } from "src/redux/reducers";
import { toast } from "sonner";
import { FilterProducts } from "./FilterProducts";
const TAKE_PRODUCTS = 28;

export function Products() {
  const navigate = useNavigate();
  const categories = useRouteLoaderData("root");
  const { page } = useParams();
  const { totalPages, filters } = useSelector((state) => state.product);

  useEffect(() => {
    if (!parseInt(page)) navigate("/productos/1");
  }, [page]);

  function handleChangePage(page) {
    navigate("/productos/" + page);
  }

  return (
    <>
      <header className="relative hidden min-h-[400px] flex-col items-center justify-center gap-2 bg-signIn bg-contain bg-bottom pt-16 text-white shadow-medium before:absolute before:inset-0 before:z-10 before:bg-black/50  before:content-[''] sm:flex">
        <h1 className="z-20 font-primary text-5xl font-bold uppercase ">Productos</h1>
        <p className="z-20 font-secondary text-3xl">Encontra todo lo que necesites...</p>
      </header>
      <main className="flex gap-x-4 bg-[#D9D9D9] p-10">
        <article className="my-10 hidden pl-5 font-secondary md:block">
          <h2 className="text-lg font-semibold ">Categoria de Productos</h2>
          <ul className="pl-4">
            {categories.map((cat, i) => (
              <li key={i} className={cat.value.toString() === filters.category && "font-semibold"}>
                {cat.name}
              </li>
            ))}
          </ul>
        </article>
        <section className="my-10 grid flex-1 grid-cols-1 place-items-center gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Heading categories={categories} />
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
  const { products, search, filters } = useSelector((state) => state.product);

  useEffect(() => {
    setLoading(true);
    if (products[page]) setLoading(false);
    else {
      const { order, category } = filters;
      const productsQuery = { page, take: TAKE_PRODUCTS, search: !search.length ? null : search, order, category };

      APISpot.product
        .getAll(productsQuery)
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
  }, [page, search, filters]);

  if (loading || !products[page]) {
    const fake = new Array(TAKE_PRODUCTS).fill(null).map((_x, i) => "fake-card-" + (i + 1));
    return fake.map((fake) => <SkeletonCard key={fake} />);
  }

  return (
    <>
      {" "}
      {products[page].map((p, index) => (
        <ProductCard {...p} key={index} />
      ))}
    </>
  );
}

function Heading({ categories }) {
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
