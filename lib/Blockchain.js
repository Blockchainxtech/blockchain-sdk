"use strict";const Block=require("./Block.js"),crypto=require("crypto");class Blockchain{constructor(){this.blockchain=[Block.genesis],this.difficulty=3}get(){return this.blockchain}get latestBlock(){return this.blockchain[this.blockchain.length-1]}isValidHashDifficulty(t){for(var i=0;i<t.length&&"0"===t[i];i++);return i>=this.difficulty}calculateHashForBlock(t){const{index:i,previousHash:s,timestamp:e,data:a,nonce:c}=t;return this.calculateHash(i,s,e,a,c)}calculateHash(t,i,s,e,a){return crypto.createHash("sha256").update(t+i+s+e+a).digest("hex")}mine(t){const i=this.generateNextBlock(t);try{this.addBlock(i)}catch(t){throw t}}generateNextBlock(t){const i=this.latestBlock.index+1,s=this.latestBlock.hash;let e=(new Date).getTime(),a=0,c=this.calculateHash(i,s,e,t,a);for(;!this.isValidHashDifficulty(c);)a+=1,e=(new Date).getTime(),c=this.calculateHash(i,s,e,t,a);return new Block(i,s,e,t,c,a)}addBlock(t){if(!this.isValidNextBlock(t,this.latestBlock))throw"Error: Invalid block";this.blockchain.push(t)}isValidNextBlock(t,i){const s=this.calculateHashForBlock(t);return i.index+1===t.index&&(i.hash===t.previousHash&&(s===t.hash&&!!this.isValidHashDifficulty(s)))}isValidChain(t){if(JSON.stringify(t[0])!==JSON.stringify(Block.genesis))return!1;const i=[t[0]];for(let s=1;s<t.length;s+=1){if(!this.isValidNextBlock(t[s],i[s-1]))return!1;i.push(t[s])}return!0}isChainLonger(t){return t.length>this.blockchain.length}replaceChain(t){if(!this.isValidChain(t)||!this.isChainLonger(t))throw"Error: invalid chain";this.blockchain=JSON.parse(JSON.stringify(t))}}module.exports=Blockchain;