import { IUser } from "types/dto";
import { UserType } from "types/enums/user.enum";

export const NO_USER:IUser = {
  email: "",
  type: UserType.EMPLOYEE,
};
