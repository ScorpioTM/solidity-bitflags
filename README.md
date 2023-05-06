# Solidity Bitflags

A gas-efficient Solidity library for managing bitflags.

## Overview

### Installation

To install the library, go to your project folder and run the following command:

```
npm install solidity-bitflags
```

### Usage

After installation, you can use the library in your contract by importing them:

```solidity
pragma solidity ^0.8.0;

import { Bitflags } from "solidity-bitflags/contracts/Bitflags.sol";

contract Example {
    using Bitflags for bytes32;

    bytes32 public flags;

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
```

## Functions

The following functions are used to manipulate bitflags stored in a single `bytes32` variable.

### Function `getFlag`

```solidity
function getFlag(bytes32 self, uint8 index) internal pure returns (bool result)
```

#### Description:

This function is used to get the status of a bitflag.

#### Parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| `self` | `bytes32` | The bytes32 variable that holds the status of the bitflags. |
| `index` | `uint8` | The position of the bitflag within the `self` variable. |

#### Returns:

| Name | Type | Description |
| ---- | ---- | ----------- |
| `result` | `bool` | A boolean value representing the status of the bitflag. |

### Function `enableFlag`

```solidity
function enableFlag(bytes32 self, uint8 index) internal pure returns (bytes32 result)
```

#### Description:

This function is used to enable a bitflag.

#### Parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| `self` | `bytes32` | The bytes32 variable that holds the status of the bitflags. |
| `index` | `uint8` | The position of the bitflag within the `self` variable. |

#### Returns:

| Name | Type | Description |
| ---- | ---- | ----------- |
| `result` | `bytes32` | The updated value of `self` after enabling the bitflag. |

### Function `disableFlag`

```solidity
function disableFlag(bytes32 self, uint8 index) internal pure returns (bytes32 result)
```

#### Description:

This function is used to disable a bitflag.

#### Parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| `self` | `bytes32` | The bytes32 variable that holds the status of the bitflags. |
| `index` | `uint8` | The position of the bitflag within the `self` variable. |

#### Returns:

| Name | Type | Description |
| ---- | ---- | ----------- |
| `result` | `bytes32` | The updated value of `self` after disabling the bitflag. |

### Function `listEnabledFlags`

```solidity
function listEnabledFlags(bytes32 self, uint256 limit) internal pure returns (bytes memory result)
```

#### Description:

This function is used to list all enabled bitflags.

#### Parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| `self` | `bytes32` | The bytes32 variable that holds the status of the bitflags. |
| `limit` | `uint256` | The maximum number of bitflags to list. |

#### Returns:

| Name | Type | Description |
| ---- | ---- | ----------- |
| `result` | `bytes` | An array of bytes representing the indexes of all enabled bitflags within the `self` variable. |

### Function `listDisabledFlags`

```solidity
function listDisabledFlags(bytes32 self, uint256 limit) internal pure returns (bytes memory result)
```

#### Description:

This function is used to list all disabled bitflags.

#### Parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| `self` | `bytes32` | The bytes32 variable that holds the status of the bitflags. |
| `limit` | `uint256` | The maximum number of bitflags to list. |

#### Returns:

| Name | Type | Description |
| ---- | ---- | ----------- |
| `result` | `bytes` | An array of bytes representing the indexes of all disabled bitflags within the self variable. |

## License

Released under the [MIT License](LICENSE).