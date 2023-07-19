import { INotice } from "types/dto";
import { GetNoticesParams } from "types/notice/filter";
import { IGetNoticeResponse } from "redux/api/noticeApi";
import parseQuery from "utils/notice/parseQuery";

const getNotices = async ({
  keyword,
  sort,
  filter,
}: GetNoticesParams) => {
  if (!process.env.API_BASE_URL) {
    return [];
  }

  const queryString = parseQuery({ keyword, sort, filter });

  const items: INotice[] = [];
  const res = await fetch(`${process.env.API_BASE_URL}/notices${queryString}`);
  const data = await res.json() as IGetNoticeResponse;

  if (data.items) {
    data.items.forEach((noticeItem) => {
      items.push(noticeItem.item);
    });
  }

  return items;
};

export default getNotices;
