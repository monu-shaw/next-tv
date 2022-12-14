import { createClient } from '@supabase/supabase-js';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const supabase = createClient(
  process.env.clientID,
  process.env.clientKEY
);
export default (req, res) => {
  try {
    supabase
      .from('channel')
      .select('*')
      .then((re) => res.status(200).json(re.data));
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
