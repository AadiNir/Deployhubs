import express from "express";
import cors from "cors";
import {generate} from "./utils";
import { getallfiles,addtos3 } from "./files";
import simpleGit from "simple-git";
import path from "path"
const app = express();
app.use(cors())
app.use(express.json())
app.post('/deploy',async (req,res)=>{
    const url = await req.body.githuburl;
    if(!url){
        console.log("no url provied")
    }
    const id = generate();
    await simpleGit().clone(url,path.join(__dirname,`outputs/${id}`));
    const files = await getallfiles(path.join(__dirname,`outputs/${id}`));
    for (const file of files) {
        await addtos3(file, id); // Sequentially upload files to S3
      }
    res.json({
        id:id
    });
})
app.listen(3000,()=>{
    console.log(__dirname)
    console.log("running on port 3000");
})