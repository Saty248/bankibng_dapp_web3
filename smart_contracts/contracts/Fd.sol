// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;
error invalidId(uint _txId);
error not_matured();
error no_account();
error Invalid_amount();
contract Fd {
    uint txId = 0;
    struct ValuePeriod {
        uint value;
        uint timePeriod;
    }

    mapping(address => mapping(uint => uint)) FdTime;
    mapping(address => uint[]) clientTxIds;
    mapping(uint => ValuePeriod) txId_FdValueWithTime;

    constructor() {}

    function depositFund(uint time) external payable {
        if(msg.value<=0) revert Invalid_amount();
        txId++;
        //time period to mature is set
        FdTime[msg.sender][txId] = block.timestamp + time;
        //txId added to client address
        clientTxIds[msg.sender].push(txId);

        ValuePeriod memory v1 = ValuePeriod(msg.value, time);
        //txId mapped to value with time
        txId_FdValueWithTime[txId] = v1;
    }

    function withDrawFund(uint _txId) external payable {
        //check for valid txId;
        bool f = validTxid(_txId);
        if (f == false) {
            revert invalidId(_txId);
        }
        uint matureTime = FdTime[msg.sender][_txId];
        if (block.timestamp > matureTime) {
            ValuePeriod memory v1 = txId_FdValueWithTime[_txId];
            uint interest = 0;
            if (v1.timePeriod >= 15 && v1.timePeriod < 30) {
                interest = (4 * v1.value) / 100;
            } else if (v1.timePeriod >= 30) {
                interest = (7 * v1.value) / 100;
            }
            uint matureAmt = v1.value + interest;
            bool isDelete = deleleTxId(_txId);
            if (isDelete) {
                (bool sent /* bytes memory data */, ) = msg.sender.call{
                    value: matureAmt
                }("");
                require(sent, "Failed to send Ether");
            }
        } else {
            revert not_matured();
        }
    }

    function deleleTxId(uint _txId) internal returns (bool) {
        uint[] storage client_txIds = clientTxIds[msg.sender];

        uint f = client_txIds.length;

        for (uint i = 0; i < client_txIds.length; i++) {
            if (_txId == client_txIds[i]) {
                f = i;
                break;
            }
        }
        if (f != client_txIds.length) {
            delete client_txIds[f];
            return true;
        } else {
            return false;
        }
    }

    function validTxid(uint _txId) public view returns (bool) {
        uint[] memory client_txIds = clientTxIds[msg.sender];
        if(client_txIds.length==0){
            revert no_account();
        }

        bool f = true;

        for (uint i = 0; i < client_txIds.length; i++) {
            if (_txId == client_txIds[i]) {
                f = true;
                break;
            }
        }
        return f;
    }

    function timeToMature(uint _txId) external view returns (int) {
        require(validTxid(_txId), "invalid id");
        if((FdTime[msg.sender][_txId] <block.timestamp)){
            return -1;
        }else{
            return int(FdTime[msg.sender][_txId] - block.timestamp);
        }
    }

    function client_txs() external view returns (uint[] memory) {
        return clientTxIds[msg.sender];
    }

    function value_matureTime(
        uint _txId
    ) public view returns (ValuePeriod memory) {
        require(validTxid(_txId), "invalid Id");
        return txId_FdValueWithTime[_txId];
    }

    fallback() external payable {
        
    }

    receive() external payable {
       
    }
}
