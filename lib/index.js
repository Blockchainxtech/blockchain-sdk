"use strict";

var _express = _interopRequireDefault(require("express"));

var _Blockchain = _interopRequireDefault(require("./Blockchain"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const blockchain = new _Blockchain.default();
console.log("bc " + JSON.stringify(blockchain.latestBlock));
console.log("\n");
blockchain.mine("siva");
console.log("bc " + JSON.stringify(blockchain.latestBlock));
console.log("\n");
app.listen(8080, () => {
  console.log("App running on port 8080");
});
console.log("chain " + JSON.stringify(blockchain.get()));