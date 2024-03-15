export function formatPrices(price) {
  return price.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
}
export function convertISOToDate(isoDate) {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}
