import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { CustomInput, Loader, Modal } from "components/common";
import { useSigninMutation } from "redux/api/authApi";
import { ValidationTarget } from "types/enums/inputValidation.enum";
import inputValidation from "utils/inputValidation";
import { ModalType } from "types/enums/modal.enum";
import { isFetchBaseQueryError } from "utils/predicateErrorType";
import { setCookie } from "utils/cookies";
import useAppDispatch from "redux/hooks/useAppDispatch";
import { setUser } from "redux/slices/userSlice";
import styles from "./AuthForm.module.scss";

const SigninForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [rendering, setRendering] = useState(false);
  const [signin, { isLoading }] = useSigninMutation();
  const [errorMsg, setErrorMsg] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
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
      try {
        const res = await signin({ email: data.email, password: data.password }).unwrap();
        setCookie("token", res.item.token, { maxAge: 2592000 });
        dispatch(setUser(res.item.user.item));
        router.push("/");
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
        <button
          type="submit"
          className={styles.submitButton}
        >
          {isLoading ? <Loader /> : "로그인 하기"}
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
    </>
  );
};

export default SigninForm;
