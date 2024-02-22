

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;
error not_Owner();
error not_valid_address();
contract testing {
    event Log(string func, uint gas);

    address payable owner;
    uint c=0;
    constructor(address payable _owner) {
        owner=_owner;
        }
        modifier onlyOwner(){
            if(msg.sender!=owner){
                    revert not_Owner();
                }
            _;
        }
        modifier validAddress(address _ad1) {
            if(_ad1==address(0)){
                revert not_valid_address();
            }
            _;
            
        }

        function increment() public  {
            c++;
        }
        function decrement() public {
            c--;
        }
        function getter() public  virtual returns(uint){
            return c;
        }
        function withdraw() onlyOwner  external{
            (bool sent,)=owner.call{value:address(this).balance}("");
             require(sent, "Failed to send Ether");
        }
        fallback() external {
             emit Log("fallback", gasleft());
        }
        receive() external payable {
        emit Log("receive", gasleft());
    }


}