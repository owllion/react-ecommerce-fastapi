import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const Login = () => {
  return (
    <Container>
      <LoginContainer>
        <Outlet />
      </LoginContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 10rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoginContainer = styled.div`
  padding: 40px 24px;
  width: 100%;
  max-width: 400px;
  svg {
    max-width: 80px;
    height: 100%;
  }
  @media (max-width: 767px) {
    justify-content: flex-start;
  }
  @media (min-width: 768px) {
    box-shadow: 0 0.1rem 0.5rem rgba(0, 0, 0, 0.15);
  }
`;
export default Login;
