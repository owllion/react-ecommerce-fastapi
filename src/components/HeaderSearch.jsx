import React from "react";
import styled from "styled-components";
import { IoMdClose, IoIosSearch } from "react-icons/io";
import searchImg from "../assets/search/search.svg";

const Search = () => {
  return (
    <Container>
      <CloseBtnBox>
        <CloseBtn>
          <IoMdClose />
        </CloseBtn>
      </CloseBtnBox>
      <InputContainer>
        <InputBox>
          <SearchInput placeholder="Type your search here" />
        </InputBox>
        <SearchSubLine>Enter your search & hit enter</SearchSubLine>
      </InputContainer>
      <ImgContainer>
        <ImgBox>
          <Img src={searchImg} />
        </ImgBox>
      </ImgContainer>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgb(255, 255, 255);
  transition: all 0.5s cubic-bezier(0.4, 0.4, 0, 1), height 0.01s ease;
  overflow-y: auto;
`;
const CloseBtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 2rem;
`;
const CloseBtn = styled.button`
  cursor: pointer;
  font-size: 1rem;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 50%;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5rem 10rem 1rem 10rem;
  @media (max-width: 767px) {
    padding: 2rem 1.2rem;
  }
`;
const InputBox = styled.div``;
const SearchInput = styled.input`
  transition: all 0.7s cubic-bezier(0.4, 0.4, 0, 1);
  font-size: 3.5rem;
  border: none;
  width: 70%;
  @media (max-width: 500px) {
    width: 100%;
    font-size: 1.5rem;
  }
  &:focus {
    outline: transparent;
  }
`;
const SearchSubLine = styled.h5`
  color: rgba(0, 0, 0, 0.5);
  font-weight: 400;
  font-size: 1.5rem;
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;
const ImgContainer = styled.div`
  position: absolute;
  right: 10px;
  bottom: 20px;
  padding: 5rem;
  @media (max-width: 767px) {
    padding: 0;
  }
`;
const ImgBox = styled.div`
  width: 700px;
  @media (max-width: 1300px) {
    width: 500px;
  }
  @media (max-width: 500px) {
    width: 300px;
  }
`;
const Img = styled.img`
  width: 100%;
`;
export default Search;
