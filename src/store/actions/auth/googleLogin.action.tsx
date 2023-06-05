import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { AnyAction } from "@reduxjs/toolkit";

import { commonActions } from "../../slice/Common.slice";
import { AppThunk } from "../../store";
import { googleLoginApi } from "src/api/auth.api";
import { IUserInfo } from "src/interface/user.interface";
import { authRelatedAction } from "./authRelatedAction.action";
import { IAuthResult } from "./signInOrSignUp.action";

export const googleLogin = (access_token: string): AppThunk => {
  return async (dispatch) => {
    dispatch(commonActions.setLoading(true));
    try {
      const {
        data: { token: access_Token, refresh_token, user, cart_length },
      }: {
        data: IAuthResult;
      } = await googleLoginApi({ access_token });

      dispatch(
        authRelatedAction({
          user,
          token: access_Token,
          refreshToken: refresh_token,
          cartLength: cart_length,
          type: "google",
        }) as unknown as AnyAction
      );

      dispatch(commonActions.setLoading(false));

      toast.success("You have signed in successfully!");
    } catch (error) {
      dispatch(commonActions.setLoading(false));

      const err = ((error as AxiosError).response?.data as { detail: string })
        .detail;
      toast.error(err);
      throw new Error(err);
    }
  };
};
