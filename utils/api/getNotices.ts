import { INotice } from "types/dto";
import { GetNoticesProps } from "types/notice/filter";
import { IGetNoticeResponse } from "redux/api/noticeApi";
import parseQuery from "utils/notice/parseQuery";

const getNotices = async ({
  keyword,
  sort,
  filter,
}: GetNoticesProps) => {
  if (!process.env.API_BASE_URL) {
    return [];
  }

  const queryString = parseQuery({ keyword, sort, filter });

  const items: INotice[] = [];
  const res = await fetch(`${process.env.API_BASE_URL}/notices${queryString}`);
  const data = await res.json() as IGetNoticeResponse;

  data.items.forEach((noticeItem) => {
    items.push(noticeItem.item);
  });

  return items;
};

export default getNotices;
