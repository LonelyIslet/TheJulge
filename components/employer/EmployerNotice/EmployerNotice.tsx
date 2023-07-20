"use client";

import { useEffect, useState } from "react";
import { CommonLayout, StatusChip } from "components/common";
import { EmployerTable } from "components/notice";
import { ApplyStatus } from "types/enums/apply.enum";
import { useParams } from "next/navigation";
import { useGetApplicationsByShopAndNoticeIdQuery } from "redux/api/applicationApi";

const EmployerNotice = () => {
  const [pageNum, setPageNum] = useState<number>(1);
  const onPageClick = (page: number) => { setPageNum(page); };
  const params = useParams();
  const { data, isLoading } = useGetApplicationsByShopAndNoticeIdQuery({ shopId: params.shopId, noticeId: params.noticeId, params: { offset: pageNum - 1, limit: 5 } });

  const [applicantList, setApplicantList] = useState([]);

  useEffect(() => {
    if (!data) {
      return;
    }
    setApplicantList(data?.items.map((i) => {
      const { item } = i;
      return {
        id: item.user.item.id,
        name: item.user.item.name,
        intro: item.user.item.bio,
        phoneNumber: item.user.item.phone,
        state: <StatusChip status={item.status} />,
      };
    }));
  }, [data]);

  console.log(data);

  return (
    <CommonLayout position="below">
      <div>
        <h2>신청자 목록</h2>
      </div>
      <div>
        <EmployerTable
          applicationList={applicantList}
          currentPage={pageNum}
          lastPage={Math.ceil((data?.count ?? 0) / 5)}
          onPageClick={onPageClick}
        />
      </div>
    </CommonLayout>
  );
};

export default EmployerNotice;
