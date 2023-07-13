import React, { useState } from "react";
import { CustomInput } from "components/common";
import { ValidationTarget } from "types/enums/inputValidation.enum";
import inputValidation from "utils/inputValidation";
import UserTypeSelect from "./UserTypeSelect";
import styles from "./AuthForm.module.scss";

const SignupForm = () => {
  const [rendering, setRendering] = useState(false);
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

  // 함수가 실행되면 유효성 검사가 시작됨
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const checkEmailValidation: boolean = inputValidation(ValidationTarget.EMAIL, data.email);
    // eslint-disable-next-line max-len, @typescript-eslint/no-unused-vars
    const checkPasswordValidation : boolean = inputValidation(ValidationTarget.PASSWORD, data.password);
    setRendering(!rendering);
    setCountValidation({
      email: 1,
      password: 1,
      password_confirm: 1,
    });
    //
    // eslint-disable-next-line no-empty
    if (checkEmailValidation && checkPasswordValidation) {}
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
        setCountValidation={setCountValidation}
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
        setCountValidation={setCountValidation}
      />
      <CustomInput
        element="text"
        type="password"
        label="비밀번호 확인"
        placeholder="입력"
        id="password_confirm"
        name="password_confirm"
        validationTarget={ValidationTarget.PASSWORD_CONFIRM}
        onChange={handleData}
        data={data}
        rendering={rendering}
        countValidation={countValidation}
        setCountValidation={setCountValidation}
      />
      <UserTypeSelect onChange={() => {}} />
      <input
        type="submit"
        className={styles.submitButton}
        value="가입하기"
      />
    </form>
  );
};

export default SignupForm;
