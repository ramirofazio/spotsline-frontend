import { Player } from "@lottiefiles/react-lottie-player";
import lottie from "/lottie.json?url";
import { AnimatePresence, motion } from "framer-motion";

const Spinner = () => {
  return (
    <main className="grid h-screen w-screen place-items-center">
      <AnimatePresence mode="wait" key="spinner">
        <motion.div
          key="spinner-content"
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{ width: "100vw", height: "100vh", opacity: 1 }}
          exit={{ width: 0, height: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`mx-auto flex h-screen w-screen items-center justify-center self-center bg-gradient-to-tr from-dark/50 to-dark/20`}
        >
          <Player autoplay loop src={lottie} className={`w-[150px]`}></Player>
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

export default Spinner;
