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
  Image,
  Divider,
  Chip,
} from "@nextui-org/react";
import { formatPrices } from "src/utils";
import { APISpot } from "src/api";
import { toast } from "sonner";
import { DarkModal, DefaultButton } from "src/components";
import { useNavigate } from "react-router-dom";
import { useAsyncList } from "@react-stately/data";

const columns = [
  { label: "código", key: "id" },
  { label: "nombre", key: "name" },
  { label: "precio 1", key: "price1" },
  { label: "precio 2", key: "price2" },
  { label: "precio 3", key: "price3" },
  { label: "precio 4", key: "price4" },
  { label: "precio 5", key: "price5" },
  { label: "precio 6", key: "price6" },
  { label: "stock", key: "stock" },
  { label: "destacado", key: "featured" },
  { label: "incluido", key: "incluido" },
  { label: "imágenes", key: "images" },
];

const priceColumns = ["price1", "price2", "price3", "price4", "price5", "price6"];

export function Products() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();

  const { onOpen, onOpenChange, isOpen, onClose } = useDisclosure();

  const list = useAsyncList({
    async load({ signal }) {
      setLoading(true);
      const res = await APISpot.dashboard.getDashboardProducts(page, signal);

      if (!res.data) {
        throw new Error("Error al cargar los productos");
      }

      setLoading(false);
      setPage(page + 1);

      console.log(res.data);

      return {
        items: [] || res.data,
        cursor: page,
      };
    },
  });

  const hasMore = page < 6;

  const handleToggleFeatured = async (product_id) => {
    //? Logica para alternar la propiedad `featured` de un productos
    try {
      setLoading(true);
      const res = await APISpot.dashboard.toggleFeaturedProduct(product_id);
      if (res) {
        toast.success("Producto editado con exito");
      }
    } catch (e) {
      console.log(e);
      toast.error("Hubo un error al editar el producto", {
        description: e.message || "Por favor, intentalo nuevamente",
      });
    } finally {
      setLoading(false);
      navigate(); //? Para refrescar la data
    }
  };

  const handleToggleIncluido = async (product_id) => {
    //? Logica para alternar la propiedad `incluido` de un productos
    try {
      setLoading(true);
      const res = await APISpot.dashboard.toggleIncluidoProduct(product_id);
      if (res) {
        toast.success("Producto editado con exito");
      }
    } catch (e) {
      console.log(e);
      toast.error("Hubo un error al editar el producto", {
        description: e.message || "Por favor, intentalo nuevamente",
      });
    } finally {
      setLoading(false);
      navigate(); //? Para refrescar la data
    }
  };

  const handleClickImages = (item) => {
    onOpen();
    setSelectedProduct(item);
  };

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    if (priceColumns.includes(columnKey)) {
      return formatPrices(cellValue);
    }

    switch (columnKey) {
      case "id":
        return (
          <p className="bg-gradient-to-r from-dark to-yellow-600 bg-clip-text font-bold text-transparent">
            {cellValue}
          </p>
        );
      case "featured":
        return (
          <div className="flex justify-center">
            <Tooltip
              content={cellValue ? "Desmarcar como producto destacado" : "Marcar como producto destacado"}
              delay={1000}
              color="primary"
            >
              <i
                onClick={() => handleToggleFeatured(item.id)}
                className={`${
                  cellValue
                    ? "ri-star-fill bg-gradient-to-r from-primary to-yellow-600 bg-clip-text text-transparent"
                    : "ri-star-line bg-gradient-to-r from-dark to-yellow-600 bg-clip-text text-transparent"
                } icons text-center text-xl font-bold`}
              />
            </Tooltip>
          </div>
        );
      case "incluido":
        return (
          <div className="flex justify-center">
            <Tooltip
              content={cellValue ? "Dejar de mostrar en la web" : "Mostrar en la web"}
              delay={1000}
              color="primary"
            >
              <i
                onClick={() => handleToggleIncluido(item.id)}
                className={`${
                  cellValue
                    ? "ri-eye-line bg-gradient-to-r from-primary to-yellow-600 bg-clip-text text-transparent"
                    : "ri-eye-close-line bg-gradient-to-r from-dark to-yellow-600 bg-clip-text text-transparent"
                } icons text-xl font-bold`}
              />
            </Tooltip>
          </div>
        );
      case "images":
        return (
          <Tooltip content="Agregar imagenes al producto" delay={1000} color="primary">
            <div
              className="icons flex items-center justify-center gap-2 font-bold"
              onClick={() => handleClickImages(item)}
            >
              <p>{cellValue.split(" - ").length}</p>
              <i className="ri-image-line  bg-gradient-to-r from-primary to-yellow-600 bg-clip-text text-xl text-transparent" />
            </div>
          </Tooltip>
        );

      default:
        return cellValue;
    }
  }, []);

  const renderCol = useCallback((key, label) => {
    switch (key) {
      case "featured":
        return <p className="text-center">{label}</p>;
      case "incluido":
        return <p className="text-center">{label}</p>;
      case "images":
        return <p className="text-center">{label}</p>;
      default:
        return <p>{label}</p>;
    }
  }, []);

  return (
    <>
      <Table
        aria-label="Example table with custom cells"
        isStriped
        removeWrapper
        isHeaderSticky
        classNames={{
          th: "bg-primary",
          base: "overflow-y-scroll rounded-md max-h-[800px] backdrop-blur-sm",
        }}
        bottomContent={
          hasMore && (
            <DefaultButton
              isDisabled={list.isLoading}
              onPress={list.loadMore}
              endContent={<i className="ri-refresh-line" />}
              className={"mx-auto mt-10"}
            >
              CARGAR MAS
            </DefaultButton>
          )
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} className="text-sm uppercase !text-dark">
              {renderCol(column.key, column.label)}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={list.items} isLoading={loading} loadingContent={<Spinner color="secondary" />}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell className="relative">{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isOpen && (
        <ImagesModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} product={selectedProduct} />
      )}
    </>
  );
}

