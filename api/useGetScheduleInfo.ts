import { useQuery } from '@tanstack/react-query';
import { Json } from '~/types/database.types';
import { supabase } from '~/utils/supabase';

type Props = {
  id: string;
};

type ReturnValue = {
  schedule_id: string | null;
  title: string | null;
  status: string | null;
  date_time: Json | null; // 투표 대상 날짜/시간
  member_cnt: number | null; // 참여 인원
  confirm_date: string | null; // 확정일 2024. 10. 11
};

const useGetScheduleDetail = ({ id }: Props) => {
  return useQuery<Array<ReturnValue>>({
    queryKey: ['schedule_info', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('schedule')
        .select(`schedule_id, title, status, date_time, member_cnt, confirm_date`)
        .eq('schedule_id', id);

      if (error || !data) {
        throw new Error('An error occurred while fetching data: ' + error?.message);
      }

      return data;
    },
    refetchOnWindowFocus: true,
    retry: 1,
  });
};

export default useGetScheduleDetail;
export type { ReturnValue as useGetScheduleDetailProps };
