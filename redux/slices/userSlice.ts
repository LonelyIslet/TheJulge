import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "types/dto";

interface IUserState {
  token?: string;
  userInfo?: IUser;
}

// interface IUserWithTokenAndInfo extends IUserState {
//   token: string;
//   userInfo: IUser;
// }

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
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
