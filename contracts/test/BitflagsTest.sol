// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Bitflags} from "../Bitflags.sol";

contract BitflagsTest {
    using Bitflags for bytes32;

    bytes32 public flags = 0x8000000000000000000000000000000000000000000000000000000000000000;

    function getFlag(uint8 index) external view returns (bool) {
        return flags.getFlag(index);
    }

    function enableFlag(uint8 index) external {
        flags = flags.enableFlag(index);
    }

    function disableFlag(uint8 index) external {
        flags = flags.disableFlag(index);
    }

    function listEnabledFlags(uint256 limit) external view returns (bytes memory) {
        return flags.listEnabledFlags(limit);
    }

    function listDisabledFlags(uint256 limit) external view returns (bytes memory) {
        return flags.listDisabledFlags(limit);
    }
}
