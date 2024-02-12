import { useLoaderData } from "react-router-dom";
import { ProductCard } from "src/components/index";
import { PaginationComponent } from "components/index";

export function Products() {
  const products = useLoaderData();

  return (
    <main className="grid w-full place-items-center bg-[#D9D9D9] p-10">
      <PaginationComponent qty={products.length} />
      <section className="space-y-3">
        {products.map((p, index) => (
          <ProductCard {...p} key={index} />
        ))}
      </section>
    </main>
  );
}
