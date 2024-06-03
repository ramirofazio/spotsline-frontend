import { SelectItem } from "@nextui-org/react";
import colors from "../../../data/colors.json";
import { assets } from "src/assets";
import CustomSelect from "src/components/form/CustomSelect";

export function SelectVariant({ variants, currentVariant, setCurrentVariant }) {
  const handleChange = (e) => {
    const newVariant = variants.find((v) => v.description === e.target.value);
    setCurrentVariant(newVariant);
    setTimeout(() => {
      const manualSlide = document.getElementById("change-slide");
      manualSlide.click();
    }, 200);
  };

  return (
    <CustomSelect
      items={variants}
      label="Selecciona una variante"
      labelClass={"text-lg text-dark font-semibold"}
      onChange={handleChange}
      defaultSelectedKeys={[currentVariant?.description]}
      disabledKeys={[currentVariant?.description]}
      selectedKeys={[currentVariant?.description]}
      className="w-full"
      variant="underlined"
    >
      {(variant) => {
        let interno;
        let externo;

        if (variant.subRub !== "-" && variant.subRub) {
          let [internoColor, externoColor] = variant.subRub.split("-");

          interno = colors[internoColor?.trim()];
          externo = colors[externoColor?.trim()];
        }

        return (
          <SelectItem
            value={variant.description}
            key={variant.description}
            textValue={variant.description}
            classNames={{
              base: `!bg-gradient-to-r p-3 to-primary from-yellow-200 my-1 hover:opacity-70 !transition`,
            }}
          >
            <div className="flex items-center gap-2">
              <div className="flex-grow-1">
                <img
                  loading="eager"
                  alt={variant.description}
                  className="aspect-square w-10 rounded-full border-1 border-dark/50 bg-background shadow-xl"
                  src={variant.pathImage || assets.logos.logoBlack}
                />
              </div>
              <div className="flex w-60 flex-col gap-1">
                <span className="line-clamp-1 font-bold text-dark">{variant.description}</span>
                <div className="flex gap-4">
                  {interno && (
                    <p className="flex flex-1 items-center gap-1">
                      <span
                        className="inline-block aspect-square w-3 rounded-full"
                        style={{ background: interno.color, minWidth: "12px" }}
                      ></span>
                      {interno.name}
                    </p>
                  )}
                  {externo && (
                    <p className="flex flex-1 items-center gap-1">
                      <span
                        className="inline-block aspect-square w-3 rounded-full"
                        style={{ background: externo.color, minWidth: "12px" }}
                      ></span>
                      {externo.name}
                    </p>
                  )}
                  {!interno && !externo && <p className="flex flex-1 items-center gap-1">Consultar</p>}
                </div>
              </div>
            </div>
          </SelectItem>
        );
      }}
    </CustomSelect>
  );
}
