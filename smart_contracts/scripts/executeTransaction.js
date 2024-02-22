
const { network, deployments, ethers } = require("hardhat")
async function executeTransaction() {
    const chainId=network.config.chainId;
    console.log("chainId=",chainId)
    if(chainId==31337){
     
        //console.log("local host=",network.config);   

    }else{
        //console.log("remote host=",network.config);   
    }
    const MultiSigWallet=await ethers.getContract("MultiSigWallet");

    let execute=await MultiSigWallet.executeTransaction("0");
     
    console.log("execute=",execute)   

  /*   const vault1=await ethers.getContractAt("MultiSigWallet","0x856e4424f806D16E8CBC702B3c0F2ede5468eae5");
    console.log(vault1); */

    
   
}
executeTransaction()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })