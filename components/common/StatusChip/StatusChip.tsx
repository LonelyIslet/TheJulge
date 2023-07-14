import { ApplyStatus } from "types/enums/apply.enum";

import styles from "./StatusChip.module.scss";

interface StatusChipProps {
  status: ApplyStatus;
}

const labelMap = {
  [ApplyStatus.PENDING]: "대기중",
  [ApplyStatus.ACCEPTED]: "승인 완료",
  [ApplyStatus.REJECTED]: "거절됨",
};

const StatusChip = ({
  status,
}: StatusChipProps) => {
  const statusClass = status.toLocaleLowerCase();
  return (
    <div className={`${styles.chipContainer} ${styles[statusClass]}`}>
      {labelMap[status]}
    </div>
  );
};

export default StatusChip;
