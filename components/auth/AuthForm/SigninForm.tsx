"use client";

import { FormEvent, useEffect, useState } from "react";
import { setUser } from "redux/slices/userSlice";
import useAppDispatch from "redux/hooks/useAppDispatch";
import { CustomInput, Loader } from "components/common";
import { ValidationTarget } from "types/enums/inputValidation.enum";
import useSignin from "hooks/api/auth/useSignin";
import inputValidation from "utils/inputValidation";
import useLazyGetUserInfo from "hooks/api/user/useLazyGetUserInfo";
import useAppSelector from "redux/hooks/useAppSelector";
import styles from "./AuthForm.module.scss";

const SigninForm = () => {
  const user = useAppSelector((state) => { return state.user; });
  const dispatch = useAppDispatch();
  const [rendering, setRendering] = useState(false);
  const { signin, isLoading } = useSignin();
  const {
    getUserInfo, userInfoData, isUserInfoLoading,
  } = useLazyGetUserInfo();
  const [countValidation, setCountValidation] = useState({
    email: 0,
    password: 0,
    password_confirm: 0,
  });

  const [data, setData] = useState({
    email: "",
    password: "",
    password_confirm: "",
  });

  const handleData = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const setUserState = async (token: string, userId: string) => {
    await getUserInfo(userId);
  };

  const handleSubmitSignin = async (event: FormEvent) => {
    event.preventDefault();
    const isEmailValidationPassed: boolean = inputValidation(ValidationTarget.EMAIL, data.email);
    const isPasswordValidationPassed
    : boolean = inputValidation(ValidationTarget.PASSWORD, data.password);
    setRendering(!rendering);
    setCountValidation({
      email: 1,
      password: 1,
      password_confirm: 1,
    });
    if (isEmailValidationPassed && isPasswordValidationPassed) {
      const res = await signin({ email: data.email, password: data.password });
      if (res) {
        const { item: { token, user: { item: { id } } } } = res;
        dispatch(setUser({ ...user, token }));
        await setUserState(token, id as string);
      }
    }
  };

  useEffect(() => {
    if (userInfoData) {
      const newUserInfo = { ...user, userInfo: userInfoData.item };
      dispatch(setUser(newUserInfo));
    }
  }, [userInfoData, user, dispatch]);

  return (
    <form
      className={styles.form}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmitSignin}
    >
      <CustomInput
        element="text"
        type="text"
        label="이메일"
        placeholder="입력"
        id="email"
        name="email"
        validationTarget={ValidationTarget.EMAIL}
        onChange={handleData}
        data={data}
        rendering={rendering}
        countValidation={countValidation}
        setCountValidation={setCountValidation as React.Dispatch<React.SetStateAction<object>>}
      />
      <CustomInput
        element="text"
        type="password"
        label="비밀번호"
        placeholder="입력"
        id="password"
        name="password"
        validationTarget={ValidationTarget.PASSWORD}
        onChange={handleData}
        data={data}
        rendering={rendering}
        countValidation={countValidation}
        setCountValidation={setCountValidation as React.Dispatch<React.SetStateAction<object>>}
      />
      <button
        type="submit"
        className={styles.submitButton}
      >
        {(isLoading || isUserInfoLoading) ? <Loader /> : "로그인 하기"}
      </button>
    </form>
  );
};

export default SigninForm;
