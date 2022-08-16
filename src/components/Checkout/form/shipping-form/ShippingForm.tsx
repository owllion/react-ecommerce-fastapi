import { useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { SectionTitle } from "../payment-form/PaymentForm.style";
import { countries } from "src/data/countries";
import { getValidationData } from "./getValidationData";
import Select from "src/components/Product/Select";
import FieldErr from "src/components/error/FieldErr";
import * as SC from "./ShippingForm.style";
import PaymentForm from "../PaymentForm";
import { PayBtn } from "../payment-form/PaymentForm.style";
import { createOrder } from "src/api/user.api";
import toast from "react-hot-toast";
import { commonActions } from "../../../../store/slice/Common.slice";
import { cartActions } from "../../../../store/slice/Cart.slice";

interface FormValue {
  firstName: string;
  lastName: string;
  address: string;
  state: string;
  zip: number;
}

const ShippingForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cartList } = useAppSelector((state) => state.cart);
  const [selectedCountry, setSelectedCountry] = useState("Taiwan");
  const [active, setActive] = useState(false);

  const createOrderHandler = async (info: FormValue) => {
    try {
      dispatch(commonActions.setLoading(true));
      await createOrder({
        orderItem: cartList,
        deliveryAddress: `${info.zip} ${selectedCountry} ${info.state} ${info.address}`,
        totalPrice: 100,
        receiverName: `${info.firstName} ${info.lastName}`,
      });
      dispatch(cartActions.resetCartLength());
      dispatch(commonActions.setLoading(false));
      navigate("/checkout/order-complete", {
        replace: true,
      });
    } catch (error) {
      dispatch(commonActions.setLoading(false));

      const err = ((error as AxiosError).response?.data as { msg: string }).msg;
      toast.error(err);
    }
  };
  const handleActive = () => {
    setActive(!active);
  };
  const handleSetCountry = (params: { name: string; val?: string }) => {
    if (Object.keys(params).length) {
      setSelectedCountry(params.name);
      setActive(false);
    }
  };

  const methods = useForm<FormValue>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const onSubmit: SubmitHandler<FormValue> = async (data) =>
    await createOrderHandler(data);
  console.log(errors);

  return (
    <FormProvider {...methods}>
      <SC.ShippingContainer>
        <SectionTitle>SHIPPING ADDRESS</SectionTitle>
        <SC.FormContainer onSubmit={handleSubmit(onSubmit)}>
          <SC.RowFlexBox>
            <SC.LeftInputBox>
              <SC.Label error={errors.firstName}>First Name</SC.Label>
              <SC.Input
                error={errors.firstName}
                {...register(
                  "firstName",
                  getValidationData(["maxLength", "required", "alphabetical"])
                )}
              />
              <FieldErr errors={errors} field="firstName" />
            </SC.LeftInputBox>

            <SC.RightInputBox>
              <SC.Label error={errors.lastName}>Last Name</SC.Label>
              <SC.Input
                error={errors.lastName}
                {...register(
                  "lastName",
                  getValidationData(["required", "alphabetical"])
                )}
              />
              <FieldErr errors={errors} field="lastName" />
            </SC.RightInputBox>
          </SC.RowFlexBox>

          <SC.SingleInputBox>
            <SC.Label>Country</SC.Label>
            <Select
              fullWidth={true}
              listData={countries}
              handleSetSelected={handleSetCountry}
              handleActive={handleActive}
              selectedName={selectedCountry}
              active={active}
            />
          </SC.SingleInputBox>

          <SC.SingleInputBox>
            <SC.Label>Address</SC.Label>
            <SC.Input
              error={errors.address}
              {...register("address", getValidationData(["required"]))}
            />
            <FieldErr errors={errors} field="address" />
          </SC.SingleInputBox>

          <SC.RowFlexBox>
            <SC.LeftInputBox>
              <SC.Label error={errors.state}>State/County</SC.Label>
              <SC.Input
                error={errors.state}
                {...register(
                  "state",
                  getValidationData(["required", "alphabetical"])
                )}
              />
              <FieldErr errors={errors} field="state" />
            </SC.LeftInputBox>
            <SC.RightInputBox>
              <SC.Label error={errors.zip}>Zip code</SC.Label>
              <SC.Input
                maxLength={8}
                error={errors.zip}
                {...register("zip", getValidationData(["required", "numeric"]))}
              />
              <FieldErr errors={errors} field="zip" />
            </SC.RightInputBox>
          </SC.RowFlexBox>

          <SectionTitle>Payment Info</SectionTitle>
          <PaymentForm />
          <PayBtn>Pay</PayBtn>
        </SC.FormContainer>
      </SC.ShippingContainer>
    </FormProvider>
  );
};

export default ShippingForm;
