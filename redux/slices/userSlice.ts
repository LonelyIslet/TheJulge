import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IShop, IUser } from "types/dto";

export interface IUserState {
  token?: string;
  userInfo?: IUser;
}

const initialState: IUserState = {
  token: undefined,
  userInfo: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
    },
    setUserShop: (state, action: PayloadAction<{ item: IShop, href: string }>) => {
      if (state.userInfo) {
        state.userInfo.shop = action.payload;
      }
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
