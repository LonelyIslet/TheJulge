"use client";

import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./AuthForm.module.scss";

const cn = classNames.bind(styles);

type ActiveTabNumber = 1 | 2;

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState<ActiveTabNumber>(1);

  return (
    <form className={styles.form}>
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
      <ul className={styles.inputList} />
    </form>
  );
};

export default AuthForm;
