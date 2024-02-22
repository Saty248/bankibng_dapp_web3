const { ethers,deployments,getNamedAccounts } = require("hardhat")

async function onwnerOf() {
    const {deployer,user1}=await getNamedAccounts();
    const BasicNft = await ethers.getContractAt("BasicNft","0x296BeD6F04cDB245B0905910CF4598a471952B22")

   let a= await BasicNft.ownerOf(1);
   
    console.log("Entered!",a)
}

onwnerOf()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })