"use client";

import {
  useEffect, useLayoutEffect, useMemo, useState,
} from "react";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import classNames from "classnames/bind";
import useAppSelector from "redux/hooks/useAppSelector";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import styles from "./AuthForm.module.scss";

const cn = classNames.bind(styles);

const AuthForm = () => {
  const pathname = usePathname();
  const searchValue = useSearchParams().get("mode");
  const [activeFormName, setActiveFormName] = useState("");
  const user = useAppSelector((state) => { return state.user; });
  const activeForm = useMemo(() => {
    return (searchValue === "signup"
      ? (
        <SignupForm />
      )
      : (
        <SigninForm />
      ));
  }, [searchValue]);

  useLayoutEffect(() => {
    if (user.userInfo) {
      redirect("/");
    }
  }, [user]);

  useEffect(() => {
    setActiveFormName(searchValue === "signup" ? "signup" : "signin");
  }, [searchValue]);

  useLayoutEffect(() => {
    const body = document.querySelector("body") as HTMLBodyElement;
    const nav = document.querySelector("nav") as HTMLDivElement;
    const footer = document.querySelector("footer") as HTMLDivElement;

    body.classList.add("red");
    nav.classList.add("hidden");
    footer.classList.add("hidden");

    return () => {
      body.classList.remove("red");
      nav.classList.remove("hidden");
      footer.classList.remove("hidden");
    };
  }, []);

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
