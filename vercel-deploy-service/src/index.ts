import { createClient,commandOptions } from "redis";
import { downloadfiles } from "./aws";
const subsrciber =  createClient();
subsrciber.connect()
async function main(){
    while(1){
        const resp = await subsrciber.brPop(
            commandOptions({isolated:true}),
            'build-queue',
            0
        );
        
        const ele:any = resp?.element
        console.log(ele);
        await downloadfiles(ele)

    }
}
main();