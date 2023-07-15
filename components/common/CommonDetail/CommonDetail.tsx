"use client";

import CommonLayout from "components/common/CommonLayout/CommonLayout";
import CommonBtn from "components/common/CommonBtn/CommonBtn";
import { ButtonStyle, ButtonSize } from "types/enums/button.enum";
import { CommonLayout, CommonBtn } from "components/common";
import { useRouter } from "next/navigation";
import styles from "./CommonDetail.module.scss";

type Detail = "EMPLOYER" | "EMPLOYEE" | "APPLICATIONDETAILS";

interface Ias {
  title: string;
  description: string;
  buttonText: string;
  onClick: (e: React.MouseEvent) => void;
}

interface IDeail {
  EMPLOYER : Ias
  EMPLOYEE: Ias
  APPLICATIONDETAILS: Ias
}

interface Icontent {
  title?: string,
  description: string,
  buttonText: string,
  onClick?: (e: React.MouseEvent) => void;
}

const CommonDetail = ({ detailType }: { detailType: Detail }) => {
  const router = useRouter();
  const info: IDeail = {
    EMPLOYER: {
      title: "내 가게",
      description: "내 가게를 소개하고 공고도 등록해 보세요.",
      buttonText: "가게 등록하기",
      onClick: () => { return router.push("/my-shop/edit"); },
    },
    EMPLOYEE: {
      title: "내 프로필",
      description: "내 프로필을 등록하고 원하는 가게에 지원해 보세요.",
      buttonText: "내 프로필 등록하기",
      onClick: () => { return router.push("/my-profile/edit"); },
    },
    APPLICATIONDETAILS: {
      title: "신청 내역",
      description: "아직 신청 내역이 없어요",
      buttonText: "공고 보러가기",
      onClick: () => { return router.push("/"); },
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
        <CommonBtn type="button" style={ButtonStyle.SOLID} size={ButtonSize.MEDIUM} onClick={dataType.onClick}>
          {dataType.buttonText}
        </CommonBtn>
      </div>
    </CommonLayout>
  );
};

export default CommonDetail;
