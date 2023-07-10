"use client";

import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./AuthForm.module.scss";
import UserTypeSelect from "../UserTypeSelect/UserTypeSelect";

const cn = classNames.bind(styles);
/**
 * @1 - 로그인폼 탭
 * @2 - 회원가입폼 탭
 */
type ActiveFormTabNumber = 1 | 2;

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState<ActiveFormTabNumber>(1);

  return (
    <form
      className={styles.form}
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
      <ul className={styles.inputListContainer}>
        <UserTypeSelect onChange={(a) => { alert(a); }} />
      </ul>
      <input type="text" name="test" />
      <input type="submit" />
    </form>
  );
};

export default AuthForm;
