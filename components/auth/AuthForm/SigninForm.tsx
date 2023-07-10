import { FormEventHandler } from "react";
import styles from "./AuthForm.module.scss";

interface SigninFormProps {
  onSubmit: FormEventHandler;
}

const SigninForm = ({ onSubmit }: SigninFormProps) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.inputContainer}>
        <span>이메일</span>
        <input type="text" placeholder="입력" />
      </div>
      <div className={styles.inputContainer}>
        <span>비밀번호</span>
        <input type="password" placeholder="입력" />
      </div>
      <input
        type="submit"
        className={styles.submitButton}
        value="로그인 하기"
      />
    </form>
  );
};

export default SigninForm;
