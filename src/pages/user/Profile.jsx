import { Button } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { removeAuthWithToken } from "src/api";
import { actionsAuth, actionsUser } from "src/redux/reducers";

export function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userId } = useParams();

  return (
    <main>
      <Button
        onPress={() => {
          navigate("/");
          toast.info("Sesión cerrada con exito", { description: "¡Esperamos verte pronto!" });
          setTimeout(() => {
            //? Para evitar salto y que aparezca el errorBundler
            removeAuthWithToken();
            dispatch(actionsUser.cleanUser());
            dispatch(actionsAuth.cleanAuth());
          }, 1000);
        }}
      >
        Log Out
      </Button>
      <h1>User Profile de {userId}</h1>
    </main>
  );
}
