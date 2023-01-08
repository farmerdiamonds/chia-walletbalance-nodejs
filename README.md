# chia-walletbalance-nodejs
Small nodejs program to send changes in the balance of a Chia-wallet to a remote webserver.

Tested on
Ubuntu
NodeJS Version v18.12.1
Chia-Blockchain v1.3.1

Do not use this in production, take it as an example on how one could program such a functionality.

To make this program work you have to enter the wallet fingerprint you want to use in the index.js file.

In the modulefile protocol.mjs you have to change the hostname for the destination webserver and the path to the script which will process the JSON data created in the form of {"token":"yoursecrettoken", "balance":1234}

You can doublecheck the path to the key and the certificate of your Chia-blockchain installation and the RPC port in the modulefile walletrpc.mjs
