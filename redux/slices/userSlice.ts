import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INotice, IShop, IUser } from "types/dto";

export interface IUserState {
  token?: string;
  userInfo?: IUser;
  viewHistory?: INotice[];
}

const initialState: IUserState = {
  token: undefined,
  userInfo: undefined,
  viewHistory: [],
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
    setViewHistory: (state, action: PayloadAction<INotice>) => {
      if (state.viewHistory && state.viewHistory?.length <= 5) {
        state.viewHistory.push(action.payload);
      } else {
        state.viewHistory?.shift();
        state.viewHistory?.push(action.payload);
      }
    },
  },
});

export const { setUser, setViewHistory } = userSlice.actions;

export default userSlice.reducer;
