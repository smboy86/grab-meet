import { useQuery } from '@tanstack/react-query';
import { Json } from '~/types/database.types';
import { supabase } from '~/utils/supabase';

type Props = {
  id: string;
};

type ReturnValue = {
  hp: string;
  schedule_id: string;
  date_time: Json | null;
};

const useGetGrabStatus = ({ id }: Props) => {
  return useQuery<Array<ReturnValue>>({
    queryKey: ['schedule_grab', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('schedule_grab')
        // .select(`schedule_id, title, status, date_time, member_cnt, confirm_date`)
        .select(`schedule_id, hp, date_time`)
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

export default useGetGrabStatus;
export type { ReturnValue as useGetGrabStatusProps };
