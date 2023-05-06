// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library Bitflags {
    /**
     * @notice This function is used to get the status of a bitflag.
     * @param self The bytes32 variable that holds the status of the bitflags.
     * @param index The position of the bitflag within the `self` variable.
     * @return result A boolean value representing the status of the bitflag.
     */
    function getFlag(bytes32 self, uint8 index) internal pure returns (bool result) {
        // solhint-disable-next-line no-inline-assembly
        assembly {
            result := gt(and(self, shl(and(index, 0xFF), 0x01)), 0x00)
        }
    }

    /**
     * @notice This function is used to enable a bitflag.
     * @param self The bytes32 variable that holds the status of the bitflags.
     * @param index The position of the bitflag within the `self` variable.
     * @return result The updated value of `self` after enabling the bitflag.
     */
    function enableFlag(bytes32 self, uint8 index) internal pure returns (bytes32 result) {
        // solhint-disable-next-line no-inline-assembly
        assembly {
            result := or(self, shl(and(index, 0xFF), 0x01))
        }
    }

    /**
     * @notice This function is used to disable a bitflag.
     * @param self The bytes32 variable that holds the status of the bitflags.
     * @param index The position of the bitflag within the `self` variable.
     * @return result The updated value of `self` after disabling the bitflag.
     */
    function disableFlag(bytes32 self, uint8 index) internal pure returns (bytes32 result) {
        // solhint-disable-next-line no-inline-assembly
        assembly {
            result := and(self, not(shl(and(index, 0xFF), 0x01)))
        }
    }

    /**
     * @notice This function is used to list all enabled bitflags.
     * @param self The bytes32 variable that holds the status of the bitflags.
     * @param limit The maximum number of bitflags to list.
     * @return result An array of bytes representing the indexes of all enabled bitflags within the `self` variable.
     */
    function listEnabledFlags(bytes32 self, uint256 limit) internal pure returns (bytes memory result) {
        require(limit > 0 && limit <= 256, "Error: Invalid limit");

        // solhint-disable-next-line no-inline-assembly
        assembly {
            // Get the free memory pointer
            result := mload(0x40)

            // Update the free memory pointer
            mstore(0x40, add(result, 0x120))

            let counter := 0

            // Loop all the flags
            for {
                let i := 0x00
            } lt(i, limit) {
                i := add(i, 0x01)
            } {
                if gt(and(self, shl(and(i, 0xFF), 0x01)), 0x00) {
                    // Add this flag to the bytes array
                    mstore8(add(result, add(0x20, counter)), i)

                    counter := add(counter, 0x01)
                }
            }

            // Update the length of the bytes array
            mstore(result, counter)
        }
    }

    /**
     * @notice This function is used to list all disabled bitflags.
     * @param self The bytes32 variable that holds the status of the bitflags.
     * @param limit The maximum number of bitflags to list.
     * @return result An array of bytes representing the indexes of all disabled bitflags within the self variable.
     */
    function listDisabledFlags(bytes32 self, uint256 limit) internal pure returns (bytes memory result) {
        require(limit > 0 && limit <= 256, "Error: Invalid limit");

        // solhint-disable-next-line no-inline-assembly
        assembly {
            // Get the free memory pointer
            result := mload(0x40)

            // Update the free memory pointer
            mstore(0x40, add(result, 0x120))

            let counter := 0

            // Loop all the flags
            for {
                let i := 0x00
            } lt(i, limit) {
                i := add(i, 0x01)
            } {
                if iszero(and(self, shl(and(i, 0xFF), 0x01))) {
                    // Add this flag to the bytes array
                    mstore8(add(result, add(0x20, counter)), i)

                    counter := add(counter, 0x01)
                }
            }

            // Update the length of the bytes array
            mstore(result, counter)
        }
    }
}
