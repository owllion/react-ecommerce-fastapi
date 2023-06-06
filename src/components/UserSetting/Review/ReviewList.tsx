import { useEffect, useState } from "react";
import styled from "styled-components";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

import SectionTitle from "../SectionTitle";
import { IReview } from "../../../interface/review.interface";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { commonActions } from "../../../store/slice/Common.slice";
import NoResult from "src/components/UserSetting/NoResult";
import { userActions } from "../../../store/slice/User.slice";
import Review from "./Review";
import { getReviewListApi } from "../../../api/user.api";
import LoadingSpinner from "../../Common/LoadingSpinner ";
import { LoadingContainer } from "../../Product/ProductCarousel";

const ReviewList = () => {
  const dispatch = useAppDispatch();
  const { id, userReviews } = useAppSelector((state) => state.user || {});
  const { isLoading } = useAppSelector((state) => state.common || {});
  const [reviewList, setReviewList] = useState<IReview[]>();

  const getReviewList = async () => {
    try {
      dispatch(commonActions.setLoading(true));
      const { data } = await getReviewListApi({ userId: id! });
      setReviewList(data);
      dispatch(userActions.setUserReviewList(data));
      dispatch(commonActions.setLoading(false));
    } catch (error) {
      dispatch(commonActions.setLoading(false));
      const err = ((error as AxiosError).response?.data as { detail: string })
        .detail;
      toast.error(err);
    }
  };
  useEffect(() => {
    getReviewList();
  }, []);

  return (
    <Container>
      <SectionTitle title="ReviewList" />

      {userReviews?.map((review) => (
        <Review review={review} />
      ))}

      {userReviews?.length === 0 && !isLoading && (
        <NoResult imgText={"NOTHING HERE"} showBtn={false} />
      )}

      {isLoading && (
        <LoadingContainer needFullHeight={true}>
          <LoadingSpinner size={100} />
        </LoadingContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

export default ReviewList;
