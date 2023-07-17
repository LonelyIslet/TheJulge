/**
 * 공고 신청에 대한 상태 enum입니다.
 * @PENDING 대기중
 * @REJECTED 거절됨
 * @ACCEPTED 승인 완료
 */
export enum ApplyStatus {
  PENDING = "pending",
  REJECTED = "rejected",
  ACCEPTED = "accepted",
  CANCELED = "canceled",
}
