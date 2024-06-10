import { toast } from "sonner";

export function formatPrices(price) {
  return Math.floor(price).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
}
export function convertISOToDate(isoDate) {
  return new Date(isoDate).toLocaleDateString();
}

export function copyToClipboard(text) {
  toast.info("Se copio en portapapeles");
  navigator.clipboard.writeText(text).catch((e) => {
    console.log(e);
  });
}
