import { INoticeData } from "types/dto";

const parseNoticesData = (data: INoticeData) => {
  const items = [];

  data.items.forEach((noticeItem) => {
    items.push(noticeItem.item);
  });
  return items;
};

export default parseNoticesData;
