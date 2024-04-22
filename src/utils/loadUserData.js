import { APISpot } from "src/api";
import { actionSeller, actionsShoppingCart, actionsUser } from "src/redux/reducers";

export const loadUserData = async (dispatch, access_token, email, managedClient) => {
  try {
    //? Si existe managedClient lo mando para que junte los datos del vendedor y del usuario
    const { user, shoppingCart } = await APISpot.auth.jwtAutoSignIn({
      jwt: access_token,
      email,
      managedClient: managedClient?.id !== "" ? managedClient : false,
    });

    if (user.web_role === null) {
      loadUserData(dispatch, access_token, email, managedClient);
    }

    if (user) {
      dispatch(actionsUser.setUser(user));

      if (shoppingCart) {
        //? Si el usuario loggeado y no es SELLER tiene un shopping cart guardado en DB lo cargo en redux
        dispatch(actionsShoppingCart.loadCart(shoppingCart));
      }
      if (user.web_role === Number(import.meta.env.VITE_SELLER_ROLE) && managedClient) {
        dispatch(actionSeller.selectClientToManage(managedClient));
      }
    }
  } catch (err) {
    console.log(err);
  }
};
