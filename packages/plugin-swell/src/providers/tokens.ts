import { SupportedTokens } from "../types";

// Testnet  tokens -bridge
export const supportedTokens: SupportedTokens = {
    'ETH': { 
      address: 'native', 
      decimals: 18 
    },
    'WETH': { 
      address: 'native', 
      decimals: 18,
      l1Address: '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9', // WETH on Sepolia
      l2Address: '0x4200000000000000000000000000000000000006'  // L2 WETH on Swellchain Testnet
    },
    'USDT': { 
      address: 'native', 
      decimals: 6,
      l1Address: '0xfd665f836095Ed02fDBF3C4F24174D70DFD6b69c', // USDT on Sepolia from docs
      l2Address: '0x41a0bD84E65e75Bc30AFBbe6ea142eBBcc347542'  // USDT on Swellchain Testnet from docs
    }
  };

  export const neptune = {
    tokens: {
      earnETH: "0x9Ed15383940CC380fAEF0a75edacE507cC775f22",
      ENA: "0x58538e6A46E07434d7E7375Bc268D3cb839C0133",
      pzETH: "0x9cb41CD74D01ae4b4f640EC40f7A60cA1bCF83E7",
      rsETH: "0xc3eACf0612346366Db554C991D7858716db09f58",
      rSWELL: "0x939f1cC163fDc38a77571019eb4Ad1794873bf8c",
      ezETH: "0x2416092f143378750bb29b79eD961ab195CcEea5",
      USDe: "0x5d3a1Ff2b6BAb83b63cd9AD0787074081a52ef34",
      msETH: "0x4661407fC224E5432D7f528a20EF8906E453A8f3",
      NEP: "0xEa34479f7d95341E5fd49b89936366D6da710824",
      rswETH: "0x18d33689AE5d02649a859A1CF16c9f0563975258",
      stBTC: "0xf6718b2701D4a6498eF77D7c152b2137Ab28b8A3",
      SURF: "0x8169c783b5e930f189b06a97f85A1524A9822B2C",
      sUSDe: "0x211Cc4DD073734dA055fbF44a2b4667d5E5fE5d2",
      swBTC: "0x1cf7b5f266A0F39d6f9408B90340E3E71dF8BF7B",
      SWELL: "0x2826D136F5630adA89C1678b64A61620Aab77Aea",
      swETH: "0x09341022ea237a4DB1644DE7CCf8FA0e489D85B7",
      uBTC: "0xb5668713E9BA8bC96f97D691663E70b54CE90b0A",
      weETH: "0xA6cB988942610f6731e664379D15fFcfBf282b44",
      WETH: "0x4200000000000000000000000000000000000006",
      ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      wstETH: "0x7c98E0779EB5924b3ba8cE3B17648539ed5b0Ecc"
    },}


    export const NEPTUNE_TOKEN_DECIMALS = {
      swBTC: 8,
      default: 18
  };


  // earnETH tokens information
export const earnETHTokens = {
  // Contract addresses
  addresses: {
    TELLER: "0x6D207874DDc8B1C3954a0BB2b21c6Fce2Aa18Dba",
    VAULT: "0x9Ed15383940CC380fAEF0a75edacE507cC775f22"
  },
  // Supported deposit tokens
  supportedTokens: {
    ezETH: {
      name: "Renzo Restaked ETH",
      symbol: "ezETH",
      address: "0x2416092f143378750bb29b79eD961ab195CcEea5",
      decimals: 18
    },
    rswETH: {
      name: "Restaked Swell ETH",
      symbol: "rswETH",
      address: "0x18d33689AE5d02649a859A1CF16c9f0563975258",
      decimals: 18
    },
    swETH: {
      name: "Swell ETH",
      symbol: "swETH",
      address: "0x09341022ea237a4DB1644DE7CCf8FA0e489D85B7",
      decimals: 18
    },
    weETH: {
      name: "Wrapped eETH",
      symbol: "weETH",
      address: "0xA6cB988942610f6731e664379D15fFcfBf282b44",
      decimals: 18
    },
    wstETH: {
      name: "Wrapped liquid staked Ether 2.0",
      symbol: "wstETH",
      address: "0x7c98E0779EB5924b3ba8cE3B17648539ed5b0Ecc",
      decimals: 18
    }
  }
};

// Convert the supportedTokens object to an array for the UI
export const ASSETS = Object.values(earnETHTokens.supportedTokens);