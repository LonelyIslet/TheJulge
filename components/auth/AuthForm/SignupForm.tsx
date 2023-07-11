import { FormEventHandler } from "react";
import UserTypeSelect from "./UserTypeSelect";
import styles from "./AuthForm.module.scss";

interface SignupFormProps {
  onSubmit: FormEventHandler;
}

const SignupForm = ({ onSubmit }: SignupFormProps) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.inputContainer}>
        <span>이메일</span>
        <input type="email" placeholder="입력" />
      </div>
      <div className={styles.inputContainer}>
        <span>비밀번호</span>
        <input type="password" placeholder="입력" />
      </div>
      <div className={styles.inputContainer}>
        <span>비밀번호 확인</span>
        <input type="password" placeholder="입력" />
      </div>
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
