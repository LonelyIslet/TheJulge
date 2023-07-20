import CardList from "components/common/CardList/CardList";
import CommonLayout from "components/common/CommonLayout/CommonLayout";
import useAppSelector from "redux/hooks/useAppSelector";

const EmployeeNotice = () => {
  const viewHistory = useAppSelector((state) => { return state.user.viewHistory; });

  return (
    <CommonLayout position="below">
      <div>
        <h2>최근에 본 공고</h2>
      </div>
      <div>
        {viewHistory && <CardList noticeList={viewHistory} />}
      </div>
    </CommonLayout>
  );
};

export default EmployeeNotice;
