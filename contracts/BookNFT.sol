// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract BookNFT is ERC721Enumerable, Ownable {
    using Strings for uint256;

    struct Book {
        string title;
        string author;
        uint256 pages;
        string coverUrl;
        address reader;
        uint256 timestamp;
    }

    mapping(uint256 => Book) private _books;

    uint256 private _nextTokenId = 1;

    constructor() ERC721("BookNFT", "BOOK") Ownable(msg.sender) {}

    function mintBook(
        string memory title,
        string memory author,
        uint256 pages,
        string memory coverUrl
    ) external returns (uint256 tokenId) {
        require(bytes(title).length > 0, "Title required");
        require(bytes(author).length > 0, "Author required");
        require(pages > 0, "Pages must be > 0");

        tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);

        _books[tokenId] = Book({
            title: title,
            author: author,
            pages: pages,
            coverUrl: coverUrl,
            reader: msg.sender,
            timestamp: block.timestamp
        });
    }

    function getBook(uint256 tokenId) external view returns (Book memory) {
        require(_ownerOf(tokenId) != address(0), "Nonexistent token");
        return _books[tokenId];
    }

    function tokensOfOwner(address owner) external view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner);
        uint256[] memory tokenIds = new uint256[](balance);
        for (uint256 i = 0; i < balance; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(owner, i);
        }
        return tokenIds;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Nonexistent token");
        Book memory book = _books[tokenId];

        bytes memory json = abi.encodePacked(
            '{',
                '"name":"', _escape(string(abi.encodePacked("Book #", tokenId.toString()))), '",',
                '"description":"', _escape(string(abi.encodePacked("Book collected by ", _toHexString(book.reader)))), '",',
                '"image":"', _escape(book.coverUrl), '",',
                '"attributes":[',
                    '{"trait_type":"Title","value":"', _escape(book.title), '"},',
                    '{"trait_type":"Author","value":"', _escape(book.author), '"},',
                    '{"trait_type":"Pages","value":"', book.pages.toString(), '"},',
                    '{"trait_type":"Reader","value":"', _toHexString(book.reader), '"},',
                    '{"display_type":"date","trait_type":"Minted","value":', Strings.toString(book.timestamp), '}',
                ']',
            '}'
        );

        string memory encoded = Base64.encode(json);
        return string(abi.encodePacked("data:application/json;base64,", encoded));
    }

    function _toHexString(address account) internal pure returns (string memory) {
        return Strings.toHexString(uint256(uint160(account)), 20);
    }

    function _escape(string memory value) internal pure returns (string memory) {
        bytes memory strBytes = bytes(value);
        bytes memory result = new bytes(strBytes.length * 2);
        uint256 j = 0;
        for (uint256 i = 0; i < strBytes.length; i++) {
            bytes1 char = strBytes[i];
            if (char == '"' || char == '\\') {
                result[j++] = '\\';
                result[j++] = char;
            } else {
                result[j++] = char;
            }
        }
        bytes memory trimmed = new bytes(j);
        for (uint256 k = 0; k < j; k++) {
            trimmed[k] = result[k];
        }
        return string(trimmed);
    }
}


