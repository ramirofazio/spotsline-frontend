import { ProductCard } from "src/components/index";
import { PaginationComponent } from "components/index";
import { Input } from "@nextui-org/react";
import { Suspense, useEffect, useState } from "react";
import { APISpot } from "src/api";
import { useLoaderData, useNavigate, useParams, Link } from "react-router-dom";
import { SkeletonCard } from "src/components/cards/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { actionProducts } from "src/redux/reducers";
import { toast } from "sonner";
import { FilterProducts } from "./FilterProducts";

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

export function ProductsBody() {
  let a = useLoaderData();
  console.log(a);
  let totalPages = 3;
  return (
    <section className="my-10 grid flex-1 grid-cols-1 place-items-center gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <Heading />
      <h1>Esto cargooo</h1>
      {/* <ProductsView _products={a.rows} /> */}
      {totalPages !== 1 && (
        <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
          <PaginationComponent qty={totalPages} page={parseInt("2")} onChange={() => console.log("change")} />
        </div>
      )}
    </section>
  );
}

function ProductsView({ _products }) {
  const dispatch = useDispatch();
  const { page } = useParams();
  const [loading, setLoading] = useState(false);
  const { products, search } = useSelector((state) => state.product);
  console.log("desde view", _products);
  // useEffect(() => {
  //   setLoading(true);
  //   if (products[page]) setLoading(false);
  //   else {
  //     APISpot.product
  //       .getAll({ page, take: TAKE_PRODUCTS, search: !search.length ? null : search })
  //       .then(({ data }) => {
  //         console.log("component", data);
  //         dispatch(actionProducts.setTotalPages(data.metadata.total_pages));
  //         dispatch(actionProducts.setPageProducts({ page, products: data.rows }));
  //         setLoading(false);
  //       })
  //       .catch(({ response }) => {
  //         setLoading(false);
  //         dispatch(actionProducts.setSearch(""));
  //         toast.error(response.data.message);
  //       });
  //   }
  // }, [page, search]);

  // if (loading || !products[page]) {
  //   const fake = new Array(TAKE_PRODUCTS).fill(null).map((_x, i) => "fake-card-" + (i + 1));
  //   return fake.map((fake) => <SkeletonCard key={fake} />);
  // }

  return (
    <>
      {" "}
      {_products.map((p, index) => (
        <ProductCard {...p} key={index} />
      ))}
    </>
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
            // console.log(_search, search);
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
