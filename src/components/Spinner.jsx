import { Player } from "@lottiefiles/react-lottie-player";
import lottie from "/lottie.json?url";
import { motion } from "framer-motion";

const Spinner = ({ className }) => {
  return (
    <motion.div
      key="spinner"
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.2 }}
      transition={{ duration: 0.2 }}
      className={`flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-tr from-dark/50 to-dark/20 ${className}`}
    >
      <Player speed={1.5} autoplay loop src={lottie} className={`w-[150px]`}></Player>
    </motion.div>
  );
};

export default Spinner;
