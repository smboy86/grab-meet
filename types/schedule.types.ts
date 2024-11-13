// 일정 상세, 일정 참여시 사용하는 데이터 형태
// DB에 저장된 상태와도 동일 - schedule/date_time, confirm_date
export type DateTime = Array<{ [date: string]: { time: string }[] }>;
