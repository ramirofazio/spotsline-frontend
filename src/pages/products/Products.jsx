import { ProductCard } from "src/components/index";
import { PaginationComponent } from "components/index";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { APISpot } from "src/api";
import { useNavigate, useParams, useRouteLoaderData, useSearchParams } from "react-router-dom";
import { SkeletonCard } from "src/components/cards/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { actionProducts } from "src/redux/reducers";
import { toast } from "sonner";
import { FilterProducts } from "./FilterProducts";
import { images } from "src/assets";
import { AnimatePresence, motion } from "framer-motion";
import { onViewFadeIn } from "src/styles/framerVariants";
import PageSimpleHeader from "src/components/PageHeader";

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <PageSimpleHeader
        image={images.empresaMachines}
        title={"NUESTROS PRODUCTOS"}
        subtitle={"Descubre nuestros productos"}
      />
      <main className="flex gap-x-4 bg-[#D9D9D9] p-10">
        <article className="my-10 hidden pl-5 font-secondary md:inline">
          <h2 className="text-xl font-semibold">Categorías de Productos</h2>
          <ul className="text-md mt-6 flex flex-col gap-2 pl-4 text-dark/80">
            {categories.map((cat, i) => (
              <li
                key={i}
                className={cat.value.toString() === filters.category.toString() && "animate-pulse font-bold "}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </article>

        <section className="mx-auto  my-10 gap-3  lg:grid-cols-3 xl:grid-cols-4">
          <Heading categories={categories} />
          {totalPages !== 1 && (
            <div className=" mx-auto w-fit lg:col-span-3 xl:col-span-4">
              <PaginationComponent qty={totalPages} page={parseInt(page)} onChange={handleChangePage} />
            </div>
          )}
          <ProductsView />
          {totalPages !== 1 && (
            <div className=" mx-auto w-fit lg:col-span-3 xl:col-span-4">
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
  let [searchParams, setSearchParams] = useSearchParams();

  console.log(products);
  
  useEffect(() => {
    setLoading(true);
    if (products[page]) setLoading(false);
    else {
      let { order, category } = filters;
      if (searchParams) {
        const queryCategory = searchParams.get("category");
        if (queryCategory) {
          category = parseInt(queryCategory);
          dispatch(actionProducts.setCategory(category));
        }
      }

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
    return (
      <div className="grid w-full grid-cols-2 gap-8 p-2 lg:w-full lg:grid-cols-3">
        {Array.from({ length: 12 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <AnimatePresence key={page} mode="wait">
      <motion.div {...onViewFadeIn()} className="grid w-full grid-cols-2 gap-8 p-2 lg:w-full lg:grid-cols-3">
        {products[page].map((p, index) => (
          <ProductCard {...p} key={index} />
        ))}
      </motion.div>
    </AnimatePresence>
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
      <div d className="mb-5 flex w-full items-center gap-1 sm:col-span-2 md:w-full lg:col-span-3 xl:col-span-4">
        <Input
          value={_search}
          onChange={handleChange}
          onKeyDown={handleSearch}
          isClearable
          radius="full"
          className="md:w-[80%]"
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
