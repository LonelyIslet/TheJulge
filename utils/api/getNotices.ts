import { IGetNoticeResponse } from "redux/api/noticeApi";
import { Sort } from "types/notice/queries";
import { Address1 } from "types/shop/address";
import generateAPIQuery from "utils/notices/generateAPIQuery";
import LIMIT from "constants/notice/options/LIMIT";

export interface GetNoticesParams {
  page?: number;
  keyword?: string;
  sort?: Sort;
  address?: Address1[];
  startsAtGte?: string;
  hourlyPayGte?: number;
}

const getNotices = async ({
  page,
  keyword,
  sort,
  address,
  startsAtGte,
  hourlyPayGte,
}: GetNoticesParams) => {
  if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
    return { count: 0, noticeList: [] };
  }

  const offset = page ? (page - 1) * LIMIT : undefined;

  const queryString = generateAPIQuery({
    offset,
    keyword,
    sort,
    address,
    startsAtGte,
    hourlyPayGte,
  });

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/notices${queryString}`);
    const { count, items } = await res.json() as IGetNoticeResponse;

    const noticeList = items ? items.map((notice) => { return notice.item; }) : [];

    return { count, noticeList };
  } catch (err) {
    console.error("Error fetching notices:", err);
    return { count: 0, noticeList: [] };
  }
};

export default getNotices;
