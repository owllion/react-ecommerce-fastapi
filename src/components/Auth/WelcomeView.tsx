import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGoogleLogin } from "@react-oauth/google";
import { AnyAction } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoMdMail } from "react-icons/io";
import { AiFillFacebook } from "react-icons/ai";
import { DiGithubBadge } from "react-icons/di";
import cl from "../../constants/color/color";
import { authImgList } from "../../assets/authImg";
import { Btn, BtnText } from "./auth.style";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";

import { googleLogin } from "src/store/actions/auth/googleLogin.action";
import AuthFormTemplate from "./AuthFormTemplate";
import { useUpdateEffect } from "../../hooks/useUpdateEffect";
import { githubLoginApi } from "../../api/auth.api";
import Lottie from "../Common/Lottie";
import BackdropLoading from "../Common/BackdropLoading";
import { commonActions } from "../../store/slice/Common.slice";

const WelcomeView = () => {
  const { isLoading } = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const googleLoginHandler = async (access_token: string) => {
    try {
      await dispatch(googleLogin(access_token) as unknown as AnyAction);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse: Record<string, string>) => {
      await googleLoginHandler(tokenResponse.access_token);
    },
  });
  const loginWithGithub = async () => {
    dispatch(commonActions.setLoading(true));
    const { data } = await githubLoginApi();
    dispatch(commonActions.setLoading(false));

    window.location.href = data;
  };
  useEffect(() => {
    // console.log(isLoading, "現在是true??");
  }, [isLoading]);
  return (
    <>
      {isLoading ? (
        <BackdropLoading />
      ) : (
        <AuthFormTemplate
          mainTitle="Welcome!"
          subTitle="Sign Up or Sign In"
          imgUrl={authImgList.welcome}
          alt="welcomeImg"
        >
          <LoginBtnBox onClick={() => loginWithGoogle()}>
            <LoginBtn shadow>
              <FcGoogle />
              <BtnText color={`${cl.textLightGray}`}>Login with Google</BtnText>
            </LoginBtn>
          </LoginBtnBox>

          <LoginBtnBox onClick={() => loginWithGithub()}>
            <LoginBtn shadow>
              <DiGithubBadge />
              <BtnText color={`${cl.textLightGray}`}>Login with Github</BtnText>
            </LoginBtn>
          </LoginBtnBox>

          <Divider>OR</Divider>
          <LoginBtnBox>
            <Link to={"/auth/check-email"}>
              <LoginBtn bgColor="black">
                <IoMdMail />
                <BtnText>Login with Email</BtnText>
              </LoginBtn>
            </Link>
          </LoginBtnBox>
        </AuthFormTemplate>
      )}
    </>
  );
};

const LoginBtnBox = styled.div``;
const LoginBtn = styled(Btn)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 1.4rem;
`;
const Divider = styled.p`
  text-align: center;
  color: #707070;
  margin: 1rem 0;
`;

export default WelcomeView;
