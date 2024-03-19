import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isValidSignIn } from "../../utils/validation";
import { APISpot, addAuthWithToken } from "../../api";
import { actionsAuth, actionsUser } from "../../redux/reducers";
import { Divider, Image, useDisclosure } from "@nextui-org/react";
import { toast } from "sonner";
import { InitChangePasswordModal } from "./InitChangePasswordModal";
import { BasicInput, PasswordInput, DefaultButton } from "src/components/index";
import AwsImage from "src/components/images/AwsImage";

export function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { onOpen, onOpenChange, isOpen } = useDisclosure();

  const [signInData, setSignInData] = useState(false);
  const [errs, setErrs] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setSignInData((prev) => {
      const newData = { ...prev, [name]: value };
      //setErrs(isValidSignIn(newData));
      return newData;
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { access_token, user } = await APISpot.auth.signIn(signInData);
      if (access_token && user) {
        addAuthWithToken(access_token);
        dispatch(actionsAuth.setAccessToken(access_token));
        dispatch(actionsUser.setUser(user));
        if (!user.firstSignIn) {
          toast.info(`Bienvenido de nuevo ${user.email.split("@")[0]}`, {
            description: "¡Estamos contentos de que hayas vuelto a nuestra web!",
          });
          navigate("/");
        }
      }
    } catch (e) {
      toast.error("Hubo un error al iniciar la sesion.", { description: e.response.data.message });
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative h-screen overflow-hidden bg-signIn bg-cover bg-center bg-no-repeat">
      <div className="grid h-full w-full place-content-center place-items-center bg-black/30 backdrop-blur-md ">
        <div className="icons absolute left-4 top-4 flex items-center" onClick={() => navigate("/")}>
          <i className="ri-arrow-left-s-line yellow-neon  animate-pulse text-4xl" />
          <p className="white-neon font-secondary">VOLVER</p>
        </div>
        <section className="relative flex min-h-[60vh] min-w-[60vw] flex-col items-center gap-4 overflow-hidden rounded-xl bg-black/10 p-12  shadow-md">
          <div className="absolute -right-40 -top-14 -z-10 xl:-right-60 xl:-top-20">
            <AwsImage type="logos" identify="logoBlack" className="!-z-10 w-80 rotate-12 !opacity-50 xl:w-[30vw]" />
          </div>
          <div className="grid place-items-center text-center md:-mt-8">
            <AwsImage type="logos" identify="logoYellow" className="w-16 md:w-32" />
            <h5 className="-my-2 md:text-xl md:font-semibold">SPOTSLINE</h5>
            <p className="font-slogan text-xs md:text-sm">Se ve bien.</p>
          </div>
          <form onSubmit={handleSubmit} className="z-20 flex flex-col items-center gap-4 md:w-full">
            <BasicInput
              name="email"
              type="email"
              label="Correo electrónico"
              startContentIcon="ri-mail-fill text-xl text-secondary"
              isInvalid={Boolean(errs.email)}
              errorMessage={errs.email}
              onChange={handleChange}
            />
            <PasswordInput
              name="password"
              label="Contraseña"
              isInvalid={Boolean(errs.password)}
              errorMessage={errs.password}
              onChange={handleChange}
            />
            <DefaultButton
              isDisabled={Object.values(errs)?.length || !Object.values(signInData)?.length ? true : false}
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
            <AwsImage type="logos" identify="logoBlack" className="!-z-10 w-80 -rotate-12 !opacity-50 xl:w-[30vw]" />
          </div>
        </section>
      </div>

      <InitChangePasswordModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </main>
  );
}
