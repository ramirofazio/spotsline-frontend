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
  Image,
  Divider,
  Chip,
} from "@nextui-org/react";
import { APISpot } from "src/api";
import { toast } from "sonner";
import { DarkModal, DefaultButton } from "src/components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAsyncList } from "@react-stately/data";
import { formatPrices } from "src/utils";

const marcas_columns = [
  { label: "código", key: "codigo" },
  { label: "nombre", key: "description" },
  { label: "destacado", key: "featured" },
  { label: "variantes", key: "variants" },
];

export function ProductsPage() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const hasMore = page < 6;

  const list = useAsyncList({
    async load({ signal }) {
      setLoading(true);
      const res = await APISpot.dashboard.getDashboardProducts(page, signal);

      if (!res.data) {
        throw new Error("Error al cargar los productos");
      }

      setLoading(false);
      setPage(page + 1);

      if (page > 1) {
        setThisItems([...thisItems, ...res.data]);
      }

      return {
        items: res.data,
        cursor: page,
      };
    },
  });

  const [thisItems, setThisItems] = useState([]);

  useEffect(() => {
    setThisItems(list.items);
    console.log(list.items);
  }, [list.items.length > 0]);

  const handleToggleFeatured = async (item) => {
    try {
      setLoading(true);

      // Alternar la propiedad `featured` del producto
      const updatedItem = { ...item, featured: !item.featured };

      const res = await APISpot.dashboard.toggleFeaturedProduct({
        id: item.codigo,
        featured: updatedItem.featured,
      });

      if (res.status === 200) {
        // Actualizar thisItems con el producto actualizado
        setThisItems((prevItems) =>
          prevItems.map((prevItem) => (prevItem.codigo === updatedItem.codigo ? updatedItem : prevItem))
        );

        toast.success("Producto editado con éxito");
      }
    } catch (e) {
      console.log(e);
      toast.error("Hubo un error al editar el producto", {
        description: e.message || "Por favor, inténtalo nuevamente",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderCell = useCallback((item, columnKey) => {
    //TODO ACA HAY QUE ARMAR LAS LOGICAS PARA LAS VARIANTES CREO
    //? item.variants en el array de variantes, se puede jugar con eso
    const cellValue = item[columnKey];
    const variantsQty = item.variants.length;
    const includedVariantsQty = item.variants.filter((v) => v.incluido === true).length;

    switch (columnKey) {
      case "codigo":
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
            <p className="bg-gradient-to-r from-dark to-yellow-700 bg-clip-text font-bold text-transparent">
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
                onClick={() => handleToggleFeatured(item)}
                className={`${
                  Boolean(cellValue)
                    ? "ri-star-fill bg-gradient-to-r from-primary to-yellow-600 bg-clip-text text-transparent"
                    : "ri-star-line bg-gradient-to-r from-dark to-yellow-600 bg-clip-text text-transparent"
                } icons text-center text-xl font-bold`}
              />
            </Tooltip>
          </div>
        );
      case "variants":
        return (
          <Tooltip
            content={
              <div className="flex flex-col gap-2  p-2 text-center">
                <p className="text-sm font-bold text-dark">Gestionar las variantes de este producto</p>
                <p className="text-xs text-dark/90">
                  <strong>{includedVariantsQty}</strong> variantes de <strong>{variantsQty}</strong> mostradas en la web
                </p>
              </div>
            }
            delay={1000}
            classNames={{ content: "bg-gradient-to-r from-primary to-yellow-200" }}
          >
            <Link to={item.codigo}>
              <div
                className="icons mx-auto flex w-20 justify-end gap-2 font-bold"
                onClick={() => {
                  setLoading(true);
                }}
              >
                <p>{`${includedVariantsQty}/${variantsQty}`}</p>
                <i
                  className={`ri-eye-line bg-gradient-to-r from-primary to-yellow-600 bg-clip-text text-xl font-bold text-transparent`}
                />
              </div>
            </Link>
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
      case "variants":
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
        className="!z-20"
        classNames={{
          th: "bg-gradient-to-b from-primary to-yellow-600",
          base: "overflow-y-scroll rounded-md min-h-[600px] max-h-[600px] backdrop-blur-sm",
        }}
      >
        <TableHeader columns={marcas_columns}>
          {(column) => (
            <TableColumn key={column.key} className="text-sm uppercase !text-dark">
              {renderCol(column.key, column.label)}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={thisItems}
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
    </main>
  );
}

const priceColumns = ["precio1", "precio2", "precio3", "precio4", "precio5", "precio6"];
const variants_columns = [
  { label: "ID", key: "id" },
  { label: "codigo", key: "productCode" },
  { label: "nombre", key: "description" },
  { label: "color", key: "subRub" },
  { label: "categoria", key: "category" },
  { label: "precio1", key: "precio1" },
  { label: "precio2", key: "precio2" },
  { label: "precio3", key: "precio3" },
  { label: "precio4", key: "precio4" },
  { label: "precio5", key: "precio5" },
  { label: "precio6", key: "precio6" },
  { label: "incluido", key: "incluido" },
  { label: "imagen", key: "pathImage" },
];

export function VariantPage() {
  const { variant_id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(false);

  const { onOpen, onOpenChange, isOpen, onClose } = useDisclosure();

  const list = useAsyncList({
    async load({ signal }) {
      setLoading(true);
      const res = await APISpot.dashboard.getProductVariants(variant_id, signal);

      console.log("---> ", res);

      if (!res.data) {
        throw new Error("Error al cargar las variantes");
      }
      setLoading(false);
      return {
        items: res.data,
        cursor: null,
      };
    },
  });

  const handleModal = (variant) => {
    onOpen();
    setSelectedVariant(variant);
  };

  const handleToggleInluido = async (productCode) => {
    //? Logica para alternar la propiedad `incluido` de una variante
    try {
      setLoading(true);
      const res = await APISpot.dashboard.toggleIncluidoVariant(productCode);
      if (res) {
        toast.success("Variante editada con exito");
      }
    } catch (e) {
      console.log(e);
      toast.error("Hubo un error al editar la variante", {
        description: e.message || "Por favor, intentalo nuevamente",
      });
    } finally {
      setLoading(false);
      navigate(); //? Para refrescar la data
    }
  };

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    if (priceColumns.includes(columnKey)) {
      return <p className="text-left">{formatPrices(Number(cellValue))}</p>;
    }

    switch (columnKey) {
      case "id":
        const color = item.incluido ? "bg-green-500" : "bg-red-500";
        return (
          <div className="flex items-center gap-2">
            <Tooltip
              color="primary"
              delay={200}
              content={
                item.incluido
                  ? "Este producto se esta mostrando en la web"
                  : "Este producto NO se esta mostrando en la web"
              }
            >
              <div className={`h-2 w-2 rounded-full shadow-xl ${color}`} />
            </Tooltip>
            <p className="bg-gradient-to-r from-dark to-yellow-700 bg-clip-text font-bold text-transparent">
              {cellValue}
            </p>
          </div>
        );
      case "description":
        return (
          <div>
            <Tooltip content={cellValue} delay={200} color="primary">
              <p className="line-clamp-1 text-left">{cellValue}</p>
            </Tooltip>
          </div>
        );
      case "subRub":
        return (
          <div>
            <Tooltip content={cellValue} delay={200} color="primary">
              <p className="line-clamp-1 text-left">{cellValue}</p>
            </Tooltip>
          </div>
        );
      case "incluido":
        return (
          <Tooltip content={cellValue ? "NO mostrar en la web" : "Mostrar en la web"} delay={1000} color="primary">
            <i
              className={`${
                cellValue
                  ? "ri-eye-line bg-gradient-to-r from-primary to-yellow-600 bg-clip-text text-transparent"
                  : "ri-eye-close-line bg-gradient-to-r from-dark to-yellow-600 bg-clip-text text-transparent"
              } icons mx-auto text-xl font-bold`}
              onClick={() => handleToggleInluido(item.productCode)}
            />
          </Tooltip>
        );
      case "pathImage":
        const imageQty = item.images ? item.images.split(" - ").length : 0;
        return (
          <Tooltip content="Agregar imagenes al producto" delay={1000} color="primary">
            <div className="icons flex items-center justify-center gap-2 font-bold" onClick={() => handleModal(item)}>
              <p>{imageQty}</p>
              <i className="ri-image-line  bg-gradient-to-r from-primary to-yellow-600 bg-clip-text text-xl text-transparent" />
            </div>
          </Tooltip>
        );
      default:
        return <p className="text-left">{cellValue}</p>;
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
        <TableHeader columns={variants_columns}>
          {(column) => (
            <TableColumn key={column.key} className="text-sm uppercase !text-dark">
              {renderCol(column.key, column.label)}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={list.items}
          isLoading={loading}
          loadingContent={
            <Spinner color="primary" size="lg" className="z-20 aspect-square h-40 rounded-2xl bg-dark/60" />
          }
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell className="relative font-medium">{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isOpen && selectedVariant && (
        <ImagesModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} variant={selectedVariant} />
      )}
    </main>
  );
}

function ImagesModal({ isOpen, onOpenChange, onClose, variant }) {
  const [loading, setLoading] = useState(false);
  const [thisImages, setThisImages] = useState(
    variant.pathImage ||
      //? IMAGENES DE TESTEO
      "https://spotsline-bucket.s3.amazonaws.com/logoBlack.png - https://spotsline-bucket.s3.amazonaws.com/logoWhite.png - https://spotsline-bucket.s3.amazonaws.com/logoYellow.png"
  );

  const handleUpdateImages = async () => {
    //? Logica para actualizar la propiedad `images` de un producto
    try {
      setLoading(true);
      const res = await APISpot.dashboard.updateProductImages({ product_id: variant.id, images: thisImages });
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
      isOpen={isOpen}
      isDismissable={false}
      onOpenChange={onOpenChange}
      title={`GESTIONA LAS IMAGENES DE ${variant.description.toUpperCase()}`}
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
                  <Image src={image} width={200} height={200} alt={variant.description + " " + image} />
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
