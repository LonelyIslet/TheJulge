import { EmployerTable } from "components/post";
import { StatusChip } from "components/common";
import { ApplyStatus } from "types/enums/apply.enum";
import styles from "./page.module.scss";

const HomePage = () => {
  return (
    <main className={styles.main}>
      <h1>더줄게</h1>
      <EmployerTable
        data={[
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
        currentPage={5}
        lastPage={6}
      />

    </main>
  );
};

export default HomePage;
