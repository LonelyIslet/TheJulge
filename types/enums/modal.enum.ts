/**
 * 모달 타입 enum입니다.
 * @CONFIRM 확인 버튼 단독으로 있는 모달, 경고, 알림 모달 등에 사용
 * @ACTION 후퇴, 진행 버튼이 있으며 특정 액션을 취하는 모달
 */
export enum ModalType {
  CONFIRM = "CONFIRM",
  ACTION = "ACTION",
}
