# SwellChain Agent with Eliza

This guide explains how to build and customize SwellChain agents using the Eliza framework, enabling seamless interaction with the SwellChain ecosystem through various communication channels.

## Overview

SwellChain Agent leverages Eliza's extensible agent architecture to provide a user-friendly interface for SwellChain operations. The implementation consists of:

1. A custom SwellChain plugin (`@elizaos/plugin-swell`) in the `packages/plugin-swell` directory
2. A SwellChain character configuration in the `agents` directory

## Features

- 🔄 **Token Transfers**: Send tokens between addresses on SwellChain
- 🌉 **Cross-Chain Bridge**: Bridge assets between Ethereum and SwellChain
- 💱 **Token Swaps**: Exchange tokens using SwellChain's liquidity pools
- 📊 **Price Oracle**: Query current and historical token prices
- 💰 **Earning Opportunities**: Discover staking, lending, and liquidity provision options

## Getting Started

### Prerequisites

- [Node.js 23+](https://nodejs.org/)
- [pnpm](https://pnpm.io/installation)
- An Ethereum wallet with SwellChain access

### Installation

1. Clone the Eliza repository:
   ```bash
   git clone https://github.com/elizaos/eliza.git
   cd eliza
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Configure your environment:
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file to include your wallet information and API keys.

4. Build the project:
   ```bash
   pnpm build
   ```

5. Add the SwellChain plugin:
   ```bash
   npx elizaos plugins add @elizaos-plugins/plugin-swell
   ```

6. Create or modify your SwellChain character file (see next section)

7. Start the agent:
   ```bash
   pnpm start --characters="agents/swellchain.json"
   ```

8. Start the web client:
   ```bash
   pnpm start:client
   ```

## Character Configuration

Eliza uses character files to define an agent's personality, knowledge, and capabilities. A SwellChain character file will look something like this:

```json
{
  "name": "SwellGuide",
  "description": "An expert in SwellChain operations",
  "instructions": "You are SwellGuide, a helpful assistant for the SwellChain ecosystem. Help users with transfers, bridges, swaps, and finding earning opportunities.",
  "plugins": ["@elizaos/plugin-swell"],
  "model": {
    "provider": "openai",
    "model": "gpt-4",
    "apiKey": "${OPENAI_API_KEY}"
  },
  "clients": ["web"]
}
```

You can customize:
- The agent's personality and instructions
- The underlying AI model
- Which clients the agent will use to communicate

## Adding Multiple Agents

You can create and run multiple agents simultaneously with Eliza:

1. Create separate character files for each agent:
   ```
   agents/
   ├── swellchain-expert.json
   ├── swellchain-trader.json
   └── swellchain-developer.json
   ```

2. Start Eliza with multiple character files:
   ```bash
   pnpm start --characters="agents/swellchain-expert.json,agents/swellchain-trader.json,agents/swellchain-developer.json"
   ```

Each agent will operate independently with its own personality and specialized knowledge.

## Connecting to Communication Platforms

### Web Interface
The web interface is enabled by default by including `"web"` in the `"clients"` array.

### Discord
To connect your agent to Discord:

1. Add `"discord"` to the `"clients"` array in your character file:
   ```json
   "clients": ["web", "discord"]
   ```

2. Add your Discord bot token to your `.env` file:
   ```
   DISCORD_BOT_TOKEN=your_discord_bot_token
   ```

3. Invite the bot to your server with appropriate permissions

### X (Twitter)
To connect your agent to X (formerly Twitter):

1. Add `"twitter"` to the `"clients"` array:
   ```json
   "clients": ["web", "twitter"]
   ```

2. Add your X API credentials to your `.env` file:
   ```
   TWITTER_APP_KEY=your_app_key
   TWITTER_APP_SECRET=your_app_secret
   TWITTER_ACCESS_TOKEN=your_access_token
   TWITTER_ACCESS_SECRET=your_access_secret
   ```

### Telegram
To connect your agent to Telegram:

1. Add `"telegram"` to the `"clients"` array:
   ```json
   "clients": ["web", "telegram"]
   ```

2. Add your Telegram bot token to your `.env` file:
   ```
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token
   ```

## SwellChain Plugin Capabilities

The SwellChain plugin provides the following actions:

### Token Transfers
Transfer tokens between addresses on SwellChain:
```
Send 0.1 ETH to 0x1234...5678
```

### Bridging Assets
Bridge tokens between Ethereum and SwellChain:
```
Bridge 5 ETH from Ethereum to SwellChain
```
```
Send 10 USDT from SwellChain back to Ethereum
```

### Price Oracle Queries
Get current and historical token prices:
```
What's the current price of ETH/USDC?
```
```
Show me the historical price data for SWELL/ETH over the past week
```

### Earning Opportunities
Discover yield-generating options:
```
Show me all lending opportunities with APR above 5%
```
```
What are the best pools for earning yield with ETH?
```

### Token Swaps
Execute token exchanges on SwellChain:
```
Swap 0.5 ETH for SWELL with 0.5% slippage
```
```
Exchange 100 USDe for swETH
```

## Customizing Your Agent

### Personality and Knowledge
Modify the `instructions` field in your character file to specialize your agent. For example:

```json
"instructions": "You are SwellTrader, an expert in finding the best SwellChain trading opportunities. Focus on helping users optimize their token swaps, find the best prices, and identify high-yield earning opportunities. Use technical analysis and market knowledge to provide trading insights."
```

### Supported Tokens
The plugin supports all major tokens on SwellChain, including:
- ETH (native token)
- WETH
- SWELL
- USDe
- swETH
- rswETH
- weETH
- and many more

You can check the full list in the plugin's swap template.

## Advanced Configuration

### Multi-Agent Interactions
Create specialized agents that work together:

1. **SwellAdvisor**: Helps users understand SwellChain concepts
2. **SwellTrader**: Specializes in optimizing swaps and finding good prices
3. **SwellYield**: Focuses on finding the best earning opportunities

Users can interact with the agent that best suits their current needs.

### Integration with External Data
The SwellChain plugin can be extended to incorporate:
- Market data from external sources
- Gas price optimizers
- Trading strategy recommendations

## Troubleshooting

### Common Issues

**Plugin Not Found**
```
Error: Plugin '@elizaos/plugin-swell' not found
```
Solution: Make sure you've added the plugin with `npx elizaos plugins add @elizaos-plugins/plugin-swell`

**API Connection Issues**
```
Error connecting to SwellChain RPC
```
Solution: Check your network connection and verify RPC endpoints in the plugin configuration

## Resources

- [Eliza Documentation](https://elizaos.github.io/eliza/)
- [SwellChain Documentation](https://build.swellnetwork.io/docs/)
- [Eliza Discord Community](https://discord.gg/elizaos)

## Contributing

Contributions to improve the SwellChain agent are welcome! You can:

1. Create new SwellChain-specific actions in the plugin
2. Improve the agent's knowledge and instructions
3. Add support for new tokens or features
4. Share your custom character configurations

## License

This project is licensed under the MIT License - see the LICENSE file for details.
