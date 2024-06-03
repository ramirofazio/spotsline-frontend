import { useEffect, Suspense } from "react";
import { getOfStorage } from "src/utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { addAuthWithToken, APISpot } from "src/api";
import Spinner from "src/components/Spinner";
import { actionsAuth } from "src/redux/reducers";
import AuthValidationModal from "src/components/modals/AuthValidationsModal";
import { useDebouncedCallback } from "use-debounce";
import { loadUserData } from "src/utils/loadUserData";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const reduxUser = useSelector((state) => state.user);
  const shoppingCart = useSelector((state) => state.cart);

  const autoSaveShoppingCart = useDebouncedCallback(() => {
    if (!reduxUser.id) return;

    let storageCart = getOfStorage("shoppingCart");

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

  const loadUser = useDebouncedCallback(() => {
    const user = getOfStorage("user");
    const access_token = getOfStorage("access_token");
    const managedClient = getOfStorage("managedClient");

    //? El usuario ya estaba loggeado
    if (access_token && user) {
      addAuthWithToken(access_token);
      dispatch(actionsAuth.setAccessToken(access_token));

      loadUserData(dispatch, access_token, user.email, managedClient);
    }
  }, [100]);

  useEffect(() => {
    //? Para que se guarde cada vez que se modifica el estado de redux
    autoSaveShoppingCart();
  }, [shoppingCart]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // La pestaña está oculta
        autoSaveShoppingCart();
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);

    const saveInterval = setInterval(() => {
      //? salva el carrito cada 15min tiempo
      autoSaveShoppingCart();
    }, 900000);

    return () => {
      clearInterval(saveInterval);

      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <AuthValidationModal />
      {children}
    </Suspense>
  );
}
