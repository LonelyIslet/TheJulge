"use client";

import { useEffect, useRef } from "react";
import { PostCard, Spinner, InfiniteCarousel } from "components/common";
import DefaultRecommendedList from "components/notice/RecommendedNoticeList/DefaultRecommendedList";
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
    params = { address: [user.userInfo.address], sort: "pay" as SortOption };
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
    return <DefaultRecommendedList />;
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
            const shopId = noticeList.items[noticeIndex].item.shop.item.id as string;
            const noticeId = noticeList.items[noticeIndex].item.id;
            return (
              <div draggable style={{ margin: "0 0.7rem", height: "100%" }}>
                <PostCard
                  hourlyPay={noticeList.items[noticeIndex].item.hourlyPay}
                  startsAt={noticeList.items[noticeIndex].item.startsAt}
                  workhour={noticeList.items[noticeIndex].item.workhour}
                  address={noticeList.items[noticeIndex].item.shop.item.address1}
                  imageUrl={noticeList.items[noticeIndex].item.shop.item.imageUrl as string}
                  originalHourlyPay={
                    noticeList.items[noticeIndex].item.shop.item.originalHourlyPay
                  }
                  closed={noticeList.items[noticeIndex].item.closed}
                  name={noticeList.items[noticeIndex].item.shop.item.name}
                  href={`/shops/${shopId}/notices/${noticeId}`}
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
