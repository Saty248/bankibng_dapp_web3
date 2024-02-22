
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;
import "./MultiSigWallet.sol";
contract vault_monitor {
    constructor() {
        
    }

    mapping(address=>address[]) userToVault;

    function vaults(address addr1) external view returns(address[] memory){
        if((userToVault[addr1]).length>0){
            return userToVault[addr1];
        }
       return userToVault[addr1];
    }

    function addVault(address[] memory users)external returns(address){
        uint noOfUsers=users.length;
        MultiSigWallet multisigwallet=new MultiSigWallet(users,noOfUsers);
         for(uint i=0;i<users.length;i++){
            userToVault[users[i]].push(address(multisigwallet));  
        } 
    

    }
}