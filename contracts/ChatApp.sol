// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

contract ChatApp{
    //User Struct

    struct user{
        string name;
        friend[] friendList;
    }

    struct friend{
        address pubkey;
        string name;
    }

    struct message{
        address sender;
        uint256 timestamp;
        string msg;
    }

     struct AllUserStruck{
        string name;
        address accountAddress;
     }

    AllUserStruck[] getAllUsers;

    //Mappiong

    mapping(address => user) userList;
    mapping(bytes32 => message[]) allMessages;

    //checking if User Exist
    function checkUserExists(address pubkey) public view returns(bool){
        return bytes(userList[pubkey].name).length > 0;
    }

    //Create Account
//Step 1. 
    function createAccount(string calldata name) external {
        require(checkUserExists(msg.sender) == false, "User Exist");
        require(bytes(name).length>0, "UserName Can not be Empty");

        userList[msg.sender].name = name;

        getAllUsers.push(AllUserStruck(name, msg.sender));
    }

    //get name
//Step 2. 
    function getUsername(address pubkey) external view returns(string memory){
    require(checkUserExists(pubkey),"User is Not Registered");
    return userList[pubkey].name;
    }


    //Add Friend
//Step 3.
    function addfriend(address friend_key, string calldata name) external{

        require(checkUserExists(msg.sender),"create an Account First");
        require(checkUserExists(friend_key),"User is not Registered");
        require(msg.sender != friend_key, "User Can not add them as friend");
        require(checkAlreadyFriends(msg.sender, friend_key)== false, "Users Already Friends");

        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);

    }
//Step 4. 
    function checkAlreadyFriends(address pubkey1, address pubkey2) internal view returns(bool)
    {
        if(userList[pubkey1].friendList.length > userList[pubkey2].friendList.length){

            address tmp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2= tmp;


        }

    for(uint256 i = 0; i < userList[pubkey1].friendList.length; i++)
    {
        if(userList[pubkey1].friendList[i].pubkey == pubkey2) return true;

    }   
         return false;


    }
//Step 5. 
    function _addFriend(address me, address friend_key, string memory name) internal{
        friend memory newFriend = friend(friend_key,name);
        userList[me].friendList.push(newFriend);
    }

    //Get My Friend
//Step 6.
function getMyFriendList() external view returns(friend[] memory){
    return userList[msg.sender].friendList;
}

//Get Chat Code
function _getChatCode(address pubkey1, address pubkey2) internal pure returns(bytes32){


    if(pubkey1 < pubkey2)
    {
        return keccak256(abi.encodePacked(pubkey1,pubkey2));

    }
    else return keccak256(abi.encodePacked(pubkey2, pubkey1));
}
//Send message
//Step 7. 
function sendMessage(address friend_key, string calldata _msg) external  {
    require(checkUserExists(msg.sender),"Create an Account First");
    require(checkUserExists(friend_key),"User Not Registered");
    require(checkAlreadyFriends(msg.sender, friend_key),"You Are Not Friend With This User");
 

    bytes32 chatCode =_getChatCode(msg.sender, friend_key);
    message memory newMsg = message(msg.sender, block.timestamp, _msg);
    allMessages[chatCode].push(newMsg);



     
}

//Read Message 
//Step 8.

function readMessage(address friend_key) external view returns (message[] memory)
{
    bytes32  chatCode = _getChatCode(msg.sender, friend_key);
    return allMessages[chatCode];
}

function getAllAppUsers() public view returns(AllUserStruck[] memory)
{
    return getAllUsers;
}


}