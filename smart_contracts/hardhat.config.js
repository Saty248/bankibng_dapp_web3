/** @type import('hardhat/config').HardhatUserConfig */
//require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()
require("@nomicfoundation/hardhat-ethers");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
require("@openzeppelin/hardhat-upgrades")
require("@nomicfoundation/hardhat-chai-matchers")

const SEPOLIA_RPC_URL =
    process.env.SEPOLIA_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/w-g647ULOhXdaiUN-rV1xlftIL9uqnAW"
    const PRIVATE_KEY = process.env.PRIVATE_KEY 
    const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY 
module.exports = {
  defaultNetwork:"hardhat",
  networks:{
    hardhat:{
      chainId:31337
    },
    localhost:{
      chainId:31337,
    },
    sepolia:{
      url:SEPOLIA_RPC_URL,
      accounts:[PRIVATE_KEY,"1b7125eb59b98cb46e8c536b428de2546d4c05537205f816a209a24eed7129c5"],
      gasPrice: 35000000000,
      saveDeployments:true,
      chainId:11155111
    }
  },
  etherscan:{
    apiKey:{
    sepolia:ETHERSCAN_API_KEY
  }
},
namedAccounts: {
  deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
  },
  user1: {
      default: 1,
  },user2:{
    default:2,
  }
},
  solidity: "0.8.19",
  mocha: {
    timeout: 500000, // 500 seconds max for running tests
},
};
