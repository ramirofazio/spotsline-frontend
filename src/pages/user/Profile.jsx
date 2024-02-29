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
          removeAuthWithToken();
          dispatch(actionsUser.cleanUser());
          dispatch(actionsAuth.cleanAuth());
          navigate("/");
          toast.info("Sesión cerrada con exito", { description: "¡Esperamos verte pronto!" });
        }}
      >
        Log Out
      </Button>
      <h1>User Profile de {userId}</h1>
    </main>
  );
}
