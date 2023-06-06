import { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

import PwdInput from "../Common/input/PwdInput";
import { resetPassword } from "../../api/user.api";
import { checkResetTokenApi } from "../../api/auth.api";
import AuthFormTemplate from "./AuthFormTemplate";
import AuthBtn from "./AuthBtn";
import PwdRule from "./pwdRule/PwdRule";
import VerifyState from "./verify/VerifyState";
import { sendEmail } from "src/api/auth.api";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { commonActions } from "src/store/slice/Common.slice";
import { authImgList } from "../../assets/authImg";
import BackdropLoading from "../Common/BackdropLoading";
interface FormValue {
  password?: string;
  email?: string;
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, checkLinkTokenLoading } = useAppSelector(
    (state) => state.common
  );
  const [isVerified, setIsVerified] = useState(true);
  const params = useParams();
  const { token } = params as { token: string };
  const methods = useForm<FormValue>();
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValue> = async (data, event) => {
    {
      /* 這邊取得id來做額外判斷是因為AuthBtn本身不只是用來做重設密碼而已，他還有被用來發email，所以要用id來判斷現在他是什麼用途才能執行相對應的正確邏輯 */
    }
    const targetId = (event?.nativeEvent as { submitter: any }).submitter?.id;
    targetId === "ResetPassword"
      ? await handleRestPassword(data.password!)
      : await handleSendResetLink(data.email!);
  };

  const handleRestPassword = async (password: string) => {
    try {
      dispatch(commonActions.setLoading(true));
      await resetPassword({ token, password });
      dispatch(commonActions.setLoading(false));

      toast.success("Password reset successfully!");
      navigate("/auth/welcome");
    } catch (error) {
      dispatch(commonActions.setLoading(false));

      const err = ((error as AxiosError).response?.data as { detail: string })
        .detail;
      toast.error(err);

      setIsVerified(false);
    }
  };

  const handleSendResetLink = async (email: string) => {
    try {
      dispatch(commonActions.setLoading(true));
      await sendEmail({ email, token_type: "reset_pwd" });
      dispatch(commonActions.setLoading(false));

      navigate("/auth/reset-password/notification", {
        state: { email, type: "reset password" },
        replace: true,
      });
    } catch (error) {
      dispatch(commonActions.setLoading(false));

      const err = ((error as AxiosError).response?.data as { detail: string })
        .detail;
      dispatch(commonActions.setError(err));

      toast.error(err);
    }
  };
  const handleCheckIfTokenIsValid = async () => {
    try {
      dispatch(commonActions.setCheckLinkTokenLoading(true));
      await checkResetTokenApi({ token });
      dispatch(commonActions.setCheckLinkTokenLoading(false));

      setIsVerified(true);
    } catch (error) {
      dispatch(commonActions.setCheckLinkTokenLoading(false));
      setIsVerified(false);
    }
  };
  useEffect(() => {
    handleCheckIfTokenIsValid();
  }, []);
  return (
    <>
      {checkLinkTokenLoading ? (
        <BackdropLoading />
      ) : (
        <FormProvider {...methods}>
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            {isVerified ? (
              <AuthFormTemplate
                mainTitle="Reset your password"
                subTitle="Don't forget again"
                imgUrl={authImgList.reset_pwd}
                alt="resetImg"
              >
                <PwdInput
                  label="New Password"
                  errors={errors}
                  field="password"
                  validation={["required", "passwordValidation"]}
                />
                <PwdRule />
                <AuthBtn btnText="Submit" id="ResetPassword" />
              </AuthFormTemplate>
            ) : (
              <VerifyState isVerified={isVerified} />
            )}
          </FormContainer>
        </FormProvider>
      )}
    </>
  );
};

const FormContainer = styled.form``;

export default ResetPassword;
