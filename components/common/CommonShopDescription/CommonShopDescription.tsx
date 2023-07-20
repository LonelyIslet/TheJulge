/* eslint-disable consistent-return */

"use client";

import NoticeCard from "components/common/NoticeCard/NoticeCard";
import CommonBtn from "components/common/CommonBtn/CommonBtn";
import CommonLayout from "components/common/CommonLayout/CommonLayout";
import { useParams } from "next/navigation";
import { useGetNoticeByShopAndNoticeIdQuery } from "redux/api/noticeApi";
import { useEffect, useState } from "react";
import { INotice, IUser } from "types/dto";
import { ButtonStyle } from "types/enums/button.enum";
import styles from "./CommonShopDescription.module.scss";

const CommonShopDescription = ({ user }: { user: IUser | undefined }) => {
  const router = useParams();
  const [noticeInfo, setNoticeInfo] = useState<INotice>();

  const { data: shopInfo, isLoading } = useGetNoticeByShopAndNoticeIdQuery({
    shopId: router.shopId,
    noticeId: router.noticeId,
  });

  console.log(shopInfo);

  // 알바 공고내역 보면서 신청하기 or 편집하기

  const handleApplyJob = () => {

  };

  const handleEditNotice = () => {

  };

  useEffect(() => {
    if (!shopInfo) {
      return;
    }
    const { item } = shopInfo;
    setNoticeInfo(item);
  }, [shopInfo]);

  const userType = user?.type;
  let btnType;

  if (userType === ("employer" || undefined) || noticeInfo?.closed) {
    btnType = (
      <CommonBtn
        onClick={handleApplyJob}
        style={ButtonStyle.DISABLE}
      >
        신청 불가
      </CommonBtn>
    );
  } else if (user?.shop?.item.id === shopInfo?.item.id) {
    btnType = <CommonBtn onClick={handleEditNotice}>편집하기</CommonBtn>;
  } else {
    btnType = <CommonBtn onClick={handleApplyJob}>신청하기</CommonBtn>;
  }

  console.log(user, noticeInfo);

  let renderingUi;

  if (noticeInfo && !isLoading) {
    renderingUi = (
      <CommonLayout position="above">
        <div>
          <p>{noticeInfo?.shop?.item.category}</p>
          <h2>{noticeInfo?.shop?.item.name}</h2>
        </div>
        <div>
          <NoticeCard
            hourlyPay={noticeInfo.hourlyPay}
            startsAt={noticeInfo.startsAt}
            address={noticeInfo?.shop?.item.address1}
            imageUrl={noticeInfo.shop?.item.imageUrl as string}
            shopDescription={noticeInfo?.shop?.item.description as string}
            noticeDescription={noticeInfo.description}
            closed={noticeInfo?.closed}
            workhour={noticeInfo.workhour}
            originalHourlyPay={noticeInfo?.shop?.item.originalHourlyPay}
          >

            {btnType}
          </NoticeCard>
        </div>
      </CommonLayout>
    );
  } else {
    renderingUi = (
      <CommonLayout position="above">
        <div className={styles.skeletonContainer}>
          <div className={styles.headerSkeleton} />
          <div className={styles.mainSkeleton}>
            <div />
            <div>
              <div />
            </div>
          </div>
          <div className={styles.footerSkeleton} />
        </div>
      </CommonLayout>
    );
  }

  return renderingUi;
};

export default CommonShopDescription;
