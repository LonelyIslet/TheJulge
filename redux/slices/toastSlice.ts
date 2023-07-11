import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IToastState {
  isShowing: boolean;
  message: string
}

const initialState: IToastState = {
  isShowing: false,
  message: "",
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state) => {
      state.isShowing = true;
    },
    hideToast: (state) => {
      state.isShowing = false;
    },
    setToastMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { showToast, hideToast, setToastMessage } = toastSlice.actions;

export default toastSlice.reducer;
