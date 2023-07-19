/* eslint-disable react/jsx-props-no-spreading */
import { ComponentType, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import useAppSelector from "redux/hooks/useAppSelector";
import useErrorModal from "hooks/useErrorModal";

const withAuth = (Component: ComponentType) => {
  const WithAuthHOC = <P extends object>(props: P) => {
    const user = useAppSelector((state) => { return state.user; });
    const { showErrorModal } = useErrorModal();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      if (!user.token) {
        showErrorModal("로그인이 필요합니다.");
        setIsAuthorized(false);
        redirect("/auth?mode=signin");
      }
      setIsAuthorized(true);
    }, [user.token, showErrorModal]);
    if (!isAuthorized) return null;

    return (
      <Component {...props} />
    );
  };

  return WithAuthHOC;
};

export default withAuth;
