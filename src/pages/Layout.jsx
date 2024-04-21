import { useEffect, Suspense } from "react";
import { getOfStorage, saveInStorage } from "src/utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { addAuthWithToken, APISpot } from "src/api";
import { setUser } from "src/redux/reducers/user";
import { Spinner } from "@nextui-org/react";
import { actionsShoppingCart, actionsAuth, actionSeller } from "src/redux/reducers";
import AuthValidationModal from "src/components/modals/AuthValidationsModal";
import { useDebouncedCallback } from "use-debounce";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const reduxUser = useSelector((state) => state.user);

  const loadUserData = async (access_token, email) => {
    try {
      const { user, shoppingCart } = await APISpot.auth.jwtAutoSignIn({ jwt: access_token, email });

      if (user) {
        dispatch(setUser(user));

        if (user.web_role === Number(import.meta.env.VITE_SELLER_ROLE)) {
          //? Si el usuario loggeado es SELLER TENGO QUE TRAERME LE SHOPPIN CART DEL MANAGED USER
        } else if (shoppingCart) {
          //? Si el usuario loggeado y no es SELLER tiene un shopping cart guardado en DB lo cargo en redux
          dispatch(actionsShoppingCart.loadCart(shoppingCart));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const autoSaveShoppingCart = useDebouncedCallback(() => {
    if (!reduxUser.id) return;

    let storageCart = getOfStorage("shoppingCart");
    console.log("Me llamaron");
    saveInStorage("me_llamaron", true);

    return APISpot.cart.updateCart({
      ...storageCart,
      items:
        storageCart.items.map((item) => {
          return { ...item, productId: item.id ?? item.productId };
        }) ?? [],
      userId: reduxUser.id,
      coupon: false,
    });
    //? Para no hacer pedidos duplicados espera 1s
  }, [1000]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // La pestaña está oculta
        autoSaveShoppingCart();
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);

    const saveInterval = setInterval(() => {
      autoSaveShoppingCart();
    }, 30000);

    return () => {
      clearInterval(saveInterval);

      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const user = getOfStorage("user");
    const access_token = getOfStorage("access_token");
    const managedClient = getOfStorage("managedClient");

    //? El usuario ya estaba loggeado
    if (access_token && user) {
      addAuthWithToken(access_token);
      dispatch(actionsAuth.setAccessToken(access_token));

      loadUserData(access_token, user.email);

      if (user.web_role === Number(import.meta.env.VITE_SELLER_ROLE) && managedClient) {
        dispatch(actionSeller.selectClientToManage(managedClient));
      }
    }
  }, []);

  return (
    <Suspense fallback={<Spinner color="primary" className="absolute inset-0 !z-50 text-xl" />}>
      <AuthValidationModal />
      {children}
    </Suspense>
  );
}
