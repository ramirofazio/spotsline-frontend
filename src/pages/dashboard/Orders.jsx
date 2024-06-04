/* eslint-disable */
import React, { useCallback } from "react";
import { useLoaderData } from "react-router-dom";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { convertISOToDate, copyToClipboard } from "src/utils";
import { AnimatePresence, motion } from "framer-motion";
import { onViewZoomIn } from "src/styles/framerVariants";

export function Orders() {
  const orders = useLoaderData();

  const orders_columns = [
    { label: "Codigo", key: "id" },
    { label: "Email", key: "email" },
    { label: "Nombre", key: "name" },
    { label: "Total", key: "total" },
    { label: "Subtotal", key: "subtotal" },
    { label: "Descuento", key: "discount" },
    { label: "Fecha de emisión", key: "date" },
  ];

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
      case "id":
        return (
          <span className="flex min-w-[200px] items-center  gap-1 ">
            <p className=" w-full bg-gradient-to-r  from-dark to-yellow-700 bg-clip-text font-bold text-transparent">
              {cellValue}
            </p>
            <i
              className="ri-file-copy-line icons  bg-gradient-to-r from-primary to-yellow-600 bg-clip-text text-xl text-transparent"
              onClick={() => copyToClipboard(cellValue)}
            />
          </span>
        );
      case "email":
        return <p className="uppercase">{cellValue}</p>;
      case "name":
        return <p className="min min-w-[150px] uppercase">{cellValue}</p>;
      case "total":
        return <p className="uppercase">${cellValue}</p>;
      case "subtotal":
        return <p className="uppercase">${cellValue}</p>;

      case "discount":
        return (
          <p className={`uppercase ${cellValue ? "text-md text-green-600" : "text-xs text-red-600"} `}>
            {cellValue ? `%${cellValue}` : "no dispone"}
          </p>
        );

      case "date":
        return <p className="">{convertISOToDate(cellValue)}</p>;

      default:
        return cellValue;
    }
  }, []);

  const renderCol = useCallback((key, label) => {
    switch (key) {
      default:
        return <p>{label}</p>;
    }
  }, []);

  return (
    <AnimatePresence key={"dashboard-clients"} mode="wait">
      <motion.main {...onViewZoomIn} className="flex flex-col items-center">
        <Table
          aria-label="Example table with custom cells"
          isStriped
          removeWrapper
          isHeaderSticky
          className="!z-20"
          classNames={{
            th: "bg-gradient-to-b from-primary to-yellow-600",
            base: "overflow-y-scroll rounded-md min-h-[600px] max-h-[600px] backdrop-blur-sm",
          }}
        >
          <TableHeader columns={orders_columns}>
            {(column) => (
              <TableColumn key={column.key} className="text-sm uppercase !text-dark">
                {renderCol(column.key, column.label)}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={orders}>
            {(item) => (
              <TableRow key={item.codigo}>
                {(columnKey) => <TableCell className="relative font-medium">{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.main>
    </AnimatePresence>
  );
}
