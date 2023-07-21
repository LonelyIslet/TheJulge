/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-misused-promises */

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import NoticeCard from "components/common/NoticeCard/NoticeCard";
import CommonBtn from "components/common/CommonBtn/CommonBtn";
import CommonLayout from "components/common/CommonLayout/CommonLayout";
import { INotice, IUser } from "types/dto";
import { ButtonStyle } from "types/enums/button.enum";
import { useGetNoticeByShopAndNoticeIdQuery } from "redux/api/noticeApi";
import usePostApplication from "hooks/api/application/usePostApplication";
import useCancelApplication from "hooks/api/application/useCancelApplication";
import useErrorModal from "hooks/useErrorModal";
import styles from "./CommonShopDescription.module.scss";

const CommonShopDescription = ({ user }: { user: IUser | undefined }) => {
  const params = useParams();
  const [noticeInfo, setNoticeInfo] = useState<INotice>();
  const router = useRouter();
  const { postApplication } = usePostApplication();
  const { cancelApplication } = useCancelApplication();
  const [isApplied, setIsApplied] = useState(false);
  const { showErrorModal } = useErrorModal();
  const { data } = useGetNoticeByShopAndNoticeIdQuery({ shopId: params.shopId, noticeId: params.noticeId });

  const { data: shopInfo, isLoading } = useGetNoticeByShopAndNoticeIdQuery({
    shopId: params.shopId,
    noticeId: params.noticeId,
  });

  const goToLogin = () => {
    showErrorModal("로그인이 필요한 서비스입니다.");
    router.push("/auth");
  };

  const handleApplyJob = async () => {
    const response = await postApplication(params.shopId, params.noticeId);
    if (response) {
      showErrorModal("신청되었습니다.");
      setIsApplied(true);
    }
  };

  const handleEditNotice = () => {
    router.push(`/shops/${params.shopId}/notices/write?id=${params.noticeId}`);
  };

  const handleCancleNotice = async () => {
    const response = await cancelApplication(params.shopId, params.noticeId, user?.id as string);
    if (response) {
      showErrorModal("취소했습니다.");
      setIsApplied(false);
    }
  };

  useEffect(() => {
    if (!shopInfo) {
      return;
    }
    const { item } = shopInfo;
    setNoticeInfo(item);
  }, [shopInfo]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    setIsApplied(data?.item?.currentUserApplication?.item?.id === user?.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  let btnType;
  const userType = user?.type;

  if (user === undefined) {
    btnType = (
      <CommonBtn
        onClick={goToLogin}
        style={ButtonStyle.SOLID}
      >
        신청하기
      </CommonBtn>
    );
  } else if (noticeInfo?.closed) {
    btnType = (
      <CommonBtn
        style={ButtonStyle.DISABLE}
      >
        신청불가
      </CommonBtn>
    );
  } else if (userType === "employer") {
    if (params.shopId === user?.shop?.item.id) {
      btnType = (
        <CommonBtn
          onClick={handleEditNotice}
          style={ButtonStyle.SOLID}
        >
          공고 편집하기
        </CommonBtn>
      );
    } else {
      btnType = (
        <CommonBtn
          style={ButtonStyle.DISABLE}
        >
          신청불가
        </CommonBtn>
      );
    }
  }

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
            shopDescription={noticeInfo?.shop?.item?.description as string}
            noticeDescription={noticeInfo?.description as string}
            closed={noticeInfo?.closed}
            workhour={noticeInfo?.workhour}
            originalHourlyPay={noticeInfo?.shop?.item.originalHourlyPay}
          >
            {btnType}
            {userType === "employee" && isApplied
              && (
              <CommonBtn
                onClick={handleCancleNotice}
                style={ButtonStyle.SOLID}
              >
                취소하기
              </CommonBtn>
              )}
            {userType === "employee" && !isApplied
              && (
                <CommonBtn
                  onClick={handleApplyJob}
                  style={ButtonStyle.SOLID}
                >
                  신청하기
                </CommonBtn>
              )}

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
