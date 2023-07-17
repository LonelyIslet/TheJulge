import {
  CommonLayout, CardList, CommonDetail,
} from "components/common";
import { DetailType } from "types/enums/detailPage.enum";
import { INotice } from "types/dto";

interface INoticeWithClosedInfo extends INotice {
  id: string,
  closed: boolean,
}

interface MyNoticeProps {
  noticeList: INoticeWithClosedInfo[],
  name: string,
  address: string,
  imageUrl: string,
  originalHourlyPay: number,
}

const MyNotice = ({
  noticeList, name, address, imageUrl, originalHourlyPay,
}: MyNoticeProps) => {
  return noticeList.length !== 0 ? (
    <CommonLayout position="below">
      <h2>내가 등록한 공고</h2>
      <CardList
        noticeList={noticeList}
        name={name}
        address={address}
        imageUrl={imageUrl}
        originalHourlyPay={originalHourlyPay}
      />
    </CommonLayout>
  ) : (
    <CommonDetail detailType={DetailType.NOTICE_DETAILS} />
  );
};

export default MyNotice;
