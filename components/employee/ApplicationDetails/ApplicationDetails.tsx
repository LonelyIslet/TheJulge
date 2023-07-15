"use client";

import CommonLayout from "components/common/CommonLayout/CommonLayout";
import StatusChip from "components/common/StatusChip/StatusChip";
import EmployeeTable from "components/notice/EmployeeTable/EmployeeTable";
import { ApplyStatus } from "types/enums/apply.enum";

const ApplicationDetails = () => {
  const onPageClick = () => {};

  return (
    <CommonLayout position="below">
      <div>
        <h2>신청 내역</h2>
      </div>
      <div>
        <EmployeeTable
          applicationList={[
            {
              id: 0,
              store: "김승주",
              date: "2023-01-12 10:00 ~ 12:00 (2시간)",
              hourlyPay: 15000,
              state: <StatusChip status={ApplyStatus.REJECTED} />,
            },
            {
              id: 0,
              store: "김승주",
              date: "2023-01-12 10:00 ~ 12:00 (2시간)",
              hourlyPay: 15000,
              state: <StatusChip status={ApplyStatus.REJECTED} />,
            },
            {
              id: 0,
              store: "김승주",
              date: "2023-01-12 10:00 ~ 12:00 (2시간)",
              hourlyPay: 15000,
              state: <StatusChip status={ApplyStatus.REJECTED} />,
            },
            {
              id: 0,
              store: "김승주",
              date: "2023-01-12 10:00 ~ 12:00 (2시간)",
              hourlyPay: 15000,
              state: <StatusChip status={ApplyStatus.REJECTED} />,
            },
            {
              id: 0,
              store: "김승주",
              date: "2023-01-12 10:00 ~ 12:00 (2시간)",
              hourlyPay: 15000,
              state: <StatusChip status={ApplyStatus.REJECTED} />,
            },
            {
              id: 0,
              store: "김승주",
              date: "2023-01-12 10:00 ~ 12:00 (2시간)",
              hourlyPay: 15000,
              state: <StatusChip status={ApplyStatus.REJECTED} />,
            },

          ]}
          currentPage={5}
          lastPage={6}
          onPageClick={onPageClick}
        />
      </div>
    </CommonLayout>
  );
};

export default ApplicationDetails;
