require('@nomicfoundation/hardhat-toolbox');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.0',
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
    showMethodSig: true,
    currency: 'USD'
  }
};
