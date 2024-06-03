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
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { isValidEmail } from "src/utils/validation";
import { AnimatePresence, motion } from "framer-motion";
import { onViewZoomIn } from "src/styles/framerVariants";

const clients_columns = [
  { label: "CUIT", key: "cuit" },
  { label: "Email", key: "email" },
  { label: "Razón Social", key: "socialReason" },
  { label: "Dirección", key: "address" },
  { label: "Dirección Comercial", key: "businessAdress" },
  { label: "Teléfono Celular", key: "celphone" },
  { label: "Lista de Precios", key: "priceList" },
  { label: "Activo", key: "active" },
];

export function ClientsPage() {
  const navigate = useNavigate();
  const clients = useLoaderData();
  const { page } = useParams();
  const hasMore = page < 14;

  const [loading, setLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState([]);

  const { onOpen, onOpenChange, isOpen, onClose } = useDisclosure();

  const handleModal = (client) => {
    onOpen();
    setSelectedClient(client);
  };

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "cuit":
        const color = Boolean(item.email) ? "bg-green-500" : "bg-red-500";
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
        if (Boolean(cellValue)) {
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
              <Spinner color="secondary" size="lg" className="z-20 aspect-square h-40 rounded-2xl bg-dark/60" />
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
        {isOpen && selectedClient && (
          <AddEmailModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={onClose}
            client={selectedClient}
            navigate={navigate}
          />
        )}
      </motion.main>
    </AnimatePresence>
  );
}

function AddEmailModal({ isOpen, onOpenChange, onClose, client, navigate }) {
  const [email, setEmail] = useState(client.email);
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
      const res = await APISpot.dashboard.addClientEmail({ clientId: client.id, newEmail: email.trim() });

      if (res === 200) {
        toast.success("Email agregado con exito");
      }
    } catch (e) {
      toast.error("Hubo un error, por favor intentalo de nuevo.", { description: e.response.data.message });
      console.log(e);
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
      title={`AGREGA EMAIL A ${client.socialReason}`}
      size="xl"
      description={"En esta pantalla podras agregar Emails a los clientes que no lo tienen"}
    >
      <main className="flex w-full flex-col items-center justify-center">
        <form className={`z-20 flex flex-col items-center justify-start gap-10`} onSubmit={(e) => handleSubmit(e)}>
          <BasicInput
            name="email"
            type="email"
            label="Correo electrónico"
            isInvalid={Boolean(errs)}
            errorMessage={errs}
            startContentIcon={"ri-mail-fill text-xl"}
            onChange={handleChange}
          />

          <DefaultButton
            type="submit"
            endContent={<i className="ri-mail-add-line text-xl" />}
            className={"hover:scale-100"}
            isLoading={loading}
          >
            AGREGAR
          </DefaultButton>
        </form>
      </main>
    </DarkModal>
  );
}
