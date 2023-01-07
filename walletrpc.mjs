import { homedir } from 'node:os';
import { readFileSync } from 'node:fs';
import { copyFile } from 'node:fs';
import { Agent } from 'node:https';
import { request } from 'node:https';

async function walletRequest(path,data){
  const keypath = homedir() + '/.chia/mainnet/config/ssl/wallet/';
  let privatekey, privatecert;
  try{
    privatekey = readFileSync(keypath + "private_wallet.key",{encoding:'utf8',flag:'r'});
  }catch(e){
    console.log("Could not open wallet private key: "+e);
    return {success: false};
  }
  try{
    privatecert = readFileSync(keypath + "private_wallet.crt",{encoding:'utf8',flag:'r'});
  }catch(e){
    console.log("Could not open wallet private certificate: "+e);
    return {success: false};
  }
  const clientoptions = {
    hostname: '127.0.0.1',
    port: 9256, //check for correct port in .chia/mainnet/config/config.json
    path: path,
    method: 'POST',
    key: privatekey,
    cert: privatecert
  };
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
  clientoptions.agent = new Agent(clientoptions);
  return new Promise((resolve, reject) => {
    const walletrequest = request(clientoptions, (walletresponse) => {
      let responsedata = '';
      walletresponse.on('data', (chunk) => {
        responsedata += chunk;
      });
      walletresponse.on('end', () => {
        const responseobject = JSON.parse(responsedata.toString());
        resolve(responseobject);
      });
      walletrequest.on('error', (e) => {
        console.log("Requesterror:\n"+e);
        reject(e);
      });
      walletrequest.on('timeout', () => {
        nodereq.destroy();
        console.log("RPC Error:\n"+e);
        reject(new Error('Connection timeout'));
      });
    });
    walletrequest.write(data);
    walletrequest.end();
  });
}
export { walletRequest };