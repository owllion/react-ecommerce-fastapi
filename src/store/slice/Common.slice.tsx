import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  errorMsg: string;
  isLoading: boolean;
  favLoading: boolean;
  cartLoading: boolean;
  showSearch: boolean;
  showPopup: boolean;
  itemQty: number;
  currentProductId: string;
}
interface IItemQty {
  type: string;
}

const initialState: IState = {
  errorMsg: "",
  isLoading: false,
  favLoading: false,
  cartLoading: false,
  showSearch: false,
  showPopup: false,
  itemQty: 1,
  currentProductId: "",
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setError(state, { payload }: PayloadAction<string>) {
      state.errorMsg = payload;
    },
    setErrorClear(state) {
      state.errorMsg = "";
    },
    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.isLoading = payload;
    },
    setFavLoading(state, { payload }: PayloadAction<boolean>) {
      state.favLoading = payload;
    },
    setCartLoading(state, { payload }: PayloadAction<boolean>) {
      state.cartLoading = payload;
    },
    setShowSearch(state, { payload }: PayloadAction<boolean>) {
      state.showSearch = payload;
    },

    //productDetail's item qty
    setItemQty(state, { payload }: PayloadAction<IItemQty>) {
      payload.type === "inc" ? (state.itemQty += 1) : (state.itemQty -= 1);
    },
    resetItemQty(state) {
      state.itemQty = 1;
    },
    //click cart button in the singleProduct component will show the popup
    setShowPopup(state, { payload }: PayloadAction<boolean>) {
      state.showPopup = payload;
    },
    setCurrentProductId(state, { payload }: PayloadAction<string>) {
      state.currentProductId = payload;
    },
  },
});

export const commonActions = commonSlice.actions;
export default commonSlice;
