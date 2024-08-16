// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract TokenContract {
    string public name = "RATEIFY";
    string public symbol = "RTFY";

    mapping(string => ProductFeedback) public feedbacks;

    struct Feedback {
        string feedbackText;
        uint rating;
        uint upvotes;
        uint downvotes;
        address user;
    }

    struct ProductFeedback {
        Feedback[] feedbacks;
        uint totalRating;
        uint ratingCount;
    }

    string[] productsList;

    mapping(address => string[]) private upvotes;
    mapping(address => string[]) private downvotes;

    function myAddress() public view returns (address) {
        return msg.sender;
    }

    function addProductFeedback(string memory productId, string memory feedback, string memory rating) public returns (bool) {
        feedbacks[productId].totalRating += st2num(rating);
        feedbacks[productId].ratingCount += 1;

        Feedback memory newFeedback = Feedback({
            feedbackText: feedback,
            upvotes: 0,
            downvotes: 0,
            rating: st2num(rating),
            user: msg.sender
        });

        feedbacks[productId].feedbacks.push(newFeedback);

        return true;
    }

    function getProductFeedbacks(string memory productId) public view returns (ProductFeedback memory productFeedback) {
        return feedbacks[productId];
    }

  
    function upvoteProductFeedback(string memory productId, string memory originalPoster) public returns (bool) {
        for (uint i = 0; i < feedbacks[productId].feedbacks.length; i++) {
            if (compareStrings(addressToString(feedbacks[productId].feedbacks[i].user), originalPoster)) {
                feedbacks[productId].feedbacks[i].upvotes += 1;
                upvotes[msg.sender].push(productId);
                return true;
            }
        }

        return false;
    }

    function downvoteProductFeedback(string memory productId, string memory originalPoster) public returns (bool) {
        for (uint i = 0; i < feedbacks[productId].feedbacks.length; i++) {
            if (compareStrings(addressToString(feedbacks[productId].feedbacks[i].user), originalPoster)) {
                feedbacks[productId].feedbacks[i].downvotes += 1;
                downvotes[msg.sender].push(productId);
                return true;
            }
        }

        return false;
    }

    function getUserUpvotes() public view returns (string[] memory) {
        return upvotes[msg.sender];
    }

    function getUserDownvotes() public view returns (string[] memory) {
        return downvotes[msg.sender];
    }

    

    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b)));
    }

    function addressToString(address _addr) internal pure returns (string memory) {
        bytes32 value = bytes32(uint256(uint160(_addr)));
        bytes memory alphabet = "0123456789abcdef";

        bytes memory str = new bytes(42);
        str[0] = '0';
        str[1] = 'x';
        for (uint256 i = 0; i < 20; i++) {
            str[2 + i * 2] = alphabet[uint8(value[i + 12] >> 4)];
            str[3 + i * 2] = alphabet[uint8(value[i + 12] & 0x0f)];
        }
        return string(str);
    }

    function st2num(string memory numString) internal pure returns(uint) {
        uint  val=0;
        bytes   memory stringBytes = bytes(numString);
        for (uint  i =  0; i<stringBytes.length; i++) {
            uint exp = stringBytes.length - i;
            bytes1 ival = stringBytes[i];
            uint8 uval = uint8(ival);
           uint jval = uval - uint(0x30);
   
           val +=  (uint(jval) * (10**(exp-1))); 
        }
      return val;
    }

    function num2st(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

 }