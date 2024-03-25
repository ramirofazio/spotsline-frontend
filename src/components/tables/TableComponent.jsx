import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

export function TableComponent({ cols, rows }) {
  return (
    <Table
      isHeaderSticky
      isStriped
      aria-label="dashboard-products-table"
      classNames={{
        th: "bg-gradient-to-b from-primary to-white",
        base: "overflow-y-scroll max-h-[700px]",
      }}
    >
      <TableHeader>
        {cols.map((text, index) => (
          <TableColumn key={index} className="uppercase !text-dark">
            {text}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {rows.map((el, index) => {
          return (
            <TableRow key={index}>
              {Array.from(Object.values(el).map((el, index) => <TableCell key={index}>{el}</TableCell>))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
