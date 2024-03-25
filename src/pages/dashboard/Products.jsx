import React from "react";
import { TableComponent } from "src/components";

const mockProducts = [
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
  { nroCli: 9999, name: "Articulo Spotsline", price: 9999, stock: 20, images: "foto1 - foto2 - foto3", visible: true },
];

export function Products() {
  return <TableComponent cols={["id", "nombre", "precio", "stock", "imagenes", "visible"]} rows={mockProducts} />;
}
