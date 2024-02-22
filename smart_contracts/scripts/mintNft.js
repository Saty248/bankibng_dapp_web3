const { ethers,deployments,getNamedAccounts } = require("hardhat")

async function mintNft() {
    const {deployer,user1}=await getNamedAccounts();
    const BasicNft = await ethers.getContractAt("BasicNft","0x296BeD6F04cDB245B0905910CF4598a471952B22",deployer)

   let a= await BasicNft.mintNft();
   
    console.log("Entered!",a)
}

mintNft()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })