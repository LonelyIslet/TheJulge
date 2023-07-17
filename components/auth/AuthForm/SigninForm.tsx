import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { setUser } from "redux/slices/userSlice";
import useAppDispatch from "redux/hooks/useAppDispatch";
import { CustomInput, Loader } from "components/common";
import { ValidationTarget } from "types/enums/inputValidation.enum";
import useSignin from "hooks/api/auth/useSignin";
import inputValidation from "utils/inputValidation";
import styles from "./AuthForm.module.scss";

const SigninForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [rendering, setRendering] = useState(false);
  const { signin, isLoading } = useSignin();
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
      const res = await signin({ email: data.email, password: data.password });
      if (res) {
        const { item: { token, user: { item: userInfo } } } = res;
        dispatch(setUser({ token, userInfo }));
        router.push("/");
      }
    }
  };

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
        {isLoading ? <Loader /> : "로그인 하기"}
      </button>
    </form>
  );
};

export default SigninForm;
