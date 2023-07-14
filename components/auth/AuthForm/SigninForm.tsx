import { FormEvent, useState } from "react";
import { CustomInput } from "components/common";
import { ValidationTarget } from "types/enums/inputValidation.enum";
import inputValidation from "utils/inputValidation";
import styles from "./AuthForm.module.scss";

const SigninForm = () => {
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

  const handleSubmit = (event: FormEvent) => {
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
    // 이메일, 비밀번호 유효성 검사가 통과되면 실행되는 코드를 넣어주시면 됩니다.
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
      <input
        type="submit"
        className={styles.submitButton}
        value="로그인 하기"
      />
    </form>
  );
};

export default SigninForm;
