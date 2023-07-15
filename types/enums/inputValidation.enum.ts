/**
 * input 유효성 검사 enum입니다.
 * @EMAIL 이메일 유효성 검사
 * @PASSWORD 비밀번호 형식 유효성 검사
 * @PASSWORD_CONFIRM 비밀번호 일치 유효성 검사
 * @TEL 전화번호 유효성 검사
 * @HOURLY_PAY 숫자 입력 시 원 단위가 인풋에 표시
 */

export enum ValidationTarget {
  EMAIL = "EMAIL",
  PASSWORD = "PASSWORD",
  PASSWORD_CONFIRM = "PASSWORD_CONFIRM",
  TEL = "TEL",
  HOURLY_PAY = "HOURLY_PAY",
}
