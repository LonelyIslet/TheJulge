import { StatusChip } from "components/common";
import { ApplyStatus } from "types/enums/apply.enum";

const page = () => {
  return (
    <main>
      <StatusChip status={ApplyStatus.PENDING} />
    </main>
  );
};

export default page;
