/* eslint-disable consistent-return */

"use client";

import NoticeCard from "components/common/NoticeCard/NoticeCard";
import CommonBtn from "components/common/CommonBtn/CommonBtn";
import CommonLayout from "components/common/CommonLayout/CommonLayout";
import { useParams } from "next/navigation";
import { useGetNoticeByShopAndNoticeIdQuery } from "redux/api/noticeApi";
import { useEffect, useState } from "react";
import { INotice } from "types/dto";
import Loader from "../Loader/Loader";

const CommonShopDescription = () => {
  const router = useParams();
  const [noticeInfo, setNoticeInfo] = useState<INotice>();
  const { data, isLoading, isError } = useGetNoticeByShopAndNoticeIdQuery({
    shopId: router.shopId,
    noticeId: router.noticesId,
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    const { item } = data;
    setNoticeInfo(item);
  }, [data]);

  if (isError) {
    return null;
  }

  return (
    <CommonLayout position="above">
      {(noticeInfo && !isLoading)
        ? (
          <>
            <div>
              <p>{noticeInfo?.shop?.item.category}</p>
              <h2>{noticeInfo?.shop?.item.name}</h2>
            </div>
            <div>
              <NoticeCard
                hourlyPay={noticeInfo.hourlyPay}
                startsAt={noticeInfo.startsAt}
                address={noticeInfo?.shop?.item.address1 as string}
                imageUrl={noticeInfo.shop?.item.imageUrl as string}
                shopDescription={noticeInfo?.shop?.item.description as string}
                noticeDescription={noticeInfo.description}
                closed={noticeInfo?.closed as boolean}
                workhour={noticeInfo.workhour}
                originalHourlyPay={noticeInfo?.shop?.item.originalHourlyPay as number}
              >
                <CommonBtn>신청하기</CommonBtn>
              </NoticeCard>
            </div>
          </>
        )
        : (
          <>
            <div>
              <p>{noticeInfo?.shop?.item.category}</p>
              <h2>{noticeInfo?.shop?.item.name}</h2>
            </div>
            <div>
              <NoticeCard
                hourlyPay={noticeInfo.hourlyPay}
                startsAt={noticeInfo.startsAt}
                address={noticeInfo?.shop?.item.address1 as string}
                imageUrl={noticeInfo.shop?.item.imageUrl as string}
                shopDescription={noticeInfo?.shop?.item.description as string}
                noticeDescription={noticeInfo.description}
                closed={noticeInfo?.closed as boolean}
                workhour={noticeInfo.workhour}
                originalHourlyPay={noticeInfo?.shop?.item.originalHourlyPay as number}
              >
                <CommonBtn>신청하기</CommonBtn>
              </NoticeCard>
            </div>
          </>
        )}
    </CommonLayout>
  );
};

export default CommonShopDescription;
