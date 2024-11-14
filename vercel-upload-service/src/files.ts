import fs from "fs/promises"
import fsk from "fs"
import path from "path";
import { S3 } from "aws-sdk";

require('dotenv').config();
export async function getallfiles(filepath : any){
  let ans: string[] = [];
  try {
      const files = await fs.readdir(filepath);
      const promises = files.map(async (file) => {
          const fullpath = path.join(filepath, file);
          const stats = await fs.stat(fullpath);  // Fix: use `fs.stat`
          if (stats.isDirectory()) {
              const nestedFiles = await getallfiles(fullpath); // Recursively get files
              ans = ans.concat(nestedFiles); // Concatenate results
          } else {
              ans.push(fullpath);
          }
      });
      await Promise.all(promises); // Wait for all recursive operations to complete
  } catch (error) {
      console.log("Can't access the path:", error);
  }
  
  return ans;
}
const s3 = new S3({
  accessKeyId:process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
})
export async function addtos3(filepath:string,foldername:string){
    console.log(path.basename(filepath));
    const filecontent = await fsk.readFileSync(filepath);
    await s3.upload({
      Bucket: `vercel-bucket-aadinir/${foldername}`,
      Key:path.basename(filepath),
        Body:filecontent
    }).promise();
}
