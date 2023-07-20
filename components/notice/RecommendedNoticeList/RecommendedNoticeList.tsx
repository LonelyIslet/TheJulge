"use client";

import { useEffect, useRef } from "react";
import { PostCard, Spinner, InfiniteCarousel } from "components/common";
import useAppSelector from "redux/hooks/useAppSelector";
import { SortOption, useGetNoticesQuery } from "redux/api/noticeApi";
import useMediaQuery from "hooks/useMediaQuery";
import styles from "./RecommendedNoticeList.module.scss";

const RecommendedNoticeList = () => {
  const user = useAppSelector((state) => { return state.user; });
  const { matches: showOnlyTwo } = useMediaQuery(530);
  const ref = useRef<HTMLDivElement>(null);
  let params;

  if (user.userInfo?.address) {
    params = { address: [user.userInfo.address] };
  } else {
    params = { limit: 6, sort: "pay" as SortOption };
  }

  const { data: noticeList, isLoading } = useGetNoticesQuery(params);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("touchstart", (e) => {
        e.preventDefault();
        e.stopPropagation();
      }, { passive: false });
    }
  }, [ref]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Spinner />
      </div>
    );
  }

  if (!noticeList?.items.length) {
    return (<div className={styles.loadingContainer}>회원님을 위한 맞춤공고가 없어요</div>);
  }

  return (
    <div ref={ref}>
      <div className={styles.container}>
        <InfiniteCarousel
          itemCount={noticeList.items.length * 10}
          itemsPerView={showOnlyTwo ? 2 : 3}
        >
          {({ index }) => {
            const modulo = index % noticeList.items.length;
            const noticeIndex = modulo < 0 ? noticeList.items.length + modulo : modulo;
            return (
              <div draggable style={{ margin: "0 0.7rem", height: "100%" }}>
                <PostCard
                  hourlyPay={noticeList.items[noticeIndex].item.hourlyPay}
                  startsAt={noticeList.items[noticeIndex].item.startsAt}
                  workhour={noticeList.items[noticeIndex].item.workhour}
                  address={noticeList.items[noticeIndex].item.shop.item.address1}
                  imageUrl={noticeList.items[noticeIndex].item.shop.item.imageUrl}
                  originalHourlyPay={
                    noticeList.items[noticeIndex].item.shop.item.originalHourlyPay
                  }
                  closed={noticeList.items[noticeIndex].item.closed}
                  name={noticeList.items[noticeIndex].item.shop.item.name}
                  href={noticeList.items[noticeIndex].item.shop.href}
                />
              </div>
            );
          }}
        </InfiniteCarousel>
      </div>
    </div>
  );
};

export default RecommendedNoticeList;
