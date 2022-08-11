import { AxiosError } from "axios";
import toast from "react-hot-toast";
import styled from "styled-components";

import { addToCartApi } from "../../api/user.api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { cartActions } from "../../store/slice/Cart.slice";

interface IProps {
  productId: string;
  size: string;
}
const AddToCartBtn = ({ productId, size }: IProps) => {
  const dispatch = useAppDispatch();
  const { itemQty } = useAppSelector((state) => state.common);
  const getToken = () => localStorage.getItem("token");
  const addToCart = async () => {
    if (!getToken()) return toast.error("You need to login");
    try {
      await addToCartApi({ productId, qty: itemQty, size });
      dispatch(cartActions.setCartLength(itemQty));
      toast.success("Add Product To Cart");
    } catch (error) {
      const err = ((error as AxiosError).response?.data as { msg: string }).msg;
      toast.error(err);
    }
  };
  return <Container onClick={() => addToCart()}>Add To Cart</Container>;
};

const Container = styled.button`
  all: unset;
  width: 100px;
  height: 30px;
  font-size: 16px;
  background: transparent;
  border: none;
  position: relative;
  color: #f0f0f0;
  cursor: pointer;
  z-index: 1;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &::after,
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: -99999;
    transition: all 0.4s;
  }

  &::before {
    transform: translate(0%, 0%);
    width: 100%;
    height: 100%;
    background: #28282d;
    border-radius: 10px;
  }

  &::after {
    transform: translate(10px, 10px);
    width: 35px;
    height: 35px;
    background: #ffffff15;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border-radius: 50px;
  }

  &:hover::before {
    transform: translate(5%, 20%);
    width: 110%;
    height: 110%;
  }

  &:hover::after {
    border-radius: 10px;
    transform: translate(0, 0);
    width: 100%;
    height: 100%;
  }

  &:active::after {
    transition: 0s;
    transform: translate(0, 5%);
  }
`;

export default AddToCartBtn;
