import { NetworkInfo } from "../types";

  // Network configurations for testnet
  export const networks: Record<string, NetworkInfo> = {
    ethereum: {
      name: 'Ethereum Sepolia',
      chainId: 11155111, // Sepolia testnet
      bridgeAddress: '0xebb79a1d00b2d489f53adee985a2ded2a3553f22', // L1StandardBridge on Sepolia
      rpcUrl: 'https://eth-sepolia.public.blastapi.io',
      blockExplorer: 'https://sepolia.etherscan.io'
    },
    swellchain: {
      name: 'Swellchain Testnet',
      chainId: 1924, // Swellchain testnet
      bridgeAddress: '0x4200000000000000000000000000000000000010', // L2StandardBridge r
      rpcUrl: 'https://swell-testnet.alt.technology',
      blockExplorer: 'https://swell-testnet-explorer.alt.technology'
    }
  };