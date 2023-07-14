"use client";

import { ButtonStyle, ButtonSize } from "types/enums/button.enum";
import { CommonLayout, CommonBtn } from "components/common";
import styles from "./CommonDetail.module.scss";

type Detail = "EMPLOYER" | "EMPLOYEE";

interface IDeail {
  EMPLOYER : {
    title: string;
    description: string;
    buttonText: string;
  };
  EMPLOYEE: {
    title: string;
    description: string;
    buttonText: string;
  };
}

interface Icontent {
  title?: string,
  description: string,
  buttonText: string
}

const CommonDetail = ({ detailType }: { detailType: Detail }) => {
  const info: IDeail = {
    EMPLOYER: {
      title: "내 가게",
      description: "내 가게를 소개하고 공고도 등록해 보세요.",
      buttonText: "가게 등록하기",
    },
    EMPLOYEE: {
      title: "내 프로필",
      description: "내 프로필을 등록하고 원하는 가게에 지원해 보세요.",
      buttonText: "내 프로필 등록하기",
    },
  };

  const dataType:Icontent = info[detailType];

  return (
    <CommonLayout position="above">
      <div>
        <h2>{dataType.title}</h2>
      </div>
      <div className={styles.container}>
        <p>{dataType.description}</p>
        <CommonBtn type="button" style={ButtonStyle.SOLID} size={ButtonSize.MEDIUM}>
          {dataType.buttonText}
        </CommonBtn>
      </div>
    </CommonLayout>
  );
};

export default CommonDetail;
