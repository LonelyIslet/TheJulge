"use client";

import { useState } from "react";
import {
  CommonLayout, NoticeCard, CommonBtn, StatusChip,
} from "components/common";
import { EmployerTable } from "components/notice";
import { ApplyStatus } from "types/enums/apply.enum";
import styles from "app/notice/page.module.scss";

const EmployerNotice = () => {
  const [currentPage, setCurronetPage] = useState<number>(1);
  const onPageClick = (page: number) => { setCurronetPage(page); };

  return (
    <>
      <div className={styles.top} />
      <div className={styles.bottom}>
        <CommonLayout position="below">
          <div>
            <h2>최근에 본 공고</h2>
          </div>
          <div>
            <EmployerTable
              applicationList={[
                {
                  id: 0,
                  name: "김승주",
                  intro: "최선을 다해 열심히 일합니다. 다수의 업무 경험을 바탕으로 확실한 일처리 보여드리겠습니다.",
                  phoneNumber: "010-1234-1234",
                  state: <StatusChip status={ApplyStatus.REJECTED} />,
                },
                {
                  id: 1,
                  name: "박유현",
                  intro: "열심히 하겠습니다!",
                  phoneNumber: "010-1234-1234",
                  state: <StatusChip status={ApplyStatus.ACCEPTED} />,
                },
                {
                  id: 2,
                  name: "박지석",
                  intro: "성실한 자세로 열심히 일합니다. 한번 경험해 보고 싶어요~",
                  phoneNumber: "010-1234-1234",
                  state: <StatusChip status={ApplyStatus.REJECTED} />,
                },
                {
                  id: 3,
                  name: "조세영",
                  intro: "일을 꼼꼼하게 하는 성격입니다. 퀸즈 초이스에서 일해보고 싶습니다.",
                  phoneNumber: "010-1234-1234",
                  state: <StatusChip status={ApplyStatus.PENDING} />,
                },
                {
                  id: 4,
                  name: "임병욱",
                  intro: "하루라도 최선을 다해서 일하겠습니다! 감사합니다.",
                  phoneNumber: "010-1234-1234",
                  state: <StatusChip status={ApplyStatus.ACCEPTED} />,
                },
              ]}
              currentPage={currentPage}
              lastPage={9}
              onPageClick={onPageClick}
            />

          </div>
        </CommonLayout>
      </div>
    </>
  );
};

export default EmployerNotice;
