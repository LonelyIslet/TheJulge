"use client";

import useAppSelector from "redux/hooks/useAppSelector";
import { CommonBtn } from "components/common";
import Link from "next/link";
import styles from "./DefaultRecommendedList.module.scss";

const DefaultRecommendedList = () => {
  const userName = useAppSelector((state) => { return state.user?.userInfo?.name ?? "회원"; });
  return (
    <div className={styles.container}>
      <h2>
        <span>{userName}</span>
        님을 위한 맞춤공고가 없어요☹️
      </h2>
      <h3 className={styles.tooltipHeader}>
        *맞춤 공고란?
      </h3>
      <p className={styles.tooltipContent}>
        설정된 선호 지역을 기반으로
        {" "}
        <span>더줄게</span>
        에서 추천하는 공고입니다.
        <br />
        프로필 페이지에서 선호지역을 설정 또는 수정하고 가까운 가게의 공고를 추천받아 보세요!
      </p>
      <Link href="/my-profile/edit">
        <CommonBtn>프로필 편집하러 가기</CommonBtn>
      </Link>
    </div>
  );
};

export default DefaultRecommendedList;
