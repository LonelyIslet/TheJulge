import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IToastState {
  isShowing: boolean;
  message: string;
}

const initialState: IToastState = {
  isShowing: false,
  message: "",
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<boolean>) => {
      state.isShowing = action.payload;
    },
    setToastMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { setShow, setToastMessage } = toastSlice.actions;

export default toastSlice.reducer;
