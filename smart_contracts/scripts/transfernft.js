const { ethers,deployments,getNamedAccounts } = require("hardhat")

async function transfernft() {
    const {deployer,user1}=await getNamedAccounts();
    const BasicNft = await ethers.getContractAt("BasicNft","0x296BeD6F04cDB245B0905910CF4598a471952B22")

   let a= await BasicNft.safeTransferFrom("0x26A2EAC33dB1E0f4F5CA8Ac80a338eF50e9C989f","0x083CdDe8Bb5CB09Da1E67A1686f54d1433b627eD","1");
   
    console.log("Entered!",a)
}

transfernft()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })