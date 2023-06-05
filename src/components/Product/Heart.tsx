import React, { useEffect } from "react";
import styled from "styled-components";
import { AxiosError } from "axios";
import { FiHeart } from "react-icons/fi";
import { IoIosHeart } from "react-icons/io";

import { useAppDispatch } from "../../store/hooks";
import { Icon } from "./SingleProduct";
import { useAppSelector } from "../../store/hooks";
import { toggleFavApi } from "src/api/user.api";
import toast from "react-hot-toast";
import { IProduct } from "../../interface/product.interface";
import { userActions } from "../../store/slice/User.slice";
import { commonActions } from "../../store/slice/Common.slice";
import LoadingSpinner from "../Common/LoadingSpinner ";
const Heart = ({ item }: { item: IProduct | undefined }) => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.user || {});
  const { favLoading } = useAppSelector((state) => state.common || {});

  const getToken = () => localStorage.getItem("token");
  const isInList = () => {
    return favorites?.find((fav) => fav?.id === item?.id);
  };
  useEffect(() => {
    isInList();
  }, [favorites]);

  const toggleFav = async () => {
    if (!getToken()) return toast.error("You need to login");
    try {
      dispatch(commonActions.setFavLoading(true));
      const {
        data: { msg },
      }: { data: { msg: string } } = await toggleFavApi({
        product_id: item?.id!,
      });
      if (msg.includes("add")) dispatch(userActions.addToFav(item!));
      else dispatch(userActions.removeFromFav(item!));
      toast.success(msg);

      dispatch(commonActions.setFavLoading(false));
    } catch (error) {
      dispatch(commonActions.setFavLoading(false));
      const errMsg = (
        (error as AxiosError).response?.data as { detail: string }
      ).detail;
      toast.error(errMsg);
    }
  };
  return (
    <>
      {favLoading}
      <Icon onClick={() => toggleFav()} disabled={favLoading}>
        {favLoading ? (
          <LoadingSpinner />
        ) : isInList() ? (
          <IoIosHeart />
        ) : (
          <FiHeart />
        )}
      </Icon>
    </>
  );
};

export default Heart;
