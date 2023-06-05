import React from "react";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner ";
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 24px;
`;
const LoadingText = styled.span`
  margin-left: 1rem;
`;

const BackdropLoading = () => {
  return (
    <>
      <Backdrop>
        <SpinnerContainer>
          <LoadingSpinner />
          <LoadingText>Loading...</LoadingText>
        </SpinnerContainer>
      </Backdrop>
    </>
  );
};

export default BackdropLoading;
