import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ProductCard } from "src/components/index";
import { PaginationComponent } from "components/index";

export function Products() {
  const products = useLoaderData();

  return (
    <main className="grid w-full place-items-center p-10">
      <PaginationComponent qty={products.length} />
      <section className="grid w-full grid-cols-2">
        {products.map((p, index) => (
          <ProductCard product={p} key={index} />
        ))}
      </section>
    </main>
  );
}
