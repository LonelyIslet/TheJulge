import React, { FormEventHandler, useState } from "react";
import { CustomInput } from "components/common";
import { ValidationTarget } from "types/enums/inputValidation.enum";
import UserTypeSelect from "./UserTypeSelect";
import styles from "./AuthForm.module.scss";

interface SignupFormProps {
  onSubmit: FormEventHandler;
}

const SignupForm = ({ onSubmit }: SignupFormProps) => {
  const [data, setData] = useState({
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

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <CustomInput element="text" type="text" label="이메일" placeholder="입력" id="email" name="email" validationTarget={ValidationTarget.EMAIL} onChange={handleData} />
      <CustomInput element="text" type="password" label="비밀번호" placeholder="입력" id="password" name="password" validationTarget={ValidationTarget.PASSWORD} onChange={handleData} data={data} />
      <CustomInput element="text" type="password" label="비밀번호 확인" placeholder="입력" id="password_confirm" name="password_confirm" validationTarget={ValidationTarget.PASSWORD_CONFIRM} onChange={handleData} data={data} />
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
