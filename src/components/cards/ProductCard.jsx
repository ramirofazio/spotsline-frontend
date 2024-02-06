export function ProductCard({ product }) {
  const { name, price } = product;

  return (
    <article className="m-6 aspect-square bg-gray/50">
      <p>{name}</p>
      <p>price</p>
    </article>
  );
}
