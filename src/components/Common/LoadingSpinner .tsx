import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div<{ size?: number }>`
  display: inline-block;
  width: ${(props) => (props.size ? props.size : 20)}px;
  height: ${(props) => (props.size ? props.size : 20)}px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
interface IProps {
  size?: number;
}
const LoadingSpinner = (props: IProps) => <Spinner size={props.size} />;

export default LoadingSpinner;
