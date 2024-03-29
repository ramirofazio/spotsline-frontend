import { useEffect, Suspense } from "react";
import Loader from "src/components/Loader";
import { FirstSignInModal } from "./signIn";
import { getOfStorage } from "src/utils/localStorage";
import { setAccessToken } from "src/redux/reducers/auth";
import { useDispatch } from "react-redux";
import { addAuthWithToken, APISpot } from "src/api";
import { setUser } from "src/redux/reducers/user";
import { ChangePasswordModal } from "./signIn/ChangePasswordModal";
import { useDisclosure } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { actionsShoppingCart } from "src/redux/reducers";
import { assets } from "src/assets";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const reset = Boolean(params.get("reset"));
  const query_access_token = params.get("access_token");
  const query_email = params.get("email");

  const { onOpen, onOpenChange, isOpen, onClose } = useDisclosure();

  const getUserFromDb = async (access_token, email) => {
    const { user } = await APISpot.auth.jwtAutoSignIn({ jwt: access_token, email });

    if (user) {
      dispatch(setUser(user));
    }
  };

  useEffect(() => {
    //? change password logic
    if (reset && query_access_token && query_email) {
      addAuthWithToken(query_access_token);
      onOpen();
    }

    //? first time signIn logic
    const access_token = getOfStorage("access_token");
    const user = getOfStorage("user");

    if (access_token && user) {
      addAuthWithToken(access_token);
      dispatch(setAccessToken(access_token));
      getUserFromDb(access_token, user.email);
    }

    //? Shopping Cart
    const shoppingCart = getOfStorage("shoppingCart");

    if (shoppingCart) {
      dispatch(actionsShoppingCart.loadCart(shoppingCart));
    }

    window.addEventListener("beforeunload", () => {
      if (access_token && user && shoppingCart) {
        //? Logica guardar carrito en DB `CREO`
      }
    });

    // !BORRAR;
    //dispatch(actionsShoppingCart.applyDiscount(20));
    dispatch(
      actionsShoppingCart.addItemToCart({
        id: 12,
        name: "Articulo SPT.",
        img: assets.lights.light,
        price: 12831.43,
        quantity: 1,
      })
    );
  }, [document]);

  return (
    <Suspense fallback={<Loader />}>
      <ChangePasswordModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        navigate={navigate}
        email={query_email}
        onClose={onClose}
      />
      <FirstSignInModal navigate={navigate} />
      {children}
    </Suspense>
  );
}
