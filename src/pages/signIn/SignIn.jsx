import { startTransition, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isValidSignIn } from "../../utils/validation";
import { APISpot, addAuthWithToken } from "../../api";
import { actionsAuth, actionsUser } from "../../redux/reducers";
import { Button, Divider, Image, Input } from "@nextui-org/react";
import { toast } from "sonner";

export function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signInData, setSignInData] = useState(false);
  const [errs, setErrs] = useState({});
  const [revealPasswordInput, setRevealPasswordInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setSignInData((prev) => {
      const newData = { ...prev, [name]: value };
      setErrs(isValidSignIn(newData));
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
      }
    } catch (error) {
      toast.error("Hubo un error al iniciar la sesion.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative h-screen bg-signIn bg-cover bg-center bg-no-repeat">
      <div className="grid h-full w-full place-content-center place-items-center bg-black/30 backdrop-blur-md">
        <div className="icons absolute left-4 top-4 flex items-center" onClick={() => navigate("/")}>
          <i className="ri-arrow-left-s-line yellow-neon  animate-pulse text-4xl" />
          <p className="white-neon font-secondary">VOLVER</p>
        </div>
        <section className="relative flex min-h-[60vh] min-w-[60vw] flex-col items-center gap-4 overflow-hidden rounded-xl bg-black/10 p-12  shadow-md">
          <div className="absolute -right-40 -top-14 -z-10 xl:-right-60 xl:-top-20">
            <Image src="/logo.png" alt="logo" className="w-80 rotate-12 xl:w-[30vw]" />
          </div>
          <div className="grid place-items-center text-center md:-mt-8">
            <Image src="/isotipoAmarillo.png" alt="logo-yellow" className="w-16 md:w-32" />
            <h5 className="-my-2 md:text-xl md:font-semibold">SPOTSLINE</h5>
            <p className="font-slogan text-xs md:text-sm">Se ve bien.</p>
          </div>
          <form onSubmit={handleSubmit} className="z-20 flex flex-col items-center gap-4 md:w-full">
            <Input
              color="secondary"
              name="email"
              isRequired
              size="lg"
              type="email"
              label="Correo electrónico"
              variant="bordered"
              labelPlacement="outside"
              radius="full"
              isInvalid={Boolean(errs.email)}
              errorMessage={errs.email}
              onChange={handleChange}
            />
            <Input
              color="secondary"
              name="password"
              isRequired
              size="lg"
              radius="full"
              type={revealPasswordInput ? "text" : "password"}
              label="Contraseña"
              variant="bordered"
              labelPlacement="outside"
              isInvalid={Boolean(errs.password)}
              errorMessage={errs.password}
              endContent={
                <i
                  className={`${
                    revealPasswordInput ? "ri-lightbulb-fill text-primary" : "ri-lightbulb-line"
                  }  icons text-xl `}
                  onClick={() => setRevealPasswordInput(!revealPasswordInput)}
                />
              }
              onChange={handleChange}
            />

            <Button
              isDisabled={Object.values(errs)?.length || !Object.values(signInData)?.length ? true : false}
              type="submit"
              variant="solid"
              color={"primary"}
              className="w-40 rounded-full font-bold tracking-widest text-white"
              isLoading={isLoading}
            >
              INGRESAR
            </Button>
          </form>
          <Divider className="my-4 bg-background" />
          <p className="text-xs font-thin text-white md:text-sm">
            ¿OLVIDASTE TU CONTRASEÑA?{" "}
            <strong
              className="yellow-neon icons underline"
              onClick={() => {
                /* //todo: Abrir modal? */
              }}
            >
              RECUPERALA
            </strong>
          </p>
          <div className="absolute -bottom-14 -left-40 -z-10 xl:-bottom-32 xl:-left-64">
            <Image src="/logo.png" alt="logo" className="w-80 -rotate-12 xl:w-[30vw]" />
          </div>
        </section>
      </div>
    </main>
  );
}
