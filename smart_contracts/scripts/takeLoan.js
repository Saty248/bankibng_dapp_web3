const { ethers,deployments,getNamedAccounts } = require("hardhat")

async function giveLoan() {
    const {deployer,user1}=await getNamedAccounts();
    const loan = await ethers.getContract("loan",user1)

    let a= await loan.giveLoan("0xa513E6E4b8f2a923D98304ec87F64353C4D5C853","1","5");
   
    console.log("Entered!",a)
}

giveLoan()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })