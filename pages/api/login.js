import { createClient } from '@supabase/supabase-js';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const supabase = createClient(
  process.env.clientID,
  process.env.clientKEY
);

export default (req, res) => {
  
  if(req.method== 'POST'){
    const {email , password} = req.body
  try {
    supabase.auth.signInWithPassword({email,password})
    .then((re) => {
        if(re.error == null){
         return res.status(200).json(re)
        }else{
          return res.status(400).json(re)
        }
      }).catch((err)=>{
        return res.status(500).json({ err: err });
      });
  } catch (err) {
    return res.status(500).json({ err: err });
  }
}else{
    if(req.method == 'GET'){
        try {
            supabase.auth.getSession()
            .then((re) => {
                if(re.error == null){
                 return res.status(200).json(re.data.session)
                }
              }).catch((err)=>{
                return res.status(500).json({ err: err });
              });
          } catch (err) {
            return res.status(500).json({ err: err });
          }
    }
}
};
