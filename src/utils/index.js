export function formatPrices(price) {
  return price.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
}
