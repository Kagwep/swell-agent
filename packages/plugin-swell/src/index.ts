import type { Plugin } from "@elizaos/core";
import { transferAction } from "./actions/transfer";
import { swellWalletProvider } from "./providers/wallet";
import { bridgeAction } from "./actions/bridge";
import { multiNetworkWalletProvider } from "./providers/multiwallet";
import { priceAction } from "./actions/price";
import { listEarningOpportunitiesAction } from "./actions/opportunities";
import { nucleusEarnAction } from "./actions/earn";

export const swellPlugin: Plugin = {
    name: "swell",
    description: "swellchain integration plugin",
    providers: [multiNetworkWalletProvider],
    evaluators: [],
    services: [],
    actions: [transferAction,bridgeAction, priceAction,listEarningOpportunitiesAction,nucleusEarnAction],
};

export default swellPlugin;
 