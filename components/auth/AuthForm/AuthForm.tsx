"use client";

import { useMemo, useState } from "react";
import classNames from "classnames/bind";
import styles from "./AuthForm.module.scss";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

const cn = classNames.bind(styles);
/**
 * @1 - 로그인폼 탭
 * @2 - 회원가입폼 탭
 */
type ActiveFormTabNumber = 1 | 2;

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState<ActiveFormTabNumber>(1);
  const activeForm = useMemo(() => {
    return (activeTab === 1
      ? (
        <SigninForm
          onSubmit={(e) => {
            e.preventDefault();
            // eslint-disable-next-line no-alert
            alert("로그인");
          }}
        />
      )
      : (
        <SignupForm
          onSubmit={(e) => {
            e.preventDefault();
            // eslint-disable-next-line no-alert
            alert("회원가입");
          }}
        />
      ));
  }, [activeTab]);
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
          role="button"
          aria-hidden="true"
          onClick={() => { setActiveTab(1); }}
        >
          <div className={cn("title", activeTab === 1 && "active")}>로그인</div>
          <div className={cn("line", activeTab === 1 && "active")} />
        </div>
        <div
          className={styles.titleItem}
          role="button"
          aria-hidden="true"
          onClick={() => { setActiveTab(2); }}
        >
          <div className={cn("title", activeTab === 2 && "active")}>회원가입</div>
          <div className={cn("line", activeTab === 2 && "active")} />
        </div>
      </div>
      {activeForm}
    </div>
  );
};

export default AuthForm;
