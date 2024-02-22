//SPDX-License-Identifier:MIT
pragma solidity ^0.8.19;
error invalid_amt();

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface ERC721TokenReceiver
{

  /**
   * @notice The contract address is always the message sender. A wallet/broker/auction application
   * MUST implement the wallet interface if it will accept safe transfers.
   * @dev Handle the receipt of a NFT. The ERC721 smart contract calls this function on the
   * recipient after a `transfer`. This function MAY throw to revert and reject the transfer. Return
   * of other than the magic value MUST result in the transaction being reverted.
   * Returns `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))` unless throwing.
   * @param _operator The address which called `safeTransferFrom` function.
   * @param _from The address which previously owned the token.
   * @param _tokenId The NFT identifier which is being transferred.
   * @param _data Additional data with no specified format.
   * @return Returns `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
   */
  function onERC721Received(
    address _operator,
    address _from,
    uint256 _tokenId,
    bytes calldata _data
  )
    external
    returns(bytes4);

}
contract loan is
  ERC721TokenReceiver {
    IERC721 public nft;
      event Received();
    event Loaners(address indexed nft, uint indexed tokenId, uint indexed amt);
    event Payers(address indexed nft, uint indexed tokenId, uint indexed amt);
    struct loaner {
        address nft;
        uint tokenId;
        uint amt;
    }

    mapping(address => loaner) loanernft;

    constructor()payable{}

    function giveLoan(address nftAddress, uint tokenId, uint amt) public {
        require(checkNftOwner(nftAddress, tokenId), "transfer owner");
        loaner memory user1 = loaner(nftAddress, tokenId, amt);
        loanernft[msg.sender] = user1;
        (bool sent /* bytes memory data*/, ) = msg.sender.call{value: amt}("");
        emit Loaners(nftAddress, tokenId, amt);
        require(sent, "Failed to send Ether");
    }

    function collectLoan() public payable {
        loaner memory user1 = loanernft[msg.sender];
        if (user1.amt > msg.value) {
            revert invalid_amt();
        }

        IERC721 nft1 = IERC721(user1.nft);
        nft1.safeTransferFrom(address(this), msg.sender, user1.tokenId);

        delete loanernft[msg.sender];
        emit Payers(user1.nft, user1.tokenId, user1.amt);
    }

    function fund() public payable returns (uint) {
        return msg.value;
    }

    function checkNftOwner(
        address nftAdddress,
        uint tokenId
    ) public returns (bool) {
        nft = IERC721(nftAdddress);
        if (nft.ownerOf(tokenId) == address(this)) {
            return true;
        } else {
            return false;
        }
    }

    function ownerNft(uint tokenId) public view returns (address) {
        return nft.ownerOf(tokenId);
    }
    function onERC721Received(
    address _operator,
    address _from,
    uint256 _tokenId,
    bytes calldata _data
  )
    external
    override
    returns(bytes4)
  {
    _operator;
    _from;
    _tokenId;
    _data;
    emit Received();
    return 0x150b7a02;
  }
}