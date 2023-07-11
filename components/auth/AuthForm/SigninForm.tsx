import { CustomInput } from "components/common";
import { FormEventHandler, useState } from "react";
import { ValidationTarget } from "types/enums/inputValidation.enum";
import styles from "./AuthForm.module.scss";

interface SigninFormProps {
  onSubmit: FormEventHandler;
}

const SigninForm = ({ onSubmit }: SigninFormProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState({
    email: "",
    password: "",
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
      <CustomInput element="text" type="text" label="이메일" placeholder="입력" id="email" name="email" validationTarget={ValidationTarget.EMAIL} onChange={handleData} data={data} />
      <CustomInput element="text" type="password" label="비밀번호" placeholder="입력" id="password" name="password" validationTarget={ValidationTarget.PASSWORD} onChange={handleData} data={data} />
      <input
        type="submit"
        className={styles.submitButton}
        value="로그인 하기"
      />
    </form>
  );
};

export default SigninForm;
