import React, { useState } from "react";
import styled from "styled-components";
import cl from "../constants/color/color";

import { motion } from "framer-motion";
import { productListMotion } from "../lib/motion";

import { popularProducts } from "../data/data";
import SingleProduct from "../components/Product/SingleProduct";
import Select from "../components/Product/Select";
import Filter from "../components/Product/Filter";
import Pagination from "../components/Common/Pagination";
import { sortOptions } from "../data/sortOptions";

const ProductList = () => {
  const [filterV, setFilter] = useState(1);

  const [activeSort, setActiveSort] = useState(false);
  const [activeFilter, setActiveFilter] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [selectedVal, setSelectedVal] = useState("");

  const handleActiveSort = (params: { name: string; val: string }) => {
    if (activeFilter) setActiveFilter(false);
    setActiveSort(!activeSort);
    if (params) {
      setSelectedName(params.name);
      setSelectedVal(params.val);
    }
  };
  const handleActiveFilter = () => {
    if (activeSort) setActiveSort(false);
    setActiveFilter(!activeFilter);
  };

  return (
    <Container as={motion.div} {...productListMotion}>
      <Wrapper>
        <Top>
          <PageTitle>All Products</PageTitle>
          <button style={{ color: "red" }} onClick={() => setFilter(5)}>
            點我filter1
          </button>
          <button style={{ color: "orange" }} onClick={() => setFilter(10)}>
            點我filter2
          </button>
          <Func>
            <Filter active={activeFilter} handleActive={handleActiveFilter} />
            <Select
              fullWidth={false}
              listData={sortOptions}
              selectedName={selectedName}
              selectedVal={selectedVal}
              active={activeSort}
              handleActive={handleActiveSort}
            />
          </Func>
        </Top>
        <ItemContainer as={motion.div} layout>
          {popularProducts
            .filter((i) => (filterV < 6 ? i.id < 6 : i.id > 6))
            .map((item) => (
              <ItemBox>
                <SingleProduct item={item} />
              </ItemBox>
            ))}
        </ItemContainer>
        <Pagination itemsPerPage={4} />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  padding: 10rem 0;
  border-bottom: 1px solid ${cl.mainGray};
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1400px;
  /* background: coral; */
`;
const Top = styled.div`
  display: flex;
  @media (max-width: 950px) {
    display: block;
  }
  justify-content: space-between;
  align-items: center;
  max-width: 1150px;
  /* background: red; */
  margin: 0 auto 2rem auto;
  padding: 2rem;
`;
const PageTitle = styled.h1`
  /* margin-bottom: 2rem;
  padding-left: 7.5rem; */
`;
const Func = styled.div`
  display: flex;
  @media (max-width: 950px) {
    display: block;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;
const ItemBox = styled.div`
  flex-basis: 20%;
`;
export default ProductList;
