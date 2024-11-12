export function generate(){
    const set = "abcdefghijklmnopqrstuvwxyz1234567890";
    var ans = "";
    for(let i=0;i<5;i++){
        ans+=set.charAt(Math.floor(Math.random()*set.length));
    }
    return ans;
}
