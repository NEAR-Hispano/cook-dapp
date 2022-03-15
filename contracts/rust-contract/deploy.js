const packageName = require("fs")
  .readFileSync(`./Cargo.toml`)
  .toString()
  .match(/name = "([^"]+)"/)[1];
const outFile = `./target/wasm32-unknown-unknown/release/${packageName}.wasm`;
const sh = require("shelljs");
const accountID = "cook_dapp_recipes.testnet";

// sh.exec(`near deploy ${accountID} --wasmFile ${outFile}`);
sh.exec(`near dev-deploy ${outFile}`);
