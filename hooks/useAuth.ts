import { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { supabase } from "~/utils/supabase";

const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // console.log("useAuth ::: ", session);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setTimeout(async () => {
        setSession(session);
      }, 0);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { session };
};

export default useAuth;
