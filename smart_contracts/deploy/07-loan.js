const {ethers,network,upgrades}=require('hardhat')
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
const { parseEther } = require('ethers')

module.exports = async ({ getNamedAccounts, deployments }) => {
    let oneEth=parseEther("1")
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("----------------------------------------------------")
    const arguments = []
    const loan = await deploy("loan", {
        from: deployer,
        args: arguments,
        value:oneEth,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    console.log("loan address",loan.address)

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(loan.address, arguments)
    }
}

module.exports.tags = ["all", "loan", "main"]