const { parseEther } = require('ethers')
const {ethers, getNamedAccounts} =require('hardhat')

const addMoney=async()=>{

    //const MultiSigWallet=await ethers.ContractFactory("MultiSigWallet","0xb6F63e787d617b3a022366Ea449C179FC8956A01")
    //const {deployer}=await getNamedAccounts()
    let accounts=await ethers.getSigners();
    deployer=accounts[0];
    const tx={
        to:"0xb6F63e787d617b3a022366Ea449C179FC8956A01",
        value:parseEther("0.1")

    }
    const t1=await deployer.sendTransaction(tx);
    console.log(t1)

}
addMoney()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })