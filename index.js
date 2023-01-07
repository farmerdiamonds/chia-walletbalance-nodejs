import { logIn } from './wallet.mjs';
import { getWalletBalance } from './wallet.mjs';
import { saveBalance } from './protocol.mjs';

const fingerprint = 0; // enter wallet fingerprint
let lastbalance = 0;
async function main(){
  console.log("Login to wallet with fingerprint: "+fingerprint);
  if(await logIn(fingerprint)){
    console.log("Requesting current XCH balance from wallet ...");
    const XCHAmount = await getWalletBalance(1);
    console.log("Current wallet balance: "+XCHAmount);
    if(XCHAmount==lastbalance){
      console.log("Balance hasn't changed");
    }else{
      console.log("Saving new balance to webserver...");
      lastbalance = XCHAmount;
      console.log(await saveBalance(XCHAmount));
    }
  }
  console.log("Waiting 300 Seconds for next update...");
  setTimeout(main,300000);
}
main();