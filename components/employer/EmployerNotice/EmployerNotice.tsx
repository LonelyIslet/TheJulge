"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CommonLayout, Loader, StatusChip } from "components/common";
import { EmployerTable, CheckStatusButton } from "components/notice";
import { useGetApplicationsByShopAndNoticeIdQuery } from "redux/api/applicationApi";
import { IEmployerNotices } from "types/notice/tables";

const EmployerNotice = () => {
  const [pageNum, setPageNum] = useState<number>(1);
  const onPageClick = (page: number) => { setPageNum(page); };
  const params = useParams();
  const { data: applicationInfo } = useGetApplicationsByShopAndNoticeIdQuery({
    shopId: params.shopId,
    noticeId: params.noticeId,
    params: { offset: pageNum - 1, limit: 5 },
  });

  const [applicantList, setApplicantList] = useState<IEmployerNotices[]>();

  useEffect(() => {
    if (!applicationInfo) {
      return;
    }

    if (applicationInfo && applicationInfo.items) {
      setApplicantList(applicationInfo.items.map((i) => {
        const { item } = i;
        return {
          id: item?.user?.item.id as string,
          name: item?.user?.item.name as string,
          intro: item?.user?.item.bio as string,
          phoneNumber: item?.user?.item.phone as string,
          state: item.status === "pending"
            ? <CheckStatusButton userId={item.user?.item.id as string} />
            : <StatusChip status={item.status} />,
        };
      }));
    }
  }, [applicationInfo]);

  return (
    <CommonLayout position="below">
      <div>
        <h2>신청자 목록</h2>
      </div>
      <div>
        {applicantList
        && (
        <EmployerTable
          applicationList={applicantList}
          currentPage={pageNum}
          lastPage={Math.ceil((applicationInfo?.count ?? 0) / 5)}
          onPageClick={onPageClick}
        />
        )}
        {!applicantList && <Loader />}
      </div>
    </CommonLayout>
  );
};

export default EmployerNotice;
