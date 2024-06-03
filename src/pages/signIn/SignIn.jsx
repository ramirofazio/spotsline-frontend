import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { APISpot, addAuthWithToken } from "../../api";
import { actionsAuth, actionsShoppingCart, actionsUser } from "../../redux/reducers";
import { Divider, useDisclosure } from "@nextui-org/react";
import { toast } from "sonner";
import { InitChangePasswordModal } from "./InitChangePasswordModal";
import { BasicInput, PasswordInput, DefaultButton } from "src/components/index";
import AwsImage from "src/components/images/AwsImage";
import { motion } from "framer-motion";
import { zoomIn } from "src/styles/framerVariants";
import { GoBackButton } from "src/components/buttons/GoBackButton";
import { isValidEmail } from "src/utils/validation";
import { images } from "src/assets";

export function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { onOpen, onOpenChange, isOpen } = useDisclosure();

  const [signInData, setSignInData] = useState(false);
  const [errs, setErrs] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setSignInData((prev) => {
      if (name === "email") {
        setErrs(isValidEmail(value));
      }
      const newData = { ...prev, [name]: value };
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { access_token, user, shoppingCart } = await APISpot.auth.signIn(signInData);
      if (access_token && user) {
        addAuthWithToken(access_token);
        dispatch(actionsAuth.setAccessToken(access_token));
        dispatch(actionsUser.setUser(user));

        if (user.web_role !== Number(import.meta.env.VITE_SELLER_ROLE)) {
          //? Si el user no es vendedor se le crea/carga un carrito. Sino no hace falta porque se carga el del cliente a gestionar que elija
          if (shoppingCart) {
            //? Si tiene shoppingCart lo cargo
            dispatch(actionsShoppingCart.loadCart(shoppingCart));
          } else {
            //? Creo shopping cart vacio
            await APISpot.cart.createEmptyCart(user.id);
          }
        }

        if (!user.firstSignIn) {
          toast.info(`Bienvenido de nuevo ${user.email.split("@")[0]}`, {
            description: "¡Estamos contentos de que hayas vuelto a nuestra web!",
          });

          navigate("/");
        }
      }
    } catch (e) {
      console.log(e);
      toast.error("Hubo un error al iniciar la sesion.", { description: e.response.data.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden text-center">
      <img
        src={images.signInBackground}
        className="absolute h-full w-full object-cover"
        alt="singInBackground"
        loading="eager"
      />

      <div className="grid h-full w-full place-content-center place-items-center bg-black/30 backdrop-blur-md">
        <GoBackButton className="absolute left-4 top-4 md:left-10 md:top-10" textClassName={"!text-background"} />
        <motion.section
          {...zoomIn}
          className=" relative flex min-h-[60vh] min-w-[60vw] flex-col items-center gap-4 overflow-hidden rounded-xl bg-black/10 p-12  shadow-md"
        >
          <div className="absolute -right-40 -top-14 -z-10 xl:-right-60 xl:-top-20">
            <AwsImage
              type="logos"
              identify="logoBlack"
              className="!-z-10 w-80 rotate-12 !opacity-50 blur-sm xl:w-[30vw]"
            />
          </div>
          <div className="grid place-items-center text-center md:-mt-8">
            <AwsImage type="logos" identify="logoYellow" className="w-16 md:w-32" />
            <h5 className="-my-2 md:text-xl md:font-semibold">SPOTSLINE</h5>
            <p className="font-slogan text-xs md:text-sm">Se ve bien.</p>
          </div>
          <form onSubmit={handleSubmit} className="z-20 flex flex-col items-center gap-4 md:w-[30vw]">
            <BasicInput
              name="email"
              isInvalid={Boolean(errs)}
              errorMessage={errs}
              type="email"
              label="Correo electrónico"
              startContentIcon="ri-mail-fill text-xl text-secondary"
              onChange={handleChange}
            />
            <PasswordInput name="password" label="Contraseña" onChange={handleChange} />
            <DefaultButton
              isDisabled={!signInData?.email?.length || (!signInData?.password?.length && true)}
              isLoading={isLoading}
              type="submit"
            >
              INGRESAR
            </DefaultButton>
          </form>
          <Divider className="my-4 bg-background" />
          <p className="text-xs font-thin text-white md:text-sm">
            ¿OLVIDASTE TU CONTRASEÑA?{" "}
            <strong
              className="yellow-neon icons underline"
              onClick={() => {
                onOpen();
              }}
            >
              RECUPERALA
            </strong>
          </p>
          <div className="absolute -bottom-14 -left-40 -z-10 xl:-bottom-32 xl:-left-64">
            <AwsImage
              type="logos"
              identify="logoBlack"
              className="!-z-10 w-80 -rotate-12 !opacity-50 blur-sm xl:w-[30vw]"
            />
          </div>
        </motion.section>
      </div>

      <InitChangePasswordModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </main>
  );
}