function ImagesModal({ isOpen, onOpenChange, onClose, product }) {
  //TODO VALIDAR MAXIMO DE FOTOS, CREO QUE 6 ESTARIA BIEN

  const [loading, setLoading] = useState(false);
  const [thisImages, setThisImages] = useState(product.images);

  const handleUpdateImages = async () => {
    //? Logica para actualizar la propiedad `images` de un producto
    try {
      setLoading(true);
      const res = await APISpot.dashboard.updateProductImages({ product_id: product.id, images: thisImages });
      if (res) {
        toast.success("Imagenes cargadas con exito");
      }
    } catch (e) {
      console.log(e);
      toast.error("Hubo un error al cargar las imagenes", {
        description: e.message || "Por favor, intentalo nuevamente",
      });
    } finally {
      setLoading(false);
      onClose();
      navigate(); //? Para refrescar la data
    }
  };

  const handleRemoveImage = (image) => {
    //? Logica para borrar una imagen
    let newImages = "";

    //? Este codigo raro es por como se almacenan en la DB.
    thisImages.split(" - ").map((_image) => {
      if (_image !== image) {
        if (newImages !== "") {
          newImages += ` - ${_image}`;
        } else {
          newImages += `${_image}`;
        }
      }
    });

    setThisImages(newImages);
  };

  return (
    <DarkModal
      isDismissable={false}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={`GESTIONA LAS IMAGENES DE ${product.name.toUpperCase()}`}
      size="4xl"
      description={"En esta pantalla podras agregar o eliminar fotos de cada producto"}
    >
      <main className="flex w-full flex-col items-center justify-between">
        <section className="grid h-full w-full grid-rows-3">
          <div className="row-span-2 flex flex-wrap items-center justify-center gap-3 p-6">
            {thisImages === "" ? (
              <p className="text-background">Este producto no tiene imagenes</p>
            ) : (
              thisImages.split(" - ").map((image, index) => (
                <div
                  key={index}
                  className="relative flex aspect-square h-[150px] items-center justify-center rounded-xl bg-background/50"
                >
                  <Tooltip content="Eliminar esta imagen" delay={1000} color="primary">
                    <Chip
                      className="text-md icons absolute right-2 top-1 z-20 flex aspect-square h-8 w-8 items-center justify-center rounded-full bg-primary text-dark"
                      onClick={() => handleRemoveImage(image)}
                    >
                      <i className="ri-close-fill text-xl" />
                    </Chip>
                  </Tooltip>
                  <Image src={image} width={200} height={200} alt={product?.name + " " + image} />
                </div>
              ))
            )}
          </div>
          <div className="relative row-span-1 flex items-center justify-center p-6">
            <Divider className="absolute inset-x-0 top-0 h-[3px] rounded-full bg-gradient-to-r from-primary to-yellow-200" />
            <input type="file" className="text-white" />
          </div>
        </section>

        <div className="flex items-center justify-center gap-1">
          <DefaultButton
            onPress={handleUpdateImages}
            endContent={<i className="ri-image-add-line text-xl" />}
            className={"hover:scale-100"}
            isLoading={loading}
          >
            GUARDAR
          </DefaultButton>
          <Tooltip
            content="Los cambios no se aplicaran hasta que presione GUARDAR"
            delay={200}
            color="primary"
            placement="right"
          >
            <i className="ri-information-line yellowGradient icons text-xl hover:cursor-help" />
          </Tooltip>
        </div>
      </main>
    </DarkModal>
  );
}
