import {
    type Action,
    composeContext,
    generateObjectDeprecated,
    type IAgentRuntime,
    ModelClass,
    type State,
} from "@elizaos/core";
import { initSwellWalletProvider, type WalletProvider } from "../providers/wallet";
import { ethers } from "ethers";
import { bridgeTemplate } from "../templates";
import { networks } from "../providers/network";
import { ERC20ABI, StandardBridgeABI } from "../providers/abis";
import { supportedTokens } from "../providers/tokens";
import { initEthereumWalletProvider, type EthereumWalletProvider } from "../providers/ethWallet";

type BridgeParams = {
    token: string,
    amount: string,
    sourceNetwork: string,
    destinationNetwork: string
};

export class BridgeAction {
    constructor(private walletProvider: WalletProvider | EthereumWalletProvider) {}

    async bridge(params: BridgeParams) {

        const bridgeAddress = networks[params.sourceNetwork].bridgeAddress;
    
        
        try {
            const { token, amount, sourceNetwork,destinationNetwork } = params;

            if (token === 'ETH'){

                const amountInWei = ethers.parseEther(amount);

                const minGasLimit =  200000; // defualt gas limit
                const extraData   = '0x';

                // Create ABI interface to encode the function call
                const bridgeInterface = new ethers.Interface(StandardBridgeABI);
                const data = bridgeInterface.encodeFunctionData("bridgeETH", [minGasLimit, extraData]);
                
                // Create transaction object (similar to your transfer example)
                const tx = {
                    to: bridgeAddress,      // Bridge contract address
                    value: amountInWei,     // Amount of ETH to send
                    data: data              // Encoded function call data
                };
                
                // Send the transaction using your existing wallet provider
                const txResponse = await this.walletProvider.wallet.sendTransaction(tx);
                console.log("Bridge transaction submitted:", txResponse.hash);

                    // Wait for the transaction to be mined
                const receipt = await txResponse.wait();
                
                return receipt;


            }else {

                // Get token information
                const tokenObj = supportedTokens[token];
                const tokenAddress = sourceNetwork === 'ethereum' ? tokenObj.l1Address : tokenObj.l2Address;
                const remoteTokenAddress = sourceNetwork === 'ethereum' ? tokenObj.l2Address : tokenObj.l1Address;
                
                if (!tokenAddress || !remoteTokenAddress) {
                    throw new Error(`Token addresses not found for ${token}`);
                }
                
                // Create token contract instance
                const tokenContract = new ethers.Contract(
                    tokenAddress, 
                    ERC20ABI, 
                    this.walletProvider.wallet
                );
                
                // Get token decimals
                const decimals = await tokenContract.decimals();
                
                // Convert amount to token units with proper decimals
                const amountInTokenUnits = ethers.parseUnits(amount, decimals);
                
                // Approve the bridge to spend tokens
                const approveTx = await tokenContract.approve(bridgeAddress, amountInTokenUnits);

                
                // Wait for approval to be confirmed
                await approveTx.wait();
 
                
                // Bridge the tokens
                
                // Create bridge contract instance
                const bridgeInterface = new ethers.Interface(StandardBridgeABI);
                
                // Parameters for the bridge function
                const minGasLimit = 200000; // Default gas limit
                const extraData = '0x'; // No extra data
                
                // Encode the function call for bridgeERC20
                const data = bridgeInterface.encodeFunctionData("bridgeERC20", [
                    tokenAddress,          // Local token address
                    remoteTokenAddress,    // Remote token address
                    amountInTokenUnits,    // Amount with proper decimals
                    minGasLimit,           // Gas limit
                    extraData              // Extra data
                ]);
                
                // Create transaction object
                const tx = {
                    to: bridgeAddress,    // Bridge contract address
                    value: 0,             // No ETH sent with this transaction
                    data: data            // Encoded function call
                };
                
                // Send the bridge transaction
                const bridgeTx = await this.walletProvider.wallet.sendTransaction(tx);
                console.log("Bridge transaction submitted:", bridgeTx.hash);

                const receipt = await bridgeTx.wait();

                return receipt

            }
            
        } catch (error) {
            throw new Error(`Bridge failed: ${error.message}`);
        }
    }
}

const buildBridgeDetails = async (state: State, runtime: IAgentRuntime) => {
    const context = composeContext({
        state,
        template: bridgeTemplate,
    });
    const bridgeDetails = (await generateObjectDeprecated({
        runtime,
        context,
        modelClass: ModelClass.SMALL,
    })) as BridgeParams;
    return bridgeDetails;
};

