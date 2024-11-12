import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Json } from '~/types/database.types';
import { supabase } from '~/utils/supabase';

type Props = {
  title: string | null;
  member_cnt: number | null; // 참여 인원
  date_time: Json[] | null; // 투표일 2024. 10. 11
};

type ReturnValue = {
  schedule_id: string | null;
  title: string | null;
  status: string | null;
  date_time: Json[] | null; // 투표 대상 날짜/시간
  member_cnt: number | null; // 참여 인원
};

const useMutationInsertSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, member_cnt, date_time }: Props) => {
      const { data, error } = await supabase
        .from('schedule')
        .insert({
          title,
          member_cnt,
          date_time: date_time,
          status: '투표중',
        })
        .select();

      if (error) throw new Error('err 이게 뭔 에러여.. useMutationInsertSchedule : ' + error.message);

      return data;
    },
    onSuccess: async () => {
      // console.log('일정 생성 완료');
      queryClient.invalidateQueries({ queryKey: ['home'] });
    },
  });
};

export default useMutationInsertSchedule;
export type { Props as useMutationInsertScheduleProps };
export type { ReturnValue as useMutationInsertScheduleReturnValueProps };
