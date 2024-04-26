import {
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  cn,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionProducts } from "src/redux/reducers";

const colors = [
  {
    id: 1,
    color: "Red",
    pathImage: "https://www.spotsline.com.ar/wp-content/uploads/2021/06/rojo.png",
  },
  {
    id: 2,
    color: "Cobre",
    pathImage: "https://www.spotsline.com.ar/wp-content/uploads/2021/06/cobre.png",
  },
];

export function FilterProducts({ categories }) {
  const product = useSelector((state) => state.product);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filters, setFilters] = useState(product.filters);
  const dispatch = useDispatch();

  const handleFilters = (key, value) => {
    setFilters((cur) => {
      return { ...cur, [key]: value };
    });
  };

  return (
    <>
      <Button
        onClick={onOpen}
        className="bg-transparent hover:bg-secondary hover:text-white"
        isIconOnly
        aria-label="Like"
      >
        <i className="ri-equalizer-line scale-125 text-xl"></i>
      </Button>
      <Modal
        scrollBehavior="inside"
        backdrop="blur"
        className="bg-background"
        size="md"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="grid place-content-center">Filtros</ModalHeader>

              <ModalBody>
                <Divider />
                <RadioGroup
                  value={filters.order}
                  label="Ordenar por"
                  onChange={({ target }) => handleFilters("order", target.value)}
                >
                  <CustomRadio value="asc">Menor precio</CustomRadio>
                  <CustomRadio value="desc">Mayor precio</CustomRadio>
                </RadioGroup>
                <Divider />

                <RadioGroup
                  value={filters.category}
                  onChange={({ target }) => handleFilters("category", target.value)}
                  label="Categorias"
                >
                  {categories?.length &&
                    categories.map(({ name, value }, i) => (
                      <CustomRadio key={i} value={value.toString()}>
                        {name}
                      </CustomRadio>
                    ))}
                </RadioGroup>
                <Divider />
                {/* <CheckboxGroup
                  value={filters.colors}
                  label="Color"
                  onChange={(value) => handleFilters("colors", value)}
                >
                  {colors.map(({ color, id, pathImage }) => (
                    <CustomCheck key={"color-filter-" + id} value={color} color={pathImage}>
                      {color}
                    </CustomCheck>
                  ))}
                </CheckboxGroup> */}
                <Divider />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  radius="full"
                  className="w-full p-6 font-secondary text-lg font-semibold uppercase hover:bg-secondary hover:text-slate-50"
                  onClick={() => {
                    dispatch(actionProducts.setFilters(filters));
                    onClose();
                  }}
                >
                  Aplicar Filtros
                </Button>
                <Button
                  onClick={() => {
                    dispatch(actionProducts.resetFilters());
                    onClose();
                  }}
                  radius="full"
                  isIconOnly
                  className="p-6"
                  color="danger"
                >
                  <i className="ri-refresh-line scale-125"></i>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export const CustomRadio = (props) => {
  const { children, ...otherProps } = props;
  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn("flex flex-row-reverse min-w-full justify-between hover:bg-content2 rounded-md", ""),
      }}
    >
      {children}
    </Radio>
  );
};

export const CustomCheck = (props) => {
  const { children, color, ...otherProps } = props;

  return (
    <Checkbox
      {...otherProps}
      classNames={{
        base: cn("flex flex-row-reverse -my-2 min-w-full justify-between hover:bg-content2 rounded-md", "items-center"),
      }}
    >
      <img src={color} className="-mt-0.5 mr-2 inline-block aspect-square h-5 rounded-full" />
      {children}
    </Checkbox>
  );
};
