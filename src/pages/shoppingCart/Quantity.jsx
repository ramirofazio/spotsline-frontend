import { Button } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { actionsShoppingCart } from "src/redux/reducers";

export default function Quantity({ qty, id, productId }) {
  const MAX_AMOUNT = 15;
  const dispatch = useDispatch();
  return (
    <>
      <Button
        isIconOnly
        radius="full"
        className={`flex bg-dark text-xl  text-primary ${qty === 1 && "bg-red-600"}`}
        onPress={() => dispatch(actionsShoppingCart.updateCartItemQuantity({ id: id ?? productId, quantity: qty - 1 }))}
      >
        <i className="ri-subtract-line" />
      </Button>
      <p>{qty}</p>
      <Button
        isIconOnly
        radius="full"
        disabled={qty >= MAX_AMOUNT ? true : false}
        className={`flex bg-dark text-xl font-bold text-primary disabled:opacity-50 ${
          qty >= MAX_AMOUNT && "pointer-events-none"
        }`}
        onPress={() => dispatch(actionsShoppingCart.updateCartItemQuantity({ id: id ?? productId, quantity: qty + 1 }))}
      >
        <i className="ri-add-line" />
      </Button>
    </>
  );
}
