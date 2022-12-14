import { createClient } from '@supabase/supabase-js';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const supabase = createClient(
  process.env.clientID,
  process.env.clientKEY
);

export default (req, res) => {
  if(req.method == 'POST'){
    const {name, imgUrl, low,mid,high,hd,language, category, id } = JSON.parse(req.body);
    try {
        if(name == ' '|| imgUrl ==' '|| low=='' || language ==''|| category==''){
             return res.status(500).json({ err: "All feilds required" });
        }else{
            //const { data, error } = await 
            supabase
                .from('channel')
                .update({ name, imgUrl, quality:{low,mid,high,hd}, language,category})
                .eq('id', id)
                .then((r)=>{
                  if(r.error == null){
                      return res.status(200).json({DATA: r, id:id});
                  }else{
                      return res.status(500).json({ err: r.error});
                  }
                })
                
                
        }
      } catch (err) {
        console.log({ name, imgUrl, quality:{low,mid,high,hd}, language,category});
        return res.status(500).json({ err: err });
        
      }
  } 
  
}

