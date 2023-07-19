"use client";

import { withAuth } from "components/hocs";
import useToast from "hooks/useToast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAppDispatch from "redux/hooks/useAppDispatch";
import { setUser } from "redux/slices/userSlice";

const SignoutPage = () => {
  const dispatch = useAppDispatch();
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    dispatch(setUser({ token: undefined, userInfo: undefined }));
    setIsLoggedOut(true);
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedOut) {
      showToast("로그아웃 되었습니다.");
      router.push("/");
    }
  }, [isLoggedOut, showToast, router]);

  return null;
};

export default withAuth(SignoutPage);
