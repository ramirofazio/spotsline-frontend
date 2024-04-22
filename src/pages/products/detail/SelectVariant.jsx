import { Avatar, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import colors from "../../../data/colors.json";
import { assets } from "src/assets";
import { useState } from "react";

export function SelectVariant({ variants, current, setCurrent }) {
  const [isOpen, setIsOpen] = useState();
  let [interno, externo] = current.subRub.split("-");
  interno = colors[interno];
  externo = colors[externo];

  return (
    <Popover isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)} placement="top-start">
      <PopoverTrigger className="px-3 text-start">
        <button className="flex w-full items-center gap-2 outline-none">
          <Avatar
            alt={current.description}
            className="flex-shrink-0"
            size="sm"
            src={current.pathImage || assets.lights.light2}
          />
          <div className="flex flex-col justify-between">
            <span className="max-w-[300px] overflow-hidden whitespace-nowrap">{current.description}</span>
            <div className="flex max-w-[250px]">
              {interno && (
                <p className="flex flex-1 items-center gap-2">
                  <span
                    className="inline-block aspect-square w-5 items-center rounded-full"
                    style={{ background: interno.color }}
                  ></span>
                  {interno.name}
                </p>
              )}
              {externo && (
                <p className="flex flex-1 items-center gap-2">
                  <span
                    className="inline-block aspect-square w-5 items-center rounded-full"
                    style={{ background: externo.color }}
                  ></span>
                  {externo.name}
                </p>
              )}
            </div>
          </div>
          <i className="ri-arrow-down-s-line ml-auto scale-125" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="max-h-96 ml-1 w-[90vw] min-w-[200px] items-start rounded-sm p-1 md:ml-4 md:w-auto overflow-y-scroll justify-start">
        {variants.map((item) => {
          let [interno, externo] = item.subRub.split("-");
          interno = colors[interno];
          externo = colors[externo];
          return (
            <button
              onClick={() => {
                setIsOpen(false);
                setCurrent(item);
              }}
              key={"item" + current.id}
              className="flex w-full items-center gap-2 p-2 outline-none hover:bg-gray-200"
            >
              <Avatar
                alt={current.description}
                className="flex-shrink-0"
                size="sm"
                src={item.pathImage || assets.lights.light2}
              />
              <div className="flex flex-col justify-between">
                <span className="max-w-[300px] overflow-hidden whitespace-nowrap">{item.description}</span>
                <div className="flex max-w-[250px]">
                  {interno && (
                    <p className="flex flex-1 items-center gap-2">
                      <span
                        className="inline-block aspect-square w-5 items-center rounded-full"
                        style={{ background: interno.color }}
                      ></span>
                      {interno.name}
                    </p>
                  )}
                  {externo && (
                    <p className="flex flex-1 items-center gap-2">
                      <span
                        className="inline-block aspect-square w-5 items-center rounded-full"
                        style={{ background: externo.color }}
                      ></span>
                      {externo.name}
                    </p>
                  )}
                </div>
              </div>
              <i className={`ri-check-fill ml-auto scale-125 ${current.id !== item.id && "invisible"}`} />
            </button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
