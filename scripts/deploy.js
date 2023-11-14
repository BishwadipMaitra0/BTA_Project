const hre = require("hardhat");

async function main() {
  const ChatApp = await hre.ethers.getContractFactory("ChatApp"); //fetching bytecode and ABI
  const chatapp = await ChatApp.deploy(); //creating an instance of our smart contract

  await chatapp.deployed();//deploying your smart contract

  console.log("Deployed contract address:",`${chatapp.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
// Deployed contract address: 0x6fb89b812c757b87e4dcc638d284e8735c9229bd
