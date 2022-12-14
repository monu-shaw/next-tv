import { createClient } from '@supabase/supabase-js';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const supabase = createClient(
  process.env.clientID,
  process.env.clientKEY
);

export default async (req, res) => {
  if(req.method == 'POST'){
    const {name, imgUrl, low,mid,high,hd,language, category } = JSON.parse(req.body);
    try {
        if(name == ' '|| imgUrl ==' '|| low=='' || language ==''|| category==''){
             return res.status(500).json({ err: "All feilds required" });
        }else{
            const { data, error } = await supabase
                .from('channel')
                .insert([
                  { name, imgUrl, quality:{low,mid,high,hd}, language,category},
                ]);
                if(error == null){

                    return res.status(200).json({ err: data});
                }else{
                    console.log({ name, imgUrl:'fr', quality:{low,mid,high,hd}, language,category});
                    return res.status(500).json({ err: error});
                }
                
        }
      } catch (err) {
        console.log({ name, imgUrl, quality:{low,mid,high,hd}, language,category});
        return res.status(500).json({ err: err });
        
      }
      /* return res.status(200).json({ name, imgUrl, quality:{low,mid,high,hd}, language,category});
      
      //console.log(req);
      //return res.status(200).json(JSON.parse(req.body))*/
  } 
  
}

