import { AxiosError } from "axios";
import toast from "react-hot-toast";

import { AppThunk } from "../../store";
import { addToCartApi } from "src/api/user.api";
import { commonActions } from "../../slice/Common.slice";
import { cartActions } from "../../slice/Cart.slice";

interface IProps {
  id: string;
  addOne?: boolean;
  size: string;
}
const addToCart = ({ id, addOne, size }: IProps): AppThunk => {
  const getToken = () => localStorage.getItem("token");

  return async (dispatch, getState) => {
    if (!getToken()) return toast.error("You need to login");

    const { itemQty } = getState().common;

    const qty = addOne ? 1 : itemQty;

    try {
      dispatch(commonActions.setAddToCartLoading(true));

      await addToCartApi({ product_id: id, qty, size });
      dispatch(cartActions.setCartLength(qty));

      toast.success("Add Product To Cart");

      dispatch(commonActions.setShowPopup(false));

      dispatch(commonActions.setAddToCartLoading(false));
    } catch (error) {
      dispatch(commonActions.setAddToCartLoading(false));

      const err = ((error as AxiosError).response?.data as { detail: string })
        .detail;
      toast.error(err);
    }
  };
};
export default addToCart;
