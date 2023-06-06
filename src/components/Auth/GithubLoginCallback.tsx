import { useState, useEffect } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../store/hooks";
import { IAuthResult } from "../../store/actions/auth/signInOrSignUp.action";
import { authRelatedAction } from "../../store/actions/auth/authRelatedAction.action";
import { commonActions } from "../../store/slice/Common.slice";

import { githubAuthApi } from "../../api/auth.api";
import BackdropLoading from "../Common/BackdropLoading";
const GithubLoginCallback = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isVerified, setIsVerified] = useState(true);

  const verifyToken = async () => {
    try {
      dispatch(commonActions.setLoading(true));
      const {
        data: { token: accessToken, refresh_token, user, cart_length },
      }: {
        data: IAuthResult;
      } = await githubAuthApi({ reqUrl: window.location.toString() });
      setIsVerified(true);
      dispatch(
        authRelatedAction({
          user,
          token: accessToken,
          refreshToken: refresh_token,
          cartLength: cart_length,
          type: "github",
        }) as unknown as AnyAction
      );
      dispatch(commonActions.setLoading(false));
      navigate("/");
    } catch (error) {
      dispatch(commonActions.setLoading(false));
      setIsVerified(false);
    }
  };
  useEffect(() => {
    verifyToken();
  }, []);

  return <BackdropLoading />;
};

export default GithubLoginCallback;