export const bridgeAction: Action = {
    name: "bridge",
    description: "Bridge tokens between addresses on Swellchain and Ethereum",
    handler: async (runtime, _message, state, _options, callback) => {

        const params = await buildBridgeDetails(state, runtime);

        const walletProvider = params.sourceNetwork === 'swellchain' ? await initSwellWalletProvider(runtime) : await initEthereumWalletProvider(runtime);
        const action = new BridgeAction(walletProvider);
        const paramOptions = await buildBridgeDetails(state, runtime);

        
        
        try {
            const bridgeResp = await action.bridge(paramOptions);
            if (callback) {
                callback({
                    text: `Successfully bridged ${paramOptions.amount} ${paramOptions.token} from ${paramOptions.sourceNetwork} to ${paramOptions.destinationNetwork}\nTransaction Hash: ${bridgeResp.hash}. The funds will be available on the destination network in approximately 3-5 minutes.`,
                    content: {
                        success: true,
                        hash: bridgeResp.hash,
                        amount: paramOptions.amount,
                        token: paramOptions.token,
                        sourceNetwork: paramOptions.sourceNetwork,
                        destinationNetwork: paramOptions.destinationNetwork,
                        estimatedTimeMinutes: 3
                    },
                });
            }
            return true;
        } catch (error) {
            console.error("Error during token bridge:", error);
            if (callback) {
                callback({
                    text: `Error bridgering tokens: ${error.message}`,
                    content: { error: error.message },
                });
            }
            return false;
        }
    },
    // template: bridgeTemplate,
    validate: async (runtime: IAgentRuntime) => {
        const privateKey = runtime.getSetting("SWELL_PRIVATE_KEY");
        return typeof privateKey === "string" && privateKey.startsWith("0x");
    },
    examples: [
        [
            {
                user: "assistant",
                content: {
                    text: "I'll help you bridge 1 ETH from Ethereum to Swellchain. Initiating bridge transaction now... Transaction hash: 0x123abc. Your funds should arrive on Swellchain in approximately 3-5 minutes.",
                    action: "BRIDGE_TOKENS",
                },
            },
            {
                user: "user",
                content: {
                    text: "Bridge 1 ETH to Swellchain",
                    action: "BRIDGE_TOKENS",
                },
            },
        ],
        [
            {
                user: "assistant",
                content: {
                    text: "I'll bridge 0.5 ETH from Swellchain back to Ethereum for you. Processing the transaction... Transaction hash: 0x456def. Funds will be available on Ethereum in approximately 3-5 minutes.",
                    action: "BRIDGE_TOKENS",
                },
            },
            {
                user: "user",
                content: {
                    text: "Send my ETH back to Ethereum please",
                    action: "BRIDGE_TOKENS",
                },
            },
        ],
        
        [
            {
                user: "assistant",
                content: {
                    text: "I'll bridge 10 USDT from Ethereum to Swellchain for you. First approving the bridge contract to spend your USDT, then initiating the bridge transaction... Transaction hash: 0x789ghi. Your USDT should arrive on Swellchain in approximately 3-5 minutes.",
                    action: "BRIDGE_TOKENS",
                },
            },
            {
                user: "user",
                content: {
                    text: "I want to bridge 10 USDT to Swellchain",
                    action: "BRIDGE_TOKENS",
                },
            },
        ],
        
        [
            {
                user: "assistant",
                content: {
                    text: "I'll bridge your ETH from Swellchain to Ethereum. How much would you like to bridge?",
                    action: "BRIDGE_TOKENS",
                },
            },
            {
                user: "user",
                content: {
                    text: "I want to bridge from Swellchain to Ethereum",
                    action: "BRIDGE_TOKENS",
                },
            },
        ],
        
        [
            {
                user: "assistant",
                content: {
                    text: "I'm unable to bridge 5 ETH from Ethereum to Swellchain because your current balance is only 2.3 ETH. Would you like to bridge a smaller amount?",
                    action: "BRIDGE_TOKENS",
                },
            },
            {
                user: "user",
                content: {
                    text: "Bridge 5 ETH to Swellchain",
                    action: "BRIDGE_TOKENS",
                },
            },
        ],

    ],
    similes: ["BRIDGE"],
};