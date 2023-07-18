import { IGetNoticeResponse } from "redux/api/noticeApi";
import { INotice } from "types/dto";
import homeQueryStr from "utils/homeQueryStr";

const getNotices = async (keyword?: string, sort?: string) => {
  if (!process.env.API_BASE_URL) {
    return [];
  }

  const queryString = homeQueryStr(keyword, sort);

  const items: INotice[] = [];
  const res = await fetch(`${process.env.API_BASE_URL}/notices${queryString}`);
  const data = await res.json() as IGetNoticeResponse;

  data.items.forEach((noticeItem) => {
    items.push(noticeItem.item);
  });
  return items;
};

export default getNotices;
