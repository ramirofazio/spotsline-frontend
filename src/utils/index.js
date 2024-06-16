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

export function formatDescription(description) {
  // Utilizamos una expresión regular para dividir el texto en propiedades y valores
  let properties = description.split(/(?<!\d)(?<!Ø):/); // Dividimos por ":" asegurando que no se divida en casos como "Ø:"

  let formattedText = "";

  // Iteramos sobre las propiedades para formatear cada una de ellas
  for (let i = 0; i < properties.length - 1; i++) {
    // El siguiente elemento es la descripción hasta el siguiente ':'
    let nextProperty = properties[i + 1].trim();

    // Encontramos el índice de la siguiente propiedad (nombre)
    let nextIndex = nextProperty.search(/ [A-ZÑÁÉÍÓÚ]{2,}/);

    // Si se encuentra una propiedad válida, la separamos
    if (nextIndex !== -1) {
      formattedText += `<strong>${properties[i].trim()}:</strong> ${nextProperty.slice(0, nextIndex).trim()}<br>`;
      properties[i + 1] = nextProperty.slice(nextIndex).trim();
    } else {
      // Si no hay más propiedades, añadimos el resto del texto
      formattedText += `<strong>${properties[i].trim()}:</strong> ${nextProperty.trim()}<br>`;
    }
  }

  return formattedText.trim();
}
