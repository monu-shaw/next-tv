import { createClient } from "@supabase/supabase-js";

export default createClient(
  process.env.clientID,
  process.env.clientKEY
);