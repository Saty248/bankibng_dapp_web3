
const { network, deployments, ethers } = require("hardhat")
async function addVault() {
    const chainId=network.config.chainId;
    console.log("chainId=",chainId)
    if(chainId==31337){
     
        //console.log("local host=",network.config);   

    }else{
        //console.log("remote host=",network.config);   
    }
    const vault_monitor=await ethers.getContract("vault_monitor");

      let vaults=await vault_monitor.vaults("0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
    console.log("vaults=",vaults) 
     const addVault=await vault_monitor.addVault(["0x70997970C51812dc3A010C7d01b50e0d17dc79C8","0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC","0x90F79bf6EB2c4f870365E785982E1f101E93b906"])
      vaults=await vault_monitor.vaults("0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
    console.log("vaults=",vaults)   

  /*   const vault1=await ethers.getContractAt("MultiSigWallet","0x856e4424f806D16E8CBC702B3c0F2ede5468eae5");
    console.log(vault1); */

    
   
}
addVault()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })