import { GetNoticesParams } from "types/notice/filter";
import { IGetNoticeResponse } from "redux/api/noticeApi";
import generateAPIQuery from "utils/notice/generateAPIQuery";
import LIMIT from "constants/notice/options/LIMIT";

const getNotices = async ({
  page,
  keyword,
  sort,
  address,
  startsAtGte,
  hourlyPayGte,
}: GetNoticesParams) => {
  if (!process.env.API_BASE_URL) {
    return { count: 0, noticeList: [] };
  }

  const offset = page ? (page - 1) * LIMIT : undefined;
  const limit = LIMIT;

  const queryString = generateAPIQuery({
    offset,
    limit,
    keyword,
    sort,
    address,
    startsAtGte,
    hourlyPayGte,
  });

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/notices${queryString}`);
    const { count, items } = await res.json() as IGetNoticeResponse;

    const noticeList = items ? items.map((notice) => { return notice.item; }) : [];

    return { count, noticeList };
  } catch (err) {
    console.error("Error fetching notices:", err);
    return { count: 0, noticeList: [] };
  }
};

export default getNotices;
