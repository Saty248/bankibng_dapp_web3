const {ethers,network,upgrades}=require('hardhat')
const {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config")
const {verify}=require('../utils/verify');
const { Network } = require('ethers');

module.exports=async({getNamedAccounts,deployments})=>{
    const {deploy,log}=deployments;
    const {deployer}=await getNamedAccounts();
    const chainId=network.config.chainId;

    if(chainId==31337){
        //console.log("local host=",network.config);   

    }else{
        //console.log("remote host=",network.config);   
    }
    log("deploying...")
    const MultiSigWallet=await deploy("MultiSigWallet",{
        from:deployer,
        args:[["0x26A2EAC33dB1E0f4F5CA8Ac80a338eF50e9C989f","0x7911B0b7427e1155B6C279C5407b894815878AE0"],2],
        log:true,
        
        waitConfirmation:1
    })
    log("contract_address=",MultiSigWallet.address);
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(MultiSigWallet.address,[["0x26A2EAC33dB1E0f4F5CA8Ac80a338eF50e9C989f","0x7911B0b7427e1155B6C279C5407b894815878AE0"],2])
    }
    
}
module.exports.tags = ["all", "MultiSigWallet"]