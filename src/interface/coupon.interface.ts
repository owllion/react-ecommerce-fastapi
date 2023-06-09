export interface ICoupon {
  is_used: boolean;
  coupon: {
    code: string;
    discount_type: string;
    amount: number;
    expiry_date: Date;
    minimum_amount: number;
    is_used: boolean;
  };
}

export interface IApplyCoupon {
  code: string;
  total_price: number;
}
