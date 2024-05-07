import { convertISOToDate, formatPrices } from "src/utils";
import FloatingLogos from "../images/FloatingLogos";
import { Divider } from "@nextui-org/react";

export default function CurrentAccountCard({ balance, due, date, letter, number, point, type }) {
  return (
    <div className="relative flex min-h-[150px] min-w-[300px] flex-col items-center gap-4 overflow-hidden rounded-md bg-white text-left shadow-xl md:min-h-[200px] md:text-sm lg:min-w-[400px]" >
      <FloatingLogos
        qty={1}
        positions={["-top-10 -right-40 md:opacity-50 lg:-top-40 lg:-right-60 blur-sm"]}
        size={"scale-[70%] lg:scale-[50%]"}
      />

      <div className="w-full gap-1 space-y-1 text-[12px]">
        <div className="flex justify-between bg-gradient-to-l from-primary to-white p-2">
          <p className=" font-semibold">{convertISOToDate(date)}</p>
          <div className="flex gap-1 text-xs">
            <p className="">
              Letra: <strong>{letter}</strong>
            </p>
            <p className="">
              Tipo: <strong>{type}</strong>
            </p>
          </div>
        </div>
        <div className="p-2">
          <p className="">
            Saldo:<strong className="text-green-600"> {formatPrices(balance)}</strong>
          </p>
          <p className="">
            Deuda:<strong className="text-red-600"> {formatPrices(due)}</strong>
          </p>
          <p className="mt-1">
            FINAL:<strong> {formatPrices(balance - due)}</strong>
          </p>
        </div>
        <Divider className="my-2 w-full bg-primary" />
        <div className="p-2">
          <p className="">
            Punto:<strong className=""> {point}</strong>
          </p>
          <p className="">
            Numero:<strong className=""> {number}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
