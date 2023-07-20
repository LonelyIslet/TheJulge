/* eslint-disable @typescript-eslint/no-non-null-assertion */

"use client";

import { useEffect, useState } from "react";
import { CommonDetail, Loader } from "components/common";
import CommonLayout from "components/common/CommonLayout/CommonLayout";
import StatusChip from "components/common/StatusChip/StatusChip";
import EmployeeTable from "components/notice/EmployeeTable/EmployeeTable";
import EmployeeNotice from "components/employee/EmployeeNotice/EmployeeNotice";
import { useGetApplicationsByUserIdQuery } from "redux/api/applicationApi";
import { IEmployeeNotices } from "types/notice/tables";
import { DetailType } from "types/enums/detailPage.enum";
import useAppSelector from "redux/hooks/useAppSelector";
import formatTimeRange from "utils/formatTimeRange";

const ApplicationDetails = () => {
  const user = useAppSelector((state) => { return state.user; });
  const [pageNum, setPageNum] = useState(1);

  const {
    data, isLoading,
  } = useGetApplicationsByUserIdQuery({
    userId: user.userInfo?.id ?? "no-user",
    params: { offset: pageNum - 1, limit: 5 },
  });

  const onPageClick = (selectedPageNum: number) => {
    setPageNum(selectedPageNum);
  };

  const [applicationList, setApplicationList] = useState<IEmployeeNotices[]>([]);

  useEffect(() => {
    if (!data) {
      return;
    }
    setApplicationList(data.items.map((i) => {
      const { item } = i;
      const { startsAt } = item.notice.item;
      const workHour = item.notice.item.workhour;
      return {
        id: item.id as string,
        store: item.shop!.item.name,
        date: formatTimeRange(startsAt, workHour),
        hourlyPay: item.notice.item.hourlyPay,
        state: <StatusChip status={item.status} />,
      };
    }));
  }, [data]);

  if (user.userInfo?.type === "employee" || user.userInfo?.type === undefined) {
    return <EmployeeNotice />;
  }

  if (user.userInfo?.type === "employer" && !isLoading && data?.items.length === 0) {
    return <CommonDetail detailType={DetailType.APPLICATION_DETAILS} />;
  }
  return (
    <CommonLayout position="below">
      <div>
        <h2>신청 내역</h2>
      </div>
      <div>
        {isLoading ? <Loader /> : (
          <EmployeeTable
            applicationList={applicationList}
            currentPage={pageNum}
            lastPage={Math.ceil((data?.count ?? 0) / 5)}
            onPageClick={onPageClick}
          />
        )}
      </div>
    </CommonLayout>
  );
};

export default ApplicationDetails;
