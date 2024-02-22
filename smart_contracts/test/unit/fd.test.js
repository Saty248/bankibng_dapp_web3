const { assert, expect } = require("chai")
const { network, deployments, ethers, getNamedAccounts } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config");
const { parseEther } = require("ethers");


!developmentChains.includes(network.name)?describe.skip:
        describe("fd unit test", function(){
                let fd,user1,user2,OneEth=parseEther("1");
                beforeEach(async()=>{
                    let accounts=await ethers.getSigners();
                        user1=accounts[1];
                        console.log(user1);
                        await deployments.fixture(["Fd"]);
                    fd=await ethers.getContract("Fd",user1);
                    

                })
                describe("client_txs",function (){
                    it("returns the txIds of the user",async ()=>{
                        let a= await fd.client_txs();
                        console.log("a=",a);
                        expect(a).to.have.lengthOf(0)
                    })
                    it("it should return all the ids",async()=>{
                        await fd.depositFund(3,{value:OneEth});
                        let a= await fd.client_txs();
                        console.log("a=",a);
                        expect(a).to.have.lengthOf(1)
                    })
                    

                })
                describe("value_matureTime",function (){
                    it("revert for invalid id",async ()=>{
                        await expect(fd.value_matureTime(1)).to.be.reverted
                    })
                    it("show mature time",async ()=>{
                        await fd.depositFund(3,{value:OneEth});
                        let a=await fd.value_matureTime(1);
                        console.log(a.timePeriod.toString())
                        expect(a.timePeriod.toString()).to.equal("3")
                    })
                    it("revert",async ()=>{
                        
                        let a=await expect(fd.value_matureTime(1)).to.be.reverted;
                        console.log(a)
                       
                    })
                })

        })