/* eslint-disable */
import React, { useCallback, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Spinner } from "@nextui-org/react";
import { APISpot } from "src/api";
import { toast } from "sonner";
import { DefaultButton } from "src/components";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";

const clients_columns = [
  { label: "ID", key: "id" },
  { label: "Razón Social", key: "socialReason" },
  { label: "Nombre Fantasía", key: "fantasyName" },
  { label: "Dirección", key: "address" },
  { label: "Dirección Comercial", key: "businessAdress" },
  { label: "Teléfono Celular", key: "celphone" },
  { label: "CUIT", key: "cuit" },
  { label: "Lista de Precios", key: "priceList" },
  { label: "Email", key: "email" },
  { label: "Condición de Venta", key: "sellCondition" },
  { label: "Activo", key: "active" },
  { label: "Puede Ver", key: "canSee" },
  { label: "Primera Conexión", key: "firstSignIn" },
  { label: "Rol Web", key: "web_role" },
];

export function ClientsPage() {
  const navigate = useNavigate();
  const clients = useLoaderData();

  const { page } = useParams();
  const [loading, setLoading] = useState(false);

  console.log(clients);

  const hasMore = page < 14;

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "id":
        return (
          <p className="bg-gradient-to-r from-dark to-yellow-700 bg-clip-text font-bold text-transparent">
            {cellValue}
          </p>
        );

      default:
        return cellValue;
    }
  }, []);

  const renderCol = useCallback((key, label) => {
    switch (key) {
      default:
        return <p className="text-center">{label}</p>;
    }
  }, []);

  return (
    <main className="flex flex-col items-center">
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
        <TableHeader columns={clients_columns}>
          {(column) => (
            <TableColumn key={column.key} className="text-sm uppercase !text-dark">
              {renderCol(column.key, column.label)}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={clients}
          isLoading={loading}
          loadingContent={
            <Spinner color="primary" size="lg" className="z-20 aspect-square h-40 rounded-2xl bg-dark/60" />
          }
        >
          {(item) => (
            <TableRow key={item.codigo}>
              {(columnKey) => <TableCell className="relative font-medium">{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div>
        {page > 1 && (
          <DefaultButton
            startContent={<i className="ri-arrow-left-s-fill text-xl" />}
            className={"mx-auto mt-10 hover:scale-100"}
            as={Link}
            to={`/dashboard/clientes/${Number(page) - 1}`}
          >
            ANTERIOR
          </DefaultButton>
        )}
        {hasMore && (
          <DefaultButton
            endContent={<i className="ri-arrow-right-s-fill text-xl" />}
            className={"mx-auto mt-10 hover:scale-100"}
            as={Link}
            to={`/dashboard/clientes/${Number(page) + 1}`}
          >
            SIGUENTE
          </DefaultButton>
        )}
      </div>
    </main>
  );
}
