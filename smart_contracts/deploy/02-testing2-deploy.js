const {ethers,network, getUnnamedAccounts,upgrades}=require('hardhat')
const {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config")
const {verify}=require('../utils/verify');
const { Network } = require('ethers');

//const eth_amount=ethers.utils.parseEther("1")

module.exports=async({getNamedAccounts,deployments})=>{
    const {deploy,log}=deployments;
    const {deployer}=await getNamedAccounts();
    const chainId=network.config.chainId;

    if(chainId==31337){
        //console.log("local host=",network.config);   

    }else{
        //console.log("remote host=",network.config);   
    }
    
    const testing2=await deploy("testing2",{
        from:deployer,
        args:["0x7911B0b7427e1155B6C279C5407b894815878AE0"],
        log:true,
        
        waitConfirmation:1
    })
    log("contract_address=",testing2.address);
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(testing2.address, arguments)
    }
    
}
module.exports.tags = ["all", "testing"]