import React, { useCallback } from "react";
import { useLoaderData } from "react-router-dom";

export function Orders() {
  const orders = useLoaderData();

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "cuit":
        const color = item.email ? "bg-green-500" : "bg-red-500";
        return (
          <div className="flex items-center gap-2">
            <Tooltip
              color="primary"
              delay={200}
              content={color ? "Este cliente NO tiene un Email valido" : "Este cliente tiene un Email valido"}
            >
              <div className={`h-2 w-2 rounded-full shadow-xl ${color}`} />
            </Tooltip>
            <p className="bg-gradient-to-r from-dark to-yellow-700 bg-clip-text font-bold text-transparent">
              {cellValue}
            </p>
          </div>
        );
      case "email":
        if (cellValue) {
          return <p className="uppercase">{cellValue.split(";")[0]}</p>;
        } else {
          return (
            <Tooltip content={"Agregar Email a este cliente"} delay={1000} color="primary">
              <div
                className="icons w-full rounded-md border-2 border-primary/80 text-center"
                onClick={() => handleModal(item)}
              >
                <i className={`ri-add-line text-xl font-bold`} />
              </div>
            </Tooltip>
          );
        }

      case "active":
        return (
          <div className="flex justify-center">
            <Tooltip content={cellValue ? "Cliente activo" : "Cliente Inactivo"} delay={1000} color="primary">
              <i
                className={`${
                  cellValue
                    ? "ri-check-fill bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent"
                    : "ri-close-line bg-gradient-to-r from-dark to-yellow-600 bg-clip-text text-transparent"
                } icons text-center text-xl font-bold`}
              />
            </Tooltip>
          </div>
        );
      case "priceList":
        return <p className="text-center font-bold">{cellValue}</p>;

      default:
        return cellValue;
    }
  }, []);

  return (
    <div>
      {orders.map((o) => (
        <p key={o.id}>{o.id}</p>
      ))}
    </div>
  );
}
