"use client";

import {
  useCallback, useEffect, useState, LegacyRef,
} from "react";
import {
  CommonLayout, CommonDetail, Loader, PostCard,
} from "components/common";
import { DetailType } from "types/enums/detailPage.enum";
import { INotice, IShop } from "types/dto";
import { IGetShopNoticeResponse, useGetNoticesByShopIdQuery } from "redux/api/noticeApi";
import useAppSelector from "redux/hooks/useAppSelector";
import { useIntersectionObserver } from "hooks/useIntersectionObserver";
import styles from "components/common/CardList/CardList.module.scss";

interface INoticeWithClosedInfo extends INotice {
  id?: string;
  closed: boolean;
}

const MyNotice = () => {
  const myShop = useAppSelector((state) => { return state.user.userInfo?.shop?.item; }) as IShop;
  const [notice, setNotice] = useState<INoticeWithClosedInfo[]>([]);
  const { data: noticeListData, isLoading, isSuccess } = useGetNoticesByShopIdQuery({
    shopId: myShop.id as string,
    params: { offset: 0, limit: 2 },
  });
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(true);

  const fetchMoreNotices = useCallback(async () => {
    setOffset((prev) => { return prev + 2; });
    setIsMoreLoading(true);
    const res = await fetch(`api/shops/${myShop.id as string}/notices?offset=${offset + 2}&limit=2`);
    const { items, hasNext: HN } = await res.json() as IGetShopNoticeResponse;
    setHasNext(HN);
    const addedList = items.map((i) => { return { ...i.item, shop: { item: myShop, href: "" } }; });
    setNotice((prev) => { return [...prev, ...addedList]; });
    setIsMoreLoading(false);
  }, [myShop, offset]);

  const setTargetObservation = useIntersectionObserver(fetchMoreNotices);

  useEffect(() => {
    if (noticeListData) {
      setNotice(noticeListData.items.map((i) => { return { ...i.item, shop: { item: myShop, href: "" } }; }));
    }
  }, [noticeListData, myShop]);

  if (isLoading || !isSuccess || !noticeListData) {
    return (
      <div style={{ height: "17rem" }}>
        <Loader />
      </div>
    );
  }

  return notice.length !== 0 ? (
    <>
      <CommonLayout position="below">
        <h2>내가 등록한 공고</h2>
        <ul className={styles.cardList}>
          {notice?.map((i) => {
            return (
              <li key={i.id} className={styles.card}>
                <PostCard
                  hourlyPay={i.hourlyPay}
                  startsAt={i.startsAt}
                  workhour={i.workhour}
                  closed={i.closed}
                  name={i.shop?.item.name}
                  address={i.shop?.item.address1}
                  imageUrl={i.shop?.item.imageUrl || ""}
                  originalHourlyPay={i.shop?.item.originalHourlyPay}
                  href={`/shops/${i.shop?.item.id as string}/notices/${i.id}`}
                />
              </li>
            );
          })}
          {hasNext && <div ref={setTargetObservation as LegacyRef<HTMLDivElement>} />}
        </ul>
      </CommonLayout>
      {isMoreLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "4rem",
          }}
        >
          <Loader />
        </div>
      )}
    </>
  ) : (
    <CommonDetail detailType={DetailType.NOTICE_DETAILS as DetailType} shopId={myShop.id} />
  );
};

export default MyNotice;
