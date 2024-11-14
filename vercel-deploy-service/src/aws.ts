import { createClient } from "redis";
import { S3 } from "aws-sdk";
import path from "path";
import fs from "fs"
require('dotenv').config();
const publisher = createClient();
publisher.connect();
const s3  = new S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
})
export async function downloadfiles(filepath : string){
    const allobjects = await s3.listObjectsV2({
        Bucket:"vercel",
        Prefix:filepath
    }).promise();

    allobjects.Contents?.map(async ({Key}) => {
        if(Key){
            const finalpath = path.join(__dirname,Key);
            const outputfile = fs.createWriteStream(finalpath )
            
            var parms ={
                Bucket:`vercel-bucket-aadinir/${filepath}`,
                Key:filepath
            }

        }
    });
        
        await s3.getObject(parms,(err,data)=>{
            console.log(data)
        }).promise();
    

    
}