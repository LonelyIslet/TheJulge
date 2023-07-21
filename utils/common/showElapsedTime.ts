const showElapsedTime = (dateString: string) => {
  const updatedDate = new Date(dateString);
  const today = new Date();
  const timeDiff = today.getTime() - updatedDate.getTime();

  const MINUTE = 60 * 1000;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;
  const MONTH = DAY * 31;

  const timeMap = {
    [MINUTE * 2]: () => { return "1분 전"; },
    [MINUTE * 59]: (diff: number) => { return `${Math.floor(diff / MINUTE)}분 전`; },
    [HOUR * 2]: () => { return "1시간 전"; },
    [HOUR * 23]: (diff: number) => { return `${Math.floor(diff / HOUR)}시간 전`; },
    [DAY * 2]: () => { return "1일 전"; },
    [DAY * 30]: (diff: number) => { return `${Math.floor(diff / DAY)}일 전`; },
    [MONTH * 2]: () => { return "1개월 전"; },
    [MONTH * 12]: (diff: number) => { return `${Math.floor(diff / MONTH)}개월 전`; },
    [MONTH * 12 * 2]: () => { return "1년 전"; },
  };

  const diff = Object.keys(timeMap).find((key) => { return timeDiff < Number(key); });

  if (diff) {
    return timeMap[Number(diff)](timeDiff);
  }

  const years = Math.floor(timeDiff / (MONTH * 12));
  return `${years}년 전`;
};

export default showElapsedTime;
