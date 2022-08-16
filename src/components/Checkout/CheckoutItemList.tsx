import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

import { useAppSelector } from "../../store/hooks";
import cl from "src/constants/color/color";
import { baseInput } from "../Product/Review/ReviewForm";
import { SectionTitle } from "../Checkout/form/payment-form/PaymentForm.style";
import ClearInputBtn from "../Common/button/ClearInputBtn";
import { useCartTotal } from "../../hooks/useCartTotal";
import ApiError from "../error/ApiError";

import { applyCoupon } from "../../api/user.api";
import { useAppDispatch } from "../../store/hooks";
import { commonActions } from "../../store/slice/Common.slice";
import { checkoutActions } from "../../store/slice/Checkout.slice";
import OrderDetailSummary from "../UserSetting/OrderDetailSummary";

const CheckoutItemList = () => {
  const dispatch = useAppDispatch();
  const [code, setCode] = useState("");
  const { shipping, discountTotal, discount } = useAppSelector(
    (state) => state.checkout
  );

  const { cartList } = useAppSelector((state) => state.cart);
  const { errorMsg } = useAppSelector((state) => state.common);
  const { isLoading } = useAppSelector((state) => state.common);
  const total = useCartTotal(cartList);

  const codeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const clearInputHandler = () => {
    setCode("");
    dispatch(commonActions.setErrorClear());
  };
  interface IApplyCoupon {
    data: {
      discountTotal: number;
      discount: number;
    };
  }
  const applyCouponHandler = async () => {
    try {
      dispatch(commonActions.setLoading(true));
      const {
        data: { discountTotal, discount },
      }: IApplyCoupon = await applyCoupon({ code, totalPrice: total });

      dispatch(
        checkoutActions.setDiscountInfo({
          discount,
          discountCode: code,
          discountTotal,
        })
      );

      setCode("");
      dispatch(commonActions.setLoading(false));
      dispatch(commonActions.setErrorClear());
    } catch (error) {
      dispatch(commonActions.setLoading(false));
      const err = ((error as AxiosError).response?.data as { msg: string }).msg;
      dispatch(commonActions.setError(err));
      toast.error(err);
    }
  };

  useEffect(() => {
    dispatch(commonActions.setErrorClear());

    const countShipping = total > 1000 ? 0 : 20;
    dispatch(
      checkoutActions.setTotalAndShipping({ total, shipping: countShipping })
    );
  }, [total]);

  return (
    <Container>
      <SectionTitle>ORDER SUMMARY</SectionTitle>
      <OrderDetailSummary
        needContainer={false}
        itemList={cartList}
        discount={discount}
        shipping={shipping}
        total={total}
        discountTotal={discountTotal}
      />
      <PromoCodeContainer>
        <CodeInputBox>
          <CodeInput
            disabled={discount !== 0}
            value={code}
            placeholder="Your promo code"
            onChange={(e) => codeHandler(e)}
            hasError={errorMsg}
          />
          {code && <ClearInputBtn clearInputHandler={clearInputHandler} />}
        </CodeInputBox>

        <ApplyBtn
          disabled={isLoading || !code}
          onClick={() => applyCouponHandler()}
        >
          APPLY
        </ApplyBtn>
      </PromoCodeContainer>
      <ApiErrorBox>
        <ApiError />
      </ApiErrorBox>
    </Container>
  );
};

const Container = styled.div`
  flex-basis: 50%;
`;
const PromoCodeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3rem;
  width: 100%;
  @media (max-width: 1024px) {
    padding: 0;
  }
`;
const CodeInputBox = styled.div`
  position: relative;
  flex: 4;
  margin-right: 0.8rem;
`;
const CodeInput = styled.input<{ hasError: string }>`
  ${baseInput}
  ${({ hasError }) => hasError && "border:1px solid red"}
`;
export const ApplyBtn = styled.button`
  border-radius: 5px;
  background: ${cl.green};
  color: ${cl.white};
  padding: 0.8rem;
  flex: 1;
  cursor: pointer;
`;
export const ApiErrorBox = styled.div`
  padding: 0.5rem 0;
`;
export default CheckoutItemList;
