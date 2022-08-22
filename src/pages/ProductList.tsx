import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useLocation, useSearchParams } from "react-router-dom";
import { AnyAction } from "redux";

import cl from "../constants/color/color";
import { productListMotion, productItemMotion } from "../lib/motion";
import { sortOptions } from "../data/sortOptions";
import SingleProduct from "../components/Product/SingleProduct";
import Select from "../components/Product/Select";
import Filter from "../components/Product/Filter";
import Pagination from "../components/Common/Pagination";
import Lottie from "../components/Common/Lottie";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { productActions } from "../store/slice/Product.slice";
import getProductList from "../store/actions/product/getProductList.action";
import { IProduct } from "../interface/product.interface";
import { useUpdateEffect } from "../hooks/useUpdateEffect";
import { useMatchMedia } from "../hooks/useMatchMedia";

const ProductList = () => {
  const {
    totalNum,
    productList,
    selectedSort,
    selectedBrand,
    selectedPrice,
    selectedCategory,
  } = useAppSelector((state) => state.product);
  const { isLoading } = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();
  const [keyword, setKeyword] = useState("");
  const [searchParams] = useSearchParams();
  const [activeSort, setActiveSort] = useState(false);
  const [activeFilter, setActiveFilter] = useState(false);
  const [sortBy, setSortBy] = useState("");

  const handleActiveSort = () => {
    if (activeFilter) setActiveFilter(false);
    setActiveSort(!activeSort);
  };
  const handleActiveFilter = () => {
    if (activeSort) setActiveSort(false);
    setActiveFilter(!activeFilter);
  };
  const handleSetSelected = (params: { name: string; val: string }) => {
    if (params.name && params.val) {
      setSortBy(params.name);
      dispatch(productActions.setSort(params.val));
    }
    handleActiveSort();
  };

  const handlePageClick = (event: { selected: number }) => {
    dispatch(productActions.setCurPage(event.selected + 1));
    dispatch(getProductList("") as unknown as AnyAction);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isTargetWidth = useMatchMedia("1200px");

  useUpdateEffect(() => {
    console.error("Selected:-start ", new Date());

    console.log("selected執行");
    dispatch(productActions.setCurPage(1));
    dispatch(getProductList(keyword) as unknown as AnyAction);
    console.warn("Selected-end:- ", new Date());
  }, [selectedCategory, selectedBrand, selectedPrice]);

  useUpdateEffect(() => {
    console.warn("Sort&width:-start ", new Date());
    dispatch(getProductList(keyword) as unknown as AnyAction);
    console.warn("Sort&width:-end ", new Date());
  }, [selectedSort, isTargetWidth]);

  // useUpdateEffect(() => {
  //   console.log("selected執行");
  // }, [selectedCategory, selectedBrand, selectedPrice]);

  // useUpdateEffect(() => {
  //   console.log("targetWidth 執行");
  // }, [isTargetWidth]);
  // useUpdateEffect(() => {
  //   console.log("sort 執行");
  // }, [selectedSort]);

  useEffect(() => {
    console.log("路由useEffect執行");
    // const currentParams = Object.fromEntries([...searchParams]);
    // dispatch(productActions.clearAllState());

    // currentParams.keyword && setKeyword(currentParams.keyword);
    // currentParams.category &&
    //   dispatch(productActions.setCategory(currentParams.category));
    // dispatch(productActions.setCurPage(1));
    // dispatch(getProductList(currentParams.keyword) as unknown as AnyAction);
  }, [searchParams]);

  return (
    <>
      <Container as={motion.div} {...productListMotion}>
        <Wrapper>
          <Top>
            <PageTitle>All Products</PageTitle>
            <Func>
              <Filter active={activeFilter} handleActive={handleActiveFilter} />
              <Select
                fullWidth={false}
                listData={sortOptions}
                selectedName={sortBy}
                selectedVal={selectedSort}
                active={activeSort}
                handleActive={handleActiveSort}
                handleSetSelected={handleSetSelected}
              />
            </Func>
          </Top>

          {productList.length > 0 && (
            <>
              <ItemContainer as={motion.div} layout>
                {productList.map((item, _) => (
                  <ItemBox key={item.productId}>
                    {Object.keys(item).length > 0 ? (
                      <SingleProduct item={item as IProduct} />
                    ) : (
                      <Spacer as={motion.div} layout {...productItemMotion} />
                    )}
                  </ItemBox>
                ))}
              </ItemContainer>

              <Pagination
                itemsPerPage={12}
                itemsLength={totalNum}
                handlePageClick={handlePageClick}
              />
            </>
          )}

          {!isLoading && productList.length === 0 && (
            <Lottie jsonName={"productNotFound"} />
          )}
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 10rem 0;
  border-bottom: 1px solid ${cl.mainGray};
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1400px;
`;
const Top = styled.div`
  display: flex;
  @media (max-width: 950px) {
    display: block;
  }
  justify-content: space-between;
  align-items: center;
  max-width: 1150px;
  margin: 0 auto 2rem auto;
  padding: 2rem;
`;
const PageTitle = styled.h1``;
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
export const Spacer = styled.i.attrs({
  "aria-hidden": "true",
})`
  min-width: 260px;
`;

export default ProductList;
