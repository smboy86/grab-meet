import { z } from 'zod';

// ex) [ { "2023-10-05": [ { time: "10:00" } ] }, ..... ]
export const DayTimeScheme = z.array(
  z.record(
    z.string(), // Date 형태의 키를 사용합니다.
    z.array(
      z.object({
        time: z.string(),
      }),
    ),
  ),
);
