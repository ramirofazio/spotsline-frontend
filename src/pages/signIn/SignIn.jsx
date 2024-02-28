import { Button, Divider, Image, Input } from "@nextui-org/react";
import { DefaultButton } from "src/components/buttons";
import { useState } from "react";
import { isValidSignIn } from "../../utils/validation";
import { APISpot, addAuthWithToken } from "../../api";
import { useNavigate } from "react-router-dom";
import { actionsAuth, actionsUser } from "../../redux/reducers";
import { useDispatch } from "react-redux";

export function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signInData, setSignInData] = useState(false);
  const [errs, setErrs] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  function setData({ target }) {
    setSignInData((prev) => {
      const newData = { ...prev, [target.name]: target.value };
      setErrs(isValidSignIn(newData));
      return newData;
    });
  }

  async function handleSignIn(e) {
    try {
      e.preventDefault();
      console.log(signInData);
      const res = await APISpot.auth.signIn(signInData);
      const { access_token, user } = res.data;
      addAuthWithToken(access_token);
      dispatch(actionsAuth.setToken(access_token));
      dispatch(actionsUser.setUser(user));
      if (!user.firstSignIn) {
        navigate("/change-password?type=first");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <main className="bg-signIn relative h-screen bg-cover bg-center bg-no-repeat">
      <div className="grid h-full w-full place-content-center place-items-center bg-black/30 backdrop-blur-md">
        <div className="icons absolute left-4 top-4 flex items-center" onClick={() => navigate("/")}>
          <i className="ri-arrow-left-s-line yellow-neon  animate-pulse text-4xl" />
          <p className="font-secondary text-white">VOLVER</p>
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
          <form onSubmit={(e) => handleSignIn(e)} className="z-20 flex flex-col items-center gap-4 md:w-full">
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
              onChange={setData}
            />
            <Input
              color="secondary"
              name="password"
              isRequired
              size="lg"
              radius="full"
              type={isVisible ? "text" : "password"}
              label="Contraseña"
              variant="bordered"
              labelPlacement="outside"
              isInvalid={Boolean(errs.password)}
              errorMessage={errs.password}
              endContent={
                isVisible ? (
                  <i
                    className="ri-lightbulb-fill icons text-xl text-primary"
                    onClick={() => setIsVisible(!isVisible)}
                  />
                ) : (
                  <i className="ri-lightbulb-line icons text-xl" onClick={() => setIsVisible(!isVisible)} />
                )
              }
              onChange={setData}
            />

            <Button
              isDisabled={Object.values(errs)?.length || !Object.values(signInData)?.length ? true : false}
              type="submit"
              variant="solid"
              color={"primary"}
              className="w-40 rounded-full font-bold tracking-widest text-white"
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
