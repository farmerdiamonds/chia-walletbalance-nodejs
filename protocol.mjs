import { homedir } from 'node:os';
import { writeFileSync } from 'node:fs';
import { Agent } from 'node:https';
import { request } from 'node:https';
async function saveBalance(balance){
  const protocolpath = homedir() + '/protocol/';
  const path = '/protocol.php';
  const clientoptions = {
    hostname: 'example.com',
    port: 443,
    path: path,
    method: 'POST',
  };
  let data={};
  data.token = 'yoursecrettoken';
  data.balance = balance;
  clientoptions.agent = new Agent(clientoptions);
  return new Promise((resolve, reject) => {
    const serverrequest = request(clientoptions, (serverresponse) => {
      let responsedata = '';
      serverresponse.on('data', (chunk) => {
        responsedata += chunk;
      });
      serverresponse.on('end', () => {
        console.log("1: "+responsedata);
        const responseobject = JSON.parse(responsedata.toString());
        resolve(responseobject);
      });
      serverrequest.on('error', (e) => {
        console.log("Requesterror:\n"+e);
        reject(e);
      });
      serverrequest.on('timeout', () => {
        nodereq.destroy();
        console.log("RPC Error:\n"+e);
        reject(new Error('Connection timeout'));
      });
    });
    serverrequest.write(JSON.stringify(data));
    serverrequest.end();
  });
}
export {
  saveBalance
};