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
    
    const vault_monitor=await deploy("vault_monitor",{
        from:deployer,
        args:[],
        log:true,
        
        waitConfirmation:1
    })
    log("contract_address=",vault_monitor.address);
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(vault_monitor.address,[])
    }
    
}
module.exports.tags = ["all", "vault_monitor"]