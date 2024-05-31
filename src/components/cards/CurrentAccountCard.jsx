import { convertISOToDate, formatPrices } from "src/utils";
import FloatingLogos from "../images/FloatingLogos";
import { Divider } from "@nextui-org/react";
import { motion } from "framer-motion";
import { fadeInBottom } from "src/styles/framerVariants";

export default function CurrentAccountCard({ balance, due, date, letter, number, point, type }) {
  return (
    <motion.div
      {...fadeInBottom()}
      className="shadow-xs flex min-w-[700px] items-center justify-start gap-6 rounded-md bg-white p-3 text-[14px] font-semibold"
    >
      <Item className={"min-w-[85px]"}>{convertISOToDate(date)}</Item>
      <Item className="yellowGradient">{type}</Item>
      <Item>{letter}</Item>
      <Item>{point}</Item>
      <Item>{number}</Item>
      <Item className={"yellowGradient"}>$</Item>
      <Item className={"min-w-[85px] font-bold text-green-600"}>{balance}</Item>
      <Item className={"min-w-[85px] font-bold text-red-600"}>{due}</Item>
      <Item className={"min-w-[85px] font-bold"}>${balance - due}</Item>

      {/*
      <div className="w-full gap-1 space-y-1 text-[12px] lg:text-[15px]">
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
        <div className="flex flex-col gap-2 p-2">
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
      </div> */}
    </motion.div>
  );
}

function Item({ children, className }) {
  return <p className={`min-w-[40px] tracking-wide ${className}`}>{children}</p>;
}
