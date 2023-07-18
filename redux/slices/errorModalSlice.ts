import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IErrorModalState {
  isShowing: boolean;
  message: string;
}

const initialState: IErrorModalState = {
  isShowing: false,
  message: "",
};

export const errorModalSlice = createSlice({
  name: "errorModal",
  initialState,
  reducers: {
    setShowModal: (state, action: PayloadAction<boolean>) => {
      state.isShowing = action.payload;
    },
    setErrorModalMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { setShowModal, setErrorModalMessage } = errorModalSlice.actions;

export default errorModalSlice.reducer;
