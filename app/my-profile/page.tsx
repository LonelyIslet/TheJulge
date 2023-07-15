"use client";

import { CommonDetail, CommonLayout, StatusChip } from "components/common";
import RegisteredMyProfile from "components/employee/RegisteredMyProfile/RegisteredMyProfile";
import EmployeeTable from "components/post/EmployeeTable/EmployeeTable";
import { DetailType } from "types/enums/detailPage.enum";
import { ApplyStatus } from "types/enums/apply.enum";
import styles from "./page.module.scss";

const MyPage = () => {
  const onPageClick = () => {
    console.log("안녕");
  };
  return (
    <>
      <div className={styles.top}>
        <RegisteredMyProfile />
      </div>
      <div className={styles.bottom}>
        {/* <CommonDetail detailType={DetailType.APPLICATIONDETAILS} /> */}
        <CommonLayout position="above">
          <div>
            <h2>신청 내역</h2>
          </div>
          <div>
            <EmployeeTable
              data={[
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
      </div>
    </>
  );
};

export default MyPage;
