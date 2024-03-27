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
  { label: "nombre", key: "description" },
  { label: "variantes", key: "variants qty" },
  { label: "destacado", key: "featured" },
  { label: "visiblidad", key: "incluido" },
  { label: "imágenes", key: "images" },
  //TODO VER COMO ACOMODAR ESTA DATA. ESTO ESTA EN LAS `variants`
  //   { label: "precio 1", key: "price1" },
  //   { label: "precio 2", key: "price2" },
  //   { label: "precio 3", key: "price3" },
  //   { label: "precio 4", key: "price4" },
  //   { label: "precio 5", key: "price5" },
  //   { label: "precio 6", key: "price6" },
  //   { label: "stock", key: "stock" },
];

const priceColumns = ["price1", "price2", "price3", "price4", "price5", "price6"];

export function Products() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState();
  const [selectedProduct, setSelectedProduct] = useState();

  const { onOpen, onOpenChange, isOpen, onClose } = useDisclosure();

  const hasMore = page < 6;
  if (!hasMore) {
    toast.info("No hay mas productos por cargar");
  }
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
        items: res.data,
        cursor: page,
      };
    },
  });

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

  const handleModal = (product, type) => {
    onOpen();
    setSelectedProduct(product);
    setModalType(type);
  };

  const renderCell = useCallback((item, columnKey) => {
    //TODO ACA HAY QUE ARMAR LAS LOGICAS PARA LAS VARIANTES CREO
    //? item.variants en el array de variantes, se puede jugar con eso
    const cellValue = item[columnKey];
    const variantsQty = item.variants.length;
    const includedVariantsQty = item.variants.filter((v) => v.incluido === true).length;

    if (priceColumns.includes(columnKey)) {
      return formatPrices(cellValue);
    }

    switch (columnKey) {
      case "variants qty":
        return item.variants.length;
      case "id":
        const color = includedVariantsQty === 0 ? "bg-red-500" : "bg-green-500";
        return (
          <div className="flex items-center gap-2">
            <Tooltip
              color="primary"
              delay={200}
              content={
                includedVariantsQty === 0
                  ? "Este producto NO se esta mostrando en la web"
                  : "Este producto se esta mostrando en la web"
              }
            >
              <div className={`h-2 w-2 rounded-full shadow-xl ${color}`} />
            </Tooltip>
            <p className="bg-gradient-to-r from-dark to-yellow-600 bg-clip-text font-bold text-transparent">
              {cellValue}
            </p>
          </div>
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
          <Tooltip content={"Gestionar visiblidad de variantes"} delay={1000} color="primary">
            <div
              className="icons flex items-center justify-center gap-2 font-bold"
              onClick={() => handleModal(item, "variants")}
            >
              <p>{`${includedVariantsQty}/${variantsQty}`}</p>
              <i
                className={`${
                  includedVariantsQty !== 0
                    ? "ri-eye-line bg-gradient-to-r from-primary to-yellow-600 bg-clip-text text-transparent"
                    : "ri-eye-close-line bg-gradient-to-r from-dark to-yellow-600 bg-clip-text text-transparent"
                } text-xl font-bold`}
              />
            </div>
          </Tooltip>
        );
      case "images":
        const imageQty = item.images ? item.images.split(" - ").length : 0;

        return (
          <Tooltip content="Agregar imagenes al producto" delay={1000} color="primary">
            <div
              className="icons flex items-center justify-center gap-2 font-bold"
              onClick={() => handleModal(item.variants[0], "images")}
            >
              <p>{imageQty}</p>
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
    <main className="flex flex-col items-center">
      <Table
        aria-label="Example table with custom cells"
        isStriped
        removeWrapper
        isHeaderSticky
        classNames={{
          th: "bg-primary",
          base: "overflow-y-scroll rounded-md min-h-[600px] max-h-[600px] backdrop-blur-sm",
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
          items={list.items}
          isLoading={loading}
          loadingContent={<Spinner color="secondary" className="text-2xl" />}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell className="relative">{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {hasMore && (
        <DefaultButton
          isDisabled={list.isLoading}
          isLoading={loading}
          onPress={list.loadMore}
          endContent={<i className="ri-refresh-line" />}
          className={"mx-auto mt-10"}
        >
          CARGAR MAS
        </DefaultButton>
      )}
      {isOpen && modalType === "images" && (
        <ImagesModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} product={selectedProduct} />
      )}

      {isOpen && modalType === "variants" && (
        <VariantsModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} product={selectedProduct} />
      )}
    </main>
  );
}

function ImagesModal({ isOpen, onOpenChange, onClose, product }) {
  //TODO VALIDAR MAXIMO DE FOTOS, CREO QUE 6 ESTARIA BIEN

  const [loading, setLoading] = useState(false);
  const [thisImages, setThisImages] = useState(product.pathImage);

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
      title={`GESTIONA LAS IMAGENES DE ${product.description.toUpperCase()}`}
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

function VariantsModal({ isOpen, onOpenChange, onClose, product }) {
  const [loading, setLoading] = useState(false);

  return (
    <DarkModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={`GESTIONA LAS VARIANTES DE ${product.description.toUpperCase()}`}
      size="4xl"
      description={"En esta pantalla podras agregar o eliminar fotos de cada producto"}
    >
      <main className="flex w-full flex-col items-center justify-between">
        {product.variants.map((v) => (
          <div>{v.description}</div>
        ))}
      </main>
    </DarkModal>
  );
}
