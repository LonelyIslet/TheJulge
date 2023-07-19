/* eslint-disable react/jsx-props-no-spreading */
import { ComponentType, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import useAppSelector from "redux/hooks/useAppSelector";
import useErrorModal from "hooks/useErrorModal";
import { UserType } from "types/enums/user.enum";

const withUserType = (Component: ComponentType, userType: UserType) => {
  const WithUserTypeHOC = <P extends object>(props: P) => {
    const user = useAppSelector((state) => { return state.user; });
    const { showErrorModal } = useErrorModal();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      if (!user.userInfo) return;
      if (user.userInfo.type !== userType) {
        showErrorModal("권한이 없습니다.");
        redirect("/");
      }
      setIsAuthorized(true);
    }, [showErrorModal, user.userInfo]);

    if (!isAuthorized) return null;

    return (
      <Component {...props} />
    );
  };

  return WithUserTypeHOC;
};

export default withUserType;
