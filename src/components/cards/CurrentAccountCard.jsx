import { convertISOToDate } from "src/utils";
import { AnimatePresence, motion } from "framer-motion";
import { fadeInBottom } from "src/styles/framerVariants";

export default function CurrentAccountCard({ balance, due, date, letter, number, point, type }) {
  return (
    <AnimatePresence>
      <motion.div
        {...fadeInBottom()}
        key={`cc-card-${number}`}
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
      </motion.div>
    </AnimatePresence>
  );
}

function Item({ children, className }) {
  return <p className={`min-w-[40px] tracking-wide ${className}`}>{children}</p>;
}
