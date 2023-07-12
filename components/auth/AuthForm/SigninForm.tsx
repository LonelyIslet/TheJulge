import { CustomInput } from "components/common";
import { useState } from "react";
import { ValidationTarget } from "types/enums/inputValidation.enum";
import inputValidation from "utils/inputValidation";
import styles from "./AuthForm.module.scss";

const SigninForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [click, setClick] = useState(false);

  const handleData = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  // 함수가 실행되면 유효성 검사가 시작됨
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const checkEmailValidation = inputValidation(ValidationTarget.EMAIL, data.email);
    const checkPasswordValidation = inputValidation(ValidationTarget.PASSWORD, data.password);
    setClick(!click);
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
      />
      <input
        type="submit"
        className={styles.submitButton}
        value="로그인 하기"
      />
    </form>
  );
};

export default SigninForm;
