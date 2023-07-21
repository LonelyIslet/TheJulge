"use client";

import { useRouter } from "next/navigation";
import CommonLayout from "components/common/CommonLayout/CommonLayout";
import CommonBtn from "components/common/CommonBtn/CommonBtn";
import { ButtonStyle, ButtonSize } from "types/enums/button.enum";
import styles from "./CommonDetail.module.scss";

type Detail = "EMPLOYER" | "EMPLOYEE" | "APPLICATION_DETAILS" | "LOGIN" | "NOTICE_DETAILS";

interface IDetail {
  title: string;
  description: string;
  buttonText: string;
  onClick: (e: React.MouseEvent) => void;
}

interface IInfo {
  EMPLOYER: IDetail
  EMPLOYEE: IDetail
  APPLICATION_DETAILS: IDetail
  LOGIN: IDetail
  NOTICE_DETAILS: IDetail
}

const CommonDetail = ({ detailType, shopId }: { detailType: Detail, shopId?: string }) => {
  const router = useRouter();
  const info: IInfo = {
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
    APPLICATION_DETAILS: {
      title: "신청 내역",
      description: "아직 신청 내역이 없어요",
      buttonText: "공고 보러가기",
      onClick: () => { return router.push("/"); },
    },
    LOGIN: {
      title: "최근에 본 공고",
      description: "로그인 하면 최근에 본 공고들을 볼 수 있어요",
      buttonText: "로그인 하기",
      onClick: () => { return router.push("/auth"); },
    },
    NOTICE_DETAILS: {
      title: "내가 등록한 공고",
      description: "공고를 등록해 보세요.",
      buttonText: "공고 등록하기",
      onClick: () => { return router.push(`/shops/${shopId as string}/notices/write`); },
    },
  };

  const dataType: IDetail = info[detailType];

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
