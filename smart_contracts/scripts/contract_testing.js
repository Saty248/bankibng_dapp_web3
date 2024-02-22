
const { network, deployments, ethers } = require("hardhat")
async function contract_testing() {
    const chainId=network.config.chainId;
    console.log("chainId=",chainId)
    if(chainId==31337){
        //await deployments.fixture(["testing", "all"])
        //console.log("local host=",network.config);   

    }else{
        //console.log("remote host=",network.config);   
    }
    //await deployments.fixture(["testing", "all"])
    const test1=await ethers.getContract("testing")
    const test2=await ethers.getContract("testing2")
    const testingProxyAdmin=await ethers.getContract("testingProxyAdmin")
    const testing_Proxy=await ethers.getContract("testing_Proxy")
    console.log("test2address",testing_Proxy.target);
    const proxytest1=await ethers.getContractAt("testing",testing_Proxy.target);
    let c_setter=await proxytest1.increment();
    let c_getter=await proxytest1.getter();
    console.log("c_getter",c_getter); 
    const upgradeTx=await testingProxyAdmin.upgrade(testing_Proxy.target,test2.target);
    await upgradeTx.wait(1)
    const  proxytest=await ethers.getContractAt("testing2",testing_Proxy.target);
     accounts = await ethers.getSigners()
   
    //testing=testingContract.connect(accounts[1])
  
     c_setter=await proxytest.increment();
     c_getter=await proxytest.getter();
    console.log("c_getter",c_getter); 
     
   
}
contract_testing()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })