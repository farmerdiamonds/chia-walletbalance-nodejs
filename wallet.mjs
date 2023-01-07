import { walletRequest } from './walletrpc.mjs';

function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

async function logIn(fingerprint){
  let payload = {};
  const timeout = 120000;
  let timeused = 0;
  payload.fingerprint = fingerprint;
  const loginstatus = await walletRequest("/log_in",JSON.stringify(payload));
  if(loginstatus.fingerprint==fingerprint){
    console.log("Syncing wallet with fingerprint: "+fingerprint);
    while(!(await isSynced())&&(timeused<=timeout)){
      await sleep(1000);
      timeused+=1000;
    }
    if(timeused<=timeout){
      return true;
    }else{
      console.log("Sync timeout");
      return false;
    }
  }else{
    return false;
  }
}
async function isSynced(){
  const syncstatus = await walletRequest("/get_sync_status","{}");
  if(syncstatus.synced == true)
    return true;
  else
   return false;
}

async function getWalletBalance(walletid){
  let payload = {};
  payload.wallet_id = walletid;
  const balance = await walletRequest("/get_wallet_balance",JSON.stringify(payload));
  if(balance.success == true)
    return balance.wallet_balance.confirmed_wallet_balance;
  else{
    return -1;
  }
}

export {
  logIn,
  getWalletBalance
};