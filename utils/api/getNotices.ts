import { INoticeData } from "types/dto";
import parseNoticesData from "utils/parseNoticesData";

const getNotices = async () => {
  const items = [];
  const res = await fetch(`${process.env.API_BASE_URL}/notices`);
  const data: INoticeData = await res.json();

  data.items.forEach((noticeItem) => {
    items.push(noticeItem.item);
  });
  return items;
};

export default getNotices;
