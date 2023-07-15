import { CommonLayout, CardList } from "components/common";
import { INotice } from "types/dto";
import noticeList from "constants/mock/noticeList.json";

interface INoticeWithClosedInfo extends INotice {
  id: string,
  closed: boolean,
}

const EmployeeNotice = () => {
  const notice: INoticeWithClosedInfo[] = (
    noticeList.items as { item: INoticeWithClosedInfo }[]).map(({ item }) => { return item; });

  const shop = {
    name: "악마",
    address1: "서울시 강서구 ",
    imageUrl: "https://images.unsplash.com/photo-1630906086851-65a063a8cdd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1665&q=80",
    originalHourlyPay: 2,
  };

  return (
    <div>
      <CommonLayout position="below">
        <div>
          <h2>최근에 본 공고</h2>
        </div>
        <div>
          <CardList
            noticeList={notice}
            name={shop.name}
            address={shop.address1}
            imageUrl={shop.imageUrl}
            originalHourlyPay={shop.originalHourlyPay}
          />
        </div>
      </CommonLayout>
    </div>
  );
};

export default EmployeeNotice;
