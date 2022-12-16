import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.clientID,
  process.env.clientKEY
);

export {supabase}