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
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { formatPrices } from "src/utils";
import { AnimatePresence, motion } from "framer-motion";
import { onViewZoomIn } from "src/styles/framerVariants";

const marcas_columns = [
  { label: "código", key: "codigo" },
  { label: "nombre", key: "description" },
  { label: "destacado", key: "featured" },
  { label: "variantes", key: "variants" },
];

export function ProductsPage() {
  const navigate = useNavigate();
  const marcas = useLoaderData();

  //   const { page } = useParams();
  const [loading, setLoading] = useState(false);

  //   const hasMore = page < 5;

  const handleToggleFeatured = async (item) => {
    try {
      setLoading(true);

      const res = await APISpot.dashboard.toggleFeaturedProduct({
        id: item.codigo,
        featured: !item.featured,
      });

      if (res.status === 200) {
        toast.success("Producto editado con éxito");
      }
    } catch (e) {
      console.log(e);
      toast.error("Hubo un error al editar el producto", {
        description: e.response.data.message || "Por favor, inténtalo nuevamente",
      });
    } finally {
      setLoading(false);
      navigate();
    }
  };

  const renderCell = useCallback((item, columnKey) => {
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
                    ? "ri-star-fill bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent"
                    : "ri-star-line bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent"
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
    <AnimatePresence key={"dashboard-products"} mode="wait">
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
          <TableHeader columns={marcas_columns}>
            {(column) => (
              <TableColumn key={column.key} className="text-sm uppercase !text-dark">
                {renderCol(column.key, column.label)}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={marcas}
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
        {/* <div>
        {page > 1 && (
          <DefaultButton
            startContent={<i className="ri-arrow-left-s-fill text-xl" />}
            className={"mx-auto mt-10 hover:scale-100"}
            as={Link}
            to={`/dashboard/productos/${Number(page) - 1}`}
          >
            ANTERIOR
          </DefaultButton>
        )}
        {hasMore && (
          <DefaultButton
            endContent={<i className="ri-arrow-right-s-fill text-xl" />}
            className={"mx-auto mt-10 hover:scale-100"}
            as={Link}
            to={`/dashboard/productos/${Number(page) + 1}`}
          >
            SIGUENTE
          </DefaultButton>
        )}
      </div> */}
      </motion.main>
    </AnimatePresence>
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
  const navigate = useNavigate();
  const variants = useLoaderData();

  const [loading, setLoading] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(false);

  const { onOpen, onOpenChange, isOpen, onClose } = useDisclosure();

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
          <div className="w-[200px]">
            <Tooltip className="min-w-fit" content={cellValue} delay={200} color="primary">
              <p className="line-clamp-1  text-left">{cellValue}</p>
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
                  ? "ri-eye-line bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent"
                  : "ri-eye-close-line bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent"
              } icons mx-auto text-xl font-bold`}
              onClick={() => handleToggleInluido(item.productCode)}
            />
          </Tooltip>
        );
      case "pathImage":
        return (
          <Tooltip content="Agregar imagenes al producto" delay={1000} color="primary">
            <div className="icons flex items-center justify-center gap-2 font-bold" onClick={() => handleModal(item)}>
              <i
                className={`ri-image-line  bg-gradient-to-r ${
                  Boolean(cellValue) ? "from-green-600 to-yellow-600" : "from-red-600 to-yellow-600"
                } bg-clip-text text-xl text-transparent`}
              />
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
          base: "overflow-y-scroll rounded-md  max-h-[600px] backdrop-blur-sm",
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
          items={variants}
          isLoading={loading}
          loadingContent={
            <Spinner color="secondary" size="lg" className="z-20 aspect-square h-40 rounded-2xl bg-dark/60" />
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
        <ImagesModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={onClose}
          variant={selectedVariant}
          navigate={navigate}
        />
      )}
    </main>
  );
}

function ImagesModal({ isOpen, onOpenChange, onClose, variant, navigate }) {
  const [loading, setLoading] = useState(false);
  const [ImageLoading, setImageLoading] = useState(false);

  const [image, setImage] = useState(variant.pathImage || { url: "", formData: "" });

  useEffect(() => {
    if (variant.pathImage === "") {
      setImage("");
    }
  }, []);

  const handleUpdateImages = async () => {
    //? Logica para actualizar la propiedad `images` de un producto
    if (image === "") {
      //? Imagen vacia
      toast.info("¿Seguro quieres guardar esta variante sin imagen?", {
        position: "top-center",
        duration: 10000,
        action: { label: "CONFIRMAR", onClick: () => onClose() },
      });
      return;
    } else if (variant.pathImage && !image.formData) {
      toast.info("Variante no modificada");
      onClose();
    } else {
      try {
        setLoading(true);
        const res = await APISpot.dashboard.updateProductImages(variant.id, image.formData, false);
        if (res) {
          toast.success("Imagen cargada con exito");
        }
      } catch (e) {
        console.log(e);
        toast.error("Hubo un error al cargar la imagen", {
          description: e.response.data.message || "Por favor, intentalo nuevamente",
        });
      } finally {
        navigate();
        setLoading(false);
        onClose();
      }
    }
  };

  const handleOnChangeFile = (e) => {
    setImageLoading(false);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const newImage = URL.createObjectURL(e.target.files[0]);
    setImage({ url: newImage, formData: formData });
  };

  return (
    <DarkModal
      isOpen={isOpen}
      isDismissable={false}
      onOpenChange={onOpenChange}
      title={`GESTIONA LAS IMAGENES DE ${variant.description.toUpperCase()}`}
      size="xl"
      description={"En esta pantalla podras agregar o eliminar fotos de cada producto"}
    >
      <main className="flex w-full flex-col items-center justify-between">
        <section className="grid h-full w-full grid-rows-3">
          <div className="row-span-2 flex flex-wrap items-center justify-center gap-3 p-6">
            {!image ? (
              <div className="grid h-[150px] place-items-center">
                <label htmlFor="upload-images" className="flex flex-col items-center gap-4">
                  {ImageLoading ? (
                    <Spinner />
                  ) : (
                    <>
                      <p className="text-background">Este producto no tiene imagen</p>
                      <p className="yellowGradient icons flex h-10 w-10 items-center justify-center rounded-xl border-3 border-primary/50 p-2">
                        <i className="ri-add-line text-xl" />
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    id="upload-images"
                    accept="image/*"
                    title="Cargar imagenes"
                    className="invisible absolute right-0 top-0 h-full w-full border-2"
                    onChange={handleOnChangeFile}
                    onClick={() => setImageLoading(true)}
                  />
                </label>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { duration: 0.2 } }}
                className="relative flex aspect-square h-[150px] items-center justify-center rounded-xl bg-background/40"
              >
                <Tooltip content="Eliminar esta imagen" delay={1000} color="primary">
                  <Chip
                    className="text-md icons absolute -right-2 -top-2 z-20 flex aspect-square h-5 w-5 items-center justify-center rounded-full bg-primary text-dark hover:bg-red-600"
                    onClick={() => setImage("")}
                  >
                    <i className="ri-close-fill text-lg" />
                  </Chip>
                </Tooltip>
                <img
                  loading="lazy"
                  className="h-full w-full  object-cover"
                  src={image.url || image}
                  alt={variant.description + " " + image.url}
                />
              </motion.div>
            )}
          </div>
          <div className="relative z-20 row-span-1 flex items-center justify-center p-6">
            <Divider className="absolute inset-x-0 top-0 h-[3px] rounded-full bg-gradient-to-r from-primary to-yellow-200" />
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
          <Tooltip content="Solo se permite 1 imagen por variante" delay={200} color="primary" placement="right">
            <i className="ri-information-line yellowGradient icons text-xl hover:cursor-help" />
          </Tooltip>
        </div>
      </main>
    </DarkModal>
  );
}
