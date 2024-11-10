import fs from "fs/promises"
import path from "path";
import { S3 } from "aws-sdk";
require('dotenv').config();
export async function getallfiles(filepath : any):Promise<string[]>{
    let ans:string[] =[];
    try{
    const fl = await fs.readdir(filepath);
    fl.map(file=> ans.push(path.join(filepath+"/"+file)));
    }catch{
        console.log("can't access the path");
    }
        
    return ans;
}
export async function addtos3(filepath:string){
    const s3 = new S3({
        accessKeyId:process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
    })
    const filecontent = await fs.readFile(filepath);
    const params={
        Bucket: "vercel-bucket-aadinir",
        Key:path.basename(filepath),
        Body:filecontent
    }
    s3.upload(params, (err:any, data:any) => {
        if (err) {
          console.error('Error uploading file:', err);
        } else {
          console.log(`File uploaded successfully. ${data.Location}`);
        }
      });
    console.log(s3);
}
