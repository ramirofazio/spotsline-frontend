import { useEffect, Suspense } from "react";
import Loader from "src/components/Loader";
import { FirstSignInModal } from "./signIn";
import { getOfStorage, saveInStorage } from "src/utils/localStorage";
import { setAccessToken } from "src/redux/reducers/auth";
import { useDispatch } from "react-redux";
import { addAuthWithToken, APISpot } from "src/api";
import { setUser } from "src/redux/reducers/user";
import { ChangePasswordModal } from "./signIn/ChangePasswordModal";
import { useDisclosure } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { actionsShoppingCart } from "src/redux/reducers";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const reset = Boolean(params.get("reset"));
  const query_access_token = params.get("access_token");
  const query_email = params.get("email");

  const { onOpen, onOpenChange, isOpen, onClose } = useDisclosure();

  const getUserFromDb = async (access_token, email) => {
    try {
      const { user, shoppingCart } = await APISpot.auth.jwtAutoSignIn({ jwt: access_token, email });

      if (user) {
        if (Object.keys(shoppingCart)?.length) {
          console.log("SI TENIA", shoppingCart);
          shoppingCart.subtotal = parseFloat(shoppingCart.subtotal);
          shoppingCart.total = parseFloat(shoppingCart.total);
          shoppingCart.items = shoppingCart.items.map((itm) => {
            return { ...itm, price: parseFloat(itm.price) };
          });
          dispatch(actionsShoppingCart.loadCart(shoppingCart));
          saveInStorage("shoppingCart", shoppingCart);
        } else {
          let storageCart = getOfStorage("shoppingCart");
          storageCart && delete storageCart.id;
          if (storageCart && Object.keys(storageCart)?.length) {
            return await APISpot.cart.createCart(storageCart);
          } else {
            return await APISpot.cart.createCart({
              userId: user.id,
              discount: 0,
              subtotal: 0,
              total: 0,
              coupon: false,
              items: [],
            });
          }
        }

        dispatch(setUser(user));
        window.addEventListener("beforeunload", () => {
          const shoppingCart = getOfStorage("shoppingCart");
          if (shoppingCart.modified) {
            return APISpot.cart.updateCart(shoppingCart);
          }
        });
      }
    } catch (err) {
      console.log(err);
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
    } else {
      // * ShoppingCart para usuario no logueado
      const shoppingCart = getOfStorage("shoppingCart");
      if (shoppingCart) {
        dispatch(actionsShoppingCart.loadCart(shoppingCart));
      }
    }

    return () => {
      // * Por si acaso se guardad el cart en le "componentDidUnmount"
      window.removeEventListener("beforeunload", () => {});
      // ? En caso de que no funcione "beforeunload"
      // const updatedCart = getOfStorage("shoppingCart");
      // return APISpot.cart.updateCart(updatedCart);
    };
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
