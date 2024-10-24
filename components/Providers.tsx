import { Session } from "@supabase/supabase-js";
import {
  useContext,
  createContext,
  type PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { useStorageState } from "~/hooks/useStorageState";
import { supabase } from "~/utils/supabase";

const AuthContext = createContext<{
  session?: Session | null;
  isLoading: boolean;
}>({
  isLoading: false,
  session: null,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading]] = useStorageState("session");
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
