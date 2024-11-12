import { createClient,commandOptions } from "redis";
const subsrciber =  createClient();
subsrciber.connect()
async function main(){
    while(1){
        const resp = await subsrciber.brPop(
            commandOptions({isolated:true}),
            'build-queue',
            0
        );
        console.log(resp)
    }
}
main();