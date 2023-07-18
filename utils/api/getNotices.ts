import { IGetNoticeResponse } from "redux/api/noticeApi";
import { INotice } from "types/dto";

const getNotices = async (keyword?: string) => {
  const items: INotice[] = [];
  const res = await fetch(`${process.env.API_BASE_URL || ""}/notices${keyword ? `?keyword=${keyword}` : ""}`);
  const data = await res.json() as IGetNoticeResponse;

  data.items.forEach((noticeItem) => {
    items.push(noticeItem.item);
  });
  return items;
};

export default getNotices;
