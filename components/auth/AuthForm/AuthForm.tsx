"use client";

import {
  useEffect, useMemo, useState,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import classNames from "classnames/bind";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import styles from "./AuthForm.module.scss";

const cn = classNames.bind(styles);

const AuthForm = () => {
  const pathname = usePathname();
  const searchValue = useSearchParams().get("mode");
  const [activeFormName, setActiveFormName] = useState("");
  const activeForm = useMemo(() => {
    return (searchValue === "signup"
      ? (
        <SignupForm
          onSubmit={(e) => {
            e.preventDefault();
            // eslint-disable-next-line no-alert
            alert("회원가입 완료");
          }}
        />
      )
      : (
        <SigninForm
          onSubmit={(e) => {
            e.preventDefault();
            // eslint-disable-next-line no-alert
            alert("로그인 완료");
          }}
        />
      ));
  }, [searchValue]);
  useEffect(() => {
    setActiveFormName(searchValue === "signup" ? "signup" : "signin");
  }, [searchValue]);
  return (
    <div
      className={styles.formContainer}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className={styles.titleContainer}>
        <div
          className={styles.titleItem}
          aria-hidden="true"
        >
          <Link
            href={`${pathname}?mode=signin`}
            className={cn("title", activeFormName === "signin" && "active")}
            replace
          >
            로그인
          </Link>
          <div className={cn("line", activeFormName === "signin" && "active")} />
        </div>
        <div
          className={styles.titleItem}
          aria-hidden="true"
        >
          <Link
            href={`${pathname}?mode=signup`}
            className={cn("title", activeFormName === "signup" && "active")}
            replace
          >
            회원가입
          </Link>
          <div className={cn("line", activeFormName === "signup" && "active")} />
        </div>
      </div>
      {activeForm}
    </div>
  );
};

export default AuthForm;