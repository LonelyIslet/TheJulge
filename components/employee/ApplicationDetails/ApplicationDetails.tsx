/* eslint-disable @typescript-eslint/no-non-null-assertion */

"use client";

import { useEffect, useState } from "react";
import { useGetApplicationsByUserIdQuery } from "redux/api/applicationApi";
import useAppSelector from "redux/hooks/useAppSelector";
import {
  CommonDetail, CommonLayout, Loader, StatusChip,
} from "components/common";
import { EmployeeTable } from "components/notice";
import { IEmployeeNotices } from "types/notice/tables";
import formatTimeRange from "utils/formatTimeRange";
import { DetailType } from "types/enums/detailPage.enum";

const ApplicationDetails = () => {
  const user = useAppSelector((state) => { return state.user; });
  const {
    data, isLoading,
  } = useGetApplicationsByUserIdQuery({
    userId: user.userInfo?.id ?? "no-user",
    params: { offset: 0, limit: 6 },
  });
  const onPageClick = () => {};
  const [applicationList, setApplicationList] = useState<IEmployeeNotices[]>([]);
  useEffect(() => {
    if (!data) {
      return;
    }
    setApplicationList(data.items.map((i) => {
      const { item } = i;
      const { startsAt } = item.notice!.item;
      const workHour = item.notice!.item.workhour;
      return {
        id: item.id as string,
        store: item.shop!.item.name,
        date: formatTimeRange(startsAt, workHour),
        hourlyPay: item.notice!.item.hourlyPay,
        state: <StatusChip status={item.status} />,
      };
    }));
  }, [data]);
  if (!isLoading && data?.items.length === 0) {
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
            currentPage={5}
            lastPage={6}
            onPageClick={onPageClick}
          />
        )}
      </div>
    </CommonLayout>
  );
};

export default ApplicationDetails;
