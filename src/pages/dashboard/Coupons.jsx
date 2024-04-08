/* eslint-disable */
import React, { useCallback, useEffect, useState } from "react";
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
import { copyToClipboard } from "src/utils";

const columns = [
  { label: "codigo", key: "name" },
  { label: "descuento", key: "discountPercentaje" },
  { label: "estado", key: "enabled" },
  { label: "eliminar", key: "eliminar" },
];

export function Coupons() {
  const coupons = useLoaderData();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { onOpen, onOpenChange, isOpen, onClose } = useDisclosure();

  useEffect(() => {
    //? Para que se actualicen luego de crearlos
    navigate();
  }, [onOpenChange]);

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "eliminar":
        return (
          <div className="flex justify-center">
            <Tooltip content={"Eliminar cupon"} delay={1000} color="primary">
              <i
                onClick={() =>
                  toast.info("¿Seguro quieres eliminar este cupon?", {
                    position: "top-center",
                    duration: 10000,
                    action: { label: "CONFIRMAR", onClick: () => handleRemoveCoupon(item.id) },
                  })
                }
                className={`ri-delete-bin-line icons bg-gradient-to-r from-primary to-yellow-600 bg-clip-text text-center
                text-xl font-bold text-transparent transition hover:from-red-600 hover:to-red-600`}
              />
            </Tooltip>
          </div>
        );
      case "enabled":
        return (
          <div className="flex justify-center">
            <Tooltip content={cellValue ? "Desactivar cupon" : "Activar cupon"} delay={1000} color="primary">
              <i
                onClick={() => handleToggleState(item.id)}
                className={`${
                  cellValue
                    ? "ri-eye-fill bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent"
                    : "ri-eye-close-line bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent"
                } icons text-center text-xl font-bold`}
              />
            </Tooltip>
          </div>
        );
      case "discountPercentaje":
        return <p className="font-bold">{`${cellValue}%`}</p>;
      case "name":
        const color = item.enabled ? "bg-green-500" : "bg-red-500";
        return (
          <div className="flex items-center gap-2 font-semibold">
            <div className={`h-2 w-2 rounded-full shadow-xl ${color}`} />
            <p>
              {`${cellValue}`}
              <i
                className="ri-file-copy-line icons ml-4 bg-gradient-to-r from-primary to-yellow-600 bg-clip-text text-xl text-transparent"
                onClick={() => copyToClipboard(cellValue)}
              />
            </p>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  const renderCol = useCallback((key, label) => {
    switch (key) {
      case "eliminar":
        return <p className="text-center">{label}</p>;
      case "enabled":
        return <p className="text-center">{label}</p>;
      default:
        return <p>{label}</p>;
    }
  }, []);

  const handleToggleState = async (coupon_id) => {
    //? Logica para alternar la propiedad `estado` de un cupon
    try {
      setLoading(true);
      const res = await APISpot.dashboard.toggleStateCoupon(coupon_id);
      if (res) {
        toast.success("Cupon editado con exito");
      }
    } catch (e) {
      console.log(e);
      toast.error("Hubo un error al editar el cupon", {
        description: e.message || "Por favor, intentalo nuevamente",
      });
    } finally {
      setLoading(false);
      navigate(); //? Para refrescar la data
    }
  };

  const handleRemoveCoupon = async (coupon_id) => {
    //? Logica para eliminar un cupon
    try {
      setLoading(true);
      const res = await APISpot.dashboard.removeCoupon(coupon_id);
      if (res) {
        toast.success("Cupon eliminado con exito");
      }
    } catch (e) {
      console.log(e);
      toast.error("Hubo un error al eliminar el cupon", {
        description: e.message || "Por favor, intentalo nuevamente",
      });
    } finally {
      setLoading(false);
      navigate(); //? Para refrescar la data
    }
  };

  return (
    <>
      <Table
        aria-label="Example table with custom cells"
        isStriped
        removeWrapper
        isHeaderSticky
        bottomContent={
          <DefaultButton
            className={"text-md mx-auto mt-10"}
            onPress={() => onOpen()}
            endContent={<i className="ri-add-line text-md" />}
          >
            CREAR CUPON
          </DefaultButton>
        }
        classNames={{
          th: "bg-primary",
          base: "overflow-y-scroll rounded-md max-h-[800px] backdrop-blur-sm",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} className="text-sm uppercase !text-dark">
              {renderCol(column.key, column.label)}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={coupons}
          isLoading={loading}
          loadingContent={
            <Spinner color="primary" size="lg" className="z-20 aspect-square h-40 rounded-2xl bg-dark/60" />
          }
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell className="relative">{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isOpen && <CreateNewCouponModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />}
    </>
  );
}

function CreateNewCouponModal({ isOpen, onOpenChange, onClose }) {
  //TODO VALIDAR ESTE FORM
  const [loading, setLoading] = useState(false);
  const [thisCoupon, setThisCoupon] = useState({ name: "", discountPercentaje: "" });

  const handleCreateCoupon = async (e) => {
    //? Logica para crear un cupon
    e.preventDefault();
    setLoading(true);

    try {
      const res = await APISpot.dashboard.createCoupon({
        name: thisCoupon.name.trim(),
        discountPercentaje: Number(thisCoupon.discountPercentaje),
      });
      if (res) {
        toast.success("Cupon creado con exito");
      }
    } catch (e) {
      console.log(e);
      toast.error("Hubo un error al crear el cupon", {
        description: e.message || "Por favor, intentalo nuevamente",
      });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <DarkModal
      isDismissable={false}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={`CREAR UN NUEVO CUPON DE DESCUENTO`}
      size="xl"
      description={"En esta pantalla podras agregar un nuevo cupon de descuento"}
    >
      <form onSubmit={handleCreateCoupon} className="my-4 flex flex-col items-center gap-6">
        <BasicInput
          label={"Codigo"}
          name={"name"}
          startContentIcon={"ri-text font-bold text-xl"}
          onChange={(e) => setThisCoupon({ ...thisCoupon, [e.target.name]: e.target.value.toUpperCase() })}
          value={thisCoupon.name}
        />
        <BasicInput
          type="number"
          label={"Descuento (1-100)"}
          name={"discountPercentaje"}
          startContentIcon={"ri-percent-line font-bold text-xl"}
          onChange={(e) => setThisCoupon({ ...thisCoupon, [e.target.name]: e.target.value.trim() })}
          value={thisCoupon.discountPercentaje}
        />

        <div className="flex items-center justify-center gap-1">
          <DefaultButton
            type="submit"
            endContent={<i className="ri-coupon-line text-xl" />}
            className={"hover:scale-100"}
            isLoading={loading}
          >
            CREAR
          </DefaultButton>
          <Tooltip
            content="Los cambios no se aplicaran hasta que presione CREAR"
            delay={200}
            color="primary"
            placement="right"
          >
            <i className="ri-information-line yellowGradient icons text-xl hover:cursor-help" />
          </Tooltip>
        </div>
      </form>
    </DarkModal>
  );
}
