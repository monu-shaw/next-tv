import { createClient } from '@supabase/supabase-js';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const supabase = createClient(
  process.env.clientID,
  process.env.clientKEY
);

export default (req, res) => {
  if(req.method == 'POST'){
    const {id } = JSON.parse(req.body);
    try {
            supabase
                .from('channel')
                .delete()
                .eq('id', id)
                .then((r)=>{
                  if(r.error == null){
                      return res.status(200).json(r);
                  }else{
                      return res.status(500).json({ err: r.error});
                  }
                }).catch(err=> console.log(err));
      } catch (err) {
        return res.status(500).json({ err: err });
        
      }
  } 
  console.log(JSON.parse(req.body));
}

