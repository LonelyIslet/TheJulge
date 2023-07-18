import { ApplyStatus } from "types/enums/apply.enum";
import styles from "./StatusChip.module.scss";

const labelMap = {
  [ApplyStatus.PENDING]: "대기중",
  [ApplyStatus.ACCEPTED]: "승인 완료",
  [ApplyStatus.REJECTED]: "거절됨",
  [ApplyStatus.CANCELED]: "취소됨",
};

interface StatusChipProps {
  status: ApplyStatus;
}

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
