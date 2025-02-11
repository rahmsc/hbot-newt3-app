import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import type { Database } from "types/database";

let supabaseInstance: ReturnType<typeof createClientComponentClient<Database>>;

export function useSupabase() {
  const [client] = useState(() => {
    if (!supabaseInstance) {
      supabaseInstance = createClientComponentClient<Database>();
    }
    return supabaseInstance;
  });

  return client;
}
