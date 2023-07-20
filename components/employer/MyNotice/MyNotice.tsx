import {
  CommonLayout, CardList, CommonDetail,
} from "components/common";
import { DetailType } from "types/enums/detailPage.enum";
import { INotice } from "types/dto";

interface INoticeWithClosedInfo extends INotice {
  id: string;
  closed: boolean;
}

interface MyNoticeProps {
  noticeList: INoticeWithClosedInfo[];
}

const MyNotice = ({
  noticeList,
}: MyNoticeProps) => {
  return noticeList.length !== 0 ? (
    <CommonLayout position="below">
      <h2>내가 등록한 공고</h2>
      <CardList
        noticeList={noticeList}
      />
    </CommonLayout>
  ) : (
    <CommonDetail detailType={DetailType.NOTICE_DETAILS as DetailType} />
  );
};

export default MyNotice;
