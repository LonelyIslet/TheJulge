"use client";

import { FormEvent, useState } from "react";
import { CommonBtn, CustomInput } from "components/common";
import { ButtonSize, ButtonStyle } from "types/enums/button.enum";
import styles from "./EditNoticeForm.module.scss";

const EditNoticeForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState({});

  const handleData = (event:
  React.ChangeEvent<HTMLInputElement |
  HTMLTextAreaElement> |
  React.MouseEvent<HTMLButtonElement>) => {
    if (event.type === "click") {
      const target = event.target as HTMLButtonElement;
      setData((prev) => {
        return {
          ...prev,
          [target.name]: target.textContent,
        };
      });
    } else if (event.type === "change") {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      setData((prev) => {
        return {
          ...prev,
          [target.name]: target.value,
        };
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.layout}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <CustomInput element="text" type="number" label="시급" placeholder="입력" id="hourlyPay" name="hourlyPay" essential onChange={handleData} />
          <CustomInput element="text" type="text" label="시작 일시" placeholder="입력" id="startsAt" name="startsAt" essential onChange={handleData} />
          <CustomInput element="text" type="text" label="업무 시간" placeholder="입력" id="workhour" name="workhour" essential onChange={handleData} />
        </div>
        <CustomInput element="textarea" label="공고 설명" placeholder="입력" id="description" name="description" onChange={handleData} />
        <CommonBtn type="submit" style={ButtonStyle.SOLID} size={ButtonSize.LARGE}>등록하기</CommonBtn>
      </form>
    </div>
  );
};

export default EditNoticeForm;
