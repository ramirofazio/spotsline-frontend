import { useState } from "react";
import { SelectItem } from "@nextui-org/react";
import CustomSelect from "src/components/form/CustomSelect";

export function SelectQuantity({ qty, setQty }) {
  /* eslint-disable-next-line */
  const [qtys, setQtys] = useState(() => {
    const res = [];
    Array.from({ length: 15 }).map((_, index) => res.push({ name: String(index + 1), qty: index + 1 }));
    return res;
  });

  function handleChange(e) {
    const qty = e.target.value;
    setQty(qty);
  }

  return (
    <CustomSelect
      items={qtys}
      label="Selecciona una cantidad"
      labelClass={"text-lg text-dark font-semibold"}
      onChange={handleChange}
      defaultSelectedKeys={[String(qty)]}
      disabledKeys={[String(qty)]}
      className="w-full"
      variant="underlined"
    >
      {({ qty, name }) => (
        <SelectItem
          value={qty}
          key={name}
          textValue={name}
          className="text-lg font-bold"
          classNames={{
            base: "!bg-gradient-to-r p-3 to-primary from-yellow-200 my-1 hover:opacity-70 !transition",
          }}
        >
          {name}
        </SelectItem>
      )}
    </CustomSelect>
  );
}
