import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignupMutation } from "redux/api/authApi";
import { CustomInput, Loader, Modal } from "components/common";
import { ValidationTarget } from "types/enums/inputValidation.enum";
import { UserType } from "types/enums/user.enum";
import { ModalType } from "types/enums/modal.enum";
import inputValidation from "utils/inputValidation";
import { isFetchBaseQueryError } from "utils/predicateErrorType";
import UserTypeSelect from "./UserTypeSelect";
import styles from "./AuthForm.module.scss";

const SignupForm = () => {
  const router = useRouter();
  const [rendering, setRendering] = useState(false);
  const [signup, { isLoading }] = useSignupMutation();
  const [errorMsg, setErrorMsg] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isProceedModalOpen, setIsProceedModalOpen] = useState(false);
  const [countValidation, setCountValidation] = useState({
    email: 0,
    password: 0,
    password_confirm: 0,
  });

  const [data, setData] = useState({
    email: "",
    password: "",
    password_confirm: "",
    type: UserType.EMPLOYEE,
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
  const handleSubmitSignup = async (event: React.FormEvent<HTMLFormElement>) => {
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
      try {
        await signup({
          email: data.email,
          password: data.password,
          type: data.type,
        }).unwrap();
        setIsProceedModalOpen(true);
      } catch (err) {
        setIsErrorModalOpen(true);
        if (isFetchBaseQueryError(err)) {
          const errorObj = "error" in err ? err.error : err.data as { message: string };
          if (typeof errorObj !== "string") {
            setErrorMsg(errorObj.message);
          }
        }
      }
    }
  };
  return (
    <>
      <form
        className={styles.form}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmitSignup}
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
          setCountValidation={setCountValidation as React.Dispatch<React.SetStateAction<object>>}
        />
        <UserTypeSelect onChange={handleData} />
        <button
          type="submit"
          className={styles.submitButton}
        >
          {isLoading ? <Loader /> : "회원가입"}
        </button>
      </form>
      {isErrorModalOpen && (
        <Modal
          type={ModalType.CONFIRM}
          message={errorMsg}
          onClose={() => { setIsErrorModalOpen(false); }}
          closeBtnLabel="닫기"
        />
      )}
      {isProceedModalOpen && (
        <Modal
          type={ModalType.ACTION}
          message="회원가입이 완료되었습니다"
          onClose={() => { setIsProceedModalOpen(false); }}
          onClickProceed={() => { router.replace("/auth?mode=signin"); }}
          closeBtnLabel="닫기"
          proceedBtnLabel="로그인하기"
        />
      )}
    </>
  );
};

export default SignupForm;
