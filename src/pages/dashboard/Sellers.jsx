/* eslint-disable */
import React, { useCallback, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { APISpot } from "src/api";
import { toast } from "sonner";
import { BasicInput, DarkModal, DefaultButton } from "src/components";
import { useLoaderData, useNavigate } from "react-router-dom";
import { isValidEmail } from "src/utils/validation";

const sellers_columns = [
  { label: "Codigo", key: "sellerId" },
  { label: "Email", key: "email" },
  { label: "nombre", key: "name" },
];

export function SellersPage() {
  const navigate = useNavigate();
  const sellers = useLoaderData();

  const [loading, setLoading] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState([]);

  const { onOpen, onOpenChange, isOpen, onClose } = useDisclosure();

  const handleModal = (seller) => {
    onOpen();
    setSelectedSeller(seller);
  };

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "codigo":
        const color = Boolean(item.email) ? "bg-green-500" : "bg-red-500";
        return (
          <div className="flex items-center gap-2">
            <Tooltip
              color="primary"
              delay={200}
              content={color ? "Este seller NO tiene un Email valido" : "Este seller tiene un Email valido"}
            >
              <div className={`h-2 w-2 rounded-full shadow-xl ${color}`} />
            </Tooltip>
            <p className="bg-gradient-to-r from-dark to-yellow-700 bg-clip-text font-bold text-transparent">
              {cellValue}
            </p>
          </div>
        );
      case "email":
        if (Boolean(cellValue)) {
          return (
            <div className="flex items-center gap-2">
              <p className="uppercase">{cellValue.split(";")[0]}</p>
              <Tooltip content={"Editar"} delay={1000} color="primary">
                <i className="ri-pencil-line icons yellowGradient text-xl" onClick={() => handleModal(item)} />
              </Tooltip>
            </div>
          );
        } else {
          return (
            <Tooltip content={"Agregar Email a este seller"} delay={1000} color="primary">
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
            <Tooltip content={cellValue ? "Sellere activo" : "Sellere Inactivo"} delay={1000} color="primary">
              <i
                className={`${
                  Boolean(cellValue)
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

  const renderCol = useCallback((key, label) => {
    switch (key) {
      default:
        return <p>{label}</p>;
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
        <TableHeader columns={sellers_columns}>
          {(column) => (
            <TableColumn key={column.key} className="text-sm uppercase !text-dark">
              {renderCol(column.key, column.label)}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={sellers}
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

      {isOpen && selectedSeller && (
        <AddEmailModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={onClose}
          seller={selectedSeller}
          navigate={navigate}
        />
      )}
    </main>
  );
}

function AddEmailModal({ isOpen, onOpenChange, onClose, seller, navigate }) {
  const [email, setEmail] = useState(seller.email);
  const [errs, setErrs] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target }) => {
    setEmail(() => {
      setErrs(isValidEmail(target.value));
      return target.value;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await APISpot.dashboard.addSellerEmail({ sellerId: seller.id, newEmail: email.trim() });

      if (res === 200) {
        toast.success("Email agregado con exito");
      }
    } catch (e) {
      console.log(e);
      toast.error("Hubo un error, por favor intentalo de nuevo.", { description: e.response.data.message });
    } finally {
      navigate();
      setLoading(false);
      onClose();
    }
  };
  return (
    <DarkModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={`AGREGA EMAIL A ${seller.name}`}
      size="xl"
      description={"En esta pantalla podras agregar Emails a los sellers que no lo tienen"}
    >
      <form
        className={`z-20 mx-auto flex w-80 flex-col items-center justify-start gap-10`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <BasicInput
          name="email"
          type="email"
          label="Correo electrónico"
          value={email}
          isInvalid={Boolean(errs)}
          errorMessage={errs}
          startContentIcon={"ri-mail-fill text-xl"}
          onChange={handleChange}
        />

        <DefaultButton
          type="submit"
          endContent={<i className="ri-mail-add-line text-xl" />}
          className={"hover:scale-100"}
          isDisabled={Boolean(errs)}
          isLoading={loading}
        >
          AGREGAR
        </DefaultButton>
      </form>
    </DarkModal>
  );
}
