import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, FieldError } from "react-hook-form";

import cl from "../../constants/color/color.js";
import { MainTitle, SubTitle, Btn, BtnText } from "./Common.style";
import { baseInput, baseLabel } from "../Product/Review/ReviewForm";
import EmailImg from "../../assets/login/at-sign.png";
import FieldErr from "../error/FieldErr";
import { getValidationData } from "../Checkout/form/shipping-form/getValidationData";
import { checkIfAccountExists } from "../../api/auth.api.js";

interface FormValue {
  email: string;
}
const CheckEmail = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const methods = useForm<FormValue>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const onSubmit: SubmitHandler<FormValue> = (data) => setEmail(data.email);
  console.log(errors);

  const checkAccountHandler = async () => {
    const hasAccount = await checkIfAccountExists({ email });
    hasAccount
      ? navigate("/login/user-login")
      : navigate("/login/registration");
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <IconContainer>
        <Icon src={EmailImg} />
      </IconContainer>
      <MainTitle>What's your email?</MainTitle>
      <SubTitle>We are going to check if you already have an account</SubTitle>
      <InputBox>
        <Label>Email</Label>
        <Input
          error={errors.email}
          {...register("email", getValidationData(["required", "email"]))}
        />
        <FieldErr errors={errors} field="email" />
      </InputBox>
      <BtnBox>
        <Link to={"/login/send-link-notification"}>
          <Btn bgColor={`${cl.dark}`} onClick={checkAccountHandler}>
            <BtnText color={`${cl.white}`}>Continue</BtnText>
          </Btn>
        </Link>
      </BtnBox>
    </FormContainer>
  );
};

const FormContainer = styled.form``;
const IconContainer = styled.div`
  margin-bottom: 0.5rem;
`;
const Icon = styled.img``;
const InputBox = styled.div`
  margin: 0 0 1rem;
`;
const Input = styled.input<{ error?: FieldError }>`
  ${baseInput}
  border-color: ${({ error }) => (error ? `${cl.red}` : `${cl.gray}`)};
`;
const Label = styled.label<{ error?: FieldError }>`
  ${baseLabel}
  color: ${({ error }) => error && `${cl.red}`};
`;
const BtnBox = styled.div`
  margin-top: 1.3rem;
`;
export default CheckEmail;
