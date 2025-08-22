require('dotenv').config();
require('@nomicfoundation/hardhat-toolbox');

const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
const BNB_TESTNET_RPC = process.env.BNB_TESTNET_RPC || 'https://data-seed-prebsc-1-s1.binance.org:8545';

// Only include the account if the private key seems valid (0x + 64 hex chars)
const isValidPk = /^0x[0-9a-fA-F]{64}$/.test(PRIVATE_KEY);
const accounts = isValidPk ? [PRIVATE_KEY] : [];

module.exports = {
  solidity: {
    version: '0.8.20',
    settings: {
      optimizer: { enabled: true, runs: 200 },
      viaIR: true,
    },
  },
  networks: {
    bnbTestnet: {
      url: BNB_TESTNET_RPC,
      chainId: 97,
      accounts,
    },
  },
  etherscan: {
    apiKey: process.env.BSCSCAN_API_KEY || '',
  },
};


