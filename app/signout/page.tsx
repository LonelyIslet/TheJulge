"use client";

import useToast from "hooks/useToast";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import useAppDispatch from "redux/hooks/useAppDispatch";
import useAppSelector from "redux/hooks/useAppSelector";
import { setUser } from "redux/slices/userSlice";

const SignoutPage = () => {
  const dispatch = useAppDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  const user = useAppSelector((state) => { return state.user; });

  useLayoutEffect(() => {
    if (!user.token) {
      setIsChecked(false);
      router.push("/");
    } else {
      setIsChecked(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (isChecked) {
      dispatch(setUser({ token: undefined, userInfo: undefined }));
      setIsLoggedOut(true);
    }
  }, [dispatch, isChecked]);

  useEffect(() => {
    if (isLoggedOut && isChecked) {
      showToast("로그아웃 되었습니다.");
      router.push("/");
    }
  }, [isLoggedOut, showToast, router, isChecked]);

  return null;
};

export default SignoutPage;
