const { parseEther } = require("ethers");
const { ethers,deployments,getNamedAccounts } = require("hardhat")

async function collectLoan() {
    const {deployer,user1}=await getNamedAccounts();
    const loan = await ethers.getContract("loan",user1)

    let oneEth=parseEther("6");
    
    let a= await loan.collectLoan({value:oneEth});
   
    console.log("Entered!",a)
}

collectLoan()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })