import { Input, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useState } from "react";

export function SelectQuantity({ quantity, available = 6 }) {
  const [isOpen, setIsOpen] = useState();
  const [otherQty, setOtherQty] = useState(0);

  function handleChangeQuantity(value) {
    quantity.set(value);
    setIsOpen(false);
    setOtherQty(0);
  }

  return (
    <Popover
      placement="bottom-start"
      onClose={() => setOtherQty(0)}
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <PopoverTrigger className="my-4 px-3  outline-none">
        <button className="flex w-full gap-2 text-lg">
          <span className="">Cantidad:</span>
          <span className="whitespace-nowrap font-semibold">{getavailableStr(quantity.value)}</span>
          <span className="ml-auto whitespace-nowrap text-base text-gray-600">{`${
            available > 10 ? "(+10 unidades)" : "(" + getavailableStr(available) + ")"
          }`}</span>
          <i className="ri-arrow-down-s-line scale-110" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="ml-1 w-[90vw] min-w-[200px] items-start rounded-sm p-1 md:ml-4 md:w-60">
        {Array(Math.min(5, available))
          .fill(1)
          .map((_x, i) => (
            <button
              className={`${
                i + 1 === quantity.value && "border-l-primary"
              } w-full border-l-2   border-transparent p-3 text-start text-base font-medium hover:bg-gray-200`}
              onClick={() => handleChangeQuantity(i + 1)}
              key={i + 1}
            >
              {getavailableStr(i + 1)}
            </button>
          ))}
        {available > 5 &&
          (otherQty ? (
            <div className="p-3">
              {" "}
              <Input
                onKeyDown={({ code }) => code === "Enter" && handleChangeQuantity(otherQty)}
                labelPlacement="outside"
                onChange={({ target }) => {
                  if (!target.value) return setOtherQty(1);
                  setOtherQty(parseInt(target.value));
                }}
                type="number"
                endContent={
                  <button onClick={() => handleChangeQuantity(otherQty)} className="h-full">
                    Aplicar
                  </button>
                }
                placeholder=" "
                label="Cantidad"
                variant="bordered"
                isInvalid={otherQty > available}
                errorMessage={otherQty > available && "No disponible"}
              />
            </div>
          ) : (
            <button
              onClick={() => setOtherQty(1)}
              className="w-full border-l-2   border-transparent p-3 text-start text-base font-medium hover:bg-gray-200"
            >
              Más de 5 unidades
            </button>
          ))}
      </PopoverContent>
    </Popover>
  );
}

function getavailableStr(num) {
  if (num === 1) return num + " Unidad";
  return num + " Unidades";
}
