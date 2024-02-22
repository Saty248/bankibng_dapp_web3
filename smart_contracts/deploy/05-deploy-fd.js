const {ethers,network,upgrades}=require('hardhat')
const {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config")
const {verify}=require('../utils/verify');


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
    const Fd=await deploy("Fd",{
        from:deployer,
        args:[],
        log:true,
        
        waitConfirmation:2
    })
    
    log("contract_address=",Fd.address);
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(Fd.address,[])
    }
    
}
module.exports.tags = ["all", "Fd"]