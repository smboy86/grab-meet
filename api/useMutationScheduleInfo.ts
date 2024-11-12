import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DateTime } from '~/app/detail/schedule/[id]';
import { Json } from '~/types/database.types';
import { supabase } from '~/utils/supabase';

type Props = {
  id: string;
  confirm_date: DateTime;
};

type ReturnValue = {
  schedule_id: string | null;
  title: string | null;
  status: string | null;
  date_time: Json | null; // 투표 대상 날짜/시간
  member_cnt: number | null; // 참여 인원
  confirm_date: string | null; // 확정일 2024. 10. 11
};

const useMutationScheduleInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, confirm_date }: Props) => {
      const { data, error } = await supabase
        .from('schedule')
        .update({
          confirm_date: JSON.stringify(confirm_date),
          status: '확정',
        })
        .eq('schedule_id', id)
        .select();

      if (error) throw new Error('err 이게 뭔 에러여.. useMutationScheduleInfo : ' + error.message);

      return data;
    },
    onSuccess: async () => {
      console.log('일정 확정 완료');
      await queryClient.invalidateQueries({ queryKey: ['home'] });
    },
  });
};

export default useMutationScheduleInfo;
export type { ReturnValue as useMutationScheduleInfoProps };
