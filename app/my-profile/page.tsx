/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonDetail, CommonLayout, StatusChip } from "components/common";
import { EmployeeTable } from "components/notice";
import RegisteredMyProfile from "components/employee/RegisteredMyProfile/RegisteredMyProfile";
import { DetailType } from "types/enums/detailPage.enum";
import { ApplyStatus } from "types/enums/apply.enum";
import styles from "./page.module.scss";

const MyPage = () => {
  const onPageClick = () => {};
  return (
    <>
      <div className={styles.top}>
        <CommonDetail detailType={DetailType.APPLICATION_DETAILS} />
        {/* <RegisteredMyProfile name="곽철용" phone="010-1234-1234" address="서울시 마포구" /> */}
      </div>
      <div className={styles.bottom}>
        {/* <CommonDetail detailType={DetailType.APPLICATION_DETAILS} /> */}
        {/* <CommonLayout position="below">
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
        </CommonLayout> */}
      </div>
    </>
  );
};

export default MyPage;
