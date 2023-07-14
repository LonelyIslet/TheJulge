import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "types/dto";
import { UserType } from "types/enums/user.enum";

const initialState: IUser = {
  email: "",
  type: UserType.EMPLOYEE,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      const {
        id, email, type, name, phone, address, bio, shop,
      } = action.payload;
      state.id = id;
      state.email = email;
      state.type = type;
      state.name = name;
      state.phone = phone;
      state.address = address;
      state.bio = bio;
      state.shop = shop;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
