# SwellChain Agent with Eliza

This guide explains how to build and customize SwellChain agents using the Eliza framework, enabling seamless interaction with the SwellChain ecosystem through various communication channels.

![SwellChain Agent Banner](https://res.cloudinary.com/dydj8hnhz/image/upload/v1745513114/guutivglcbdcarxslwnw.png)

## Overview

SwellChain Agent leverages Eliza's extensible agent architecture to provide a user-friendly interface for SwellChain operations. The implementation consists of:

1. A custom SwellChain plugin (`@elizaos/plugin-swell`) in the `packages/plugin-swell` directory
2. A SwellChain character configuration in the `agents` directory

## Features

- 🔄 **Token Transfers**: Send tokens between addresses on SwellChain
- 🌉 **Cross-Chain Bridge**: Bridge assets between Ethereum and SwellChain
- 💱 **Token Swaps**: Exchange tokens using SwellChain's liquidity pools - mainnet
- 📊 **Price Oracle**: Query current and historical token prices
- 💰 **Earning Opportunities**: Discover staking, lending, and liquidity provision options
- ⛏️ **EarnETH**: Deposit assets into yield vaults on mainnet

## Getting Started

### Prerequisites

- [Node.js 23+](https://nodejs.org/)
- [pnpm](https://pnpm.io/installation)
- An Ethereum wallet with SwellChain access

## Installation

1. Clone the Eliza repository:
   ```bash
   git clone https://github.com/Kagwep/swell-agent.git
   cd swell-agent
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

## SwellChain Plugin Overview

The SwellChain plugin is located in the `packages/swell-plugin` directory. This plugin enables interaction with the SwellChain ecosystem through the Eliza agent framework.

### Available Actions

The plugin provides the following actions:

1. **Bridge** - Transfer assets between Ethereum and SwellChain
2. **Swap** - Exchange tokens on SwellChain
3. **Deposit Assets** - Deposit assets to boringVault to earn ETH returns
4. **Transfer Assets** - Send tokens to different addresses on SwellChain
5. **Fetch Opportunities** - Discover investment opportunities on SwellChain

### Environment Configuration

The following environment variables must be configured for the plugin to function:
```
ANTHROPIC_API_KEY=     # API key for Anthropic services
SWELL_PRIVATE_KEY=     # Private key for SwellChain transactions
SWELL_PROVIDER_URL=    # RPC endpoint for SwellChain
ETHEREUM_PRIVATE_KEY=  # Private key for Ethereum transactions
ETHEREUM_PROVIDER_URL= # RPC endpoint for Ethereum
```

## Character Configuration

Eliza uses character files to define an agent's personality, knowledge, and capabilities. The repository includes a default SwellChain character file at `swell.character.ts`:

```typescript
// swell.character.ts
export default {
  name: "SwellGuide",
  description: "An expert in SwellChain operations",
  instructions: "You are SwellGuide, a helpful assistant for the SwellChain ecosystem. Help users with transfers, bridges, swaps, and finding earning opportunities.",
  plugins: ["@elizaos/plugin-swell"],
  model: {
    provider: "openai",
    model: "gpt-4",
    apiKey: "${OPENAI_API_KEY}"
  },
  clients: ["web"]
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

### Live Demo

Experience the SwellChain agent in action at our live demo site:
[https://swell-agent-client.vercel.app/](https://swell-agent-client.vercel.app/)

This demo showcases the agent's capabilities and user interface.

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

![Discord Bot Demo](https://placeholder-image.com/discord-demo.png)

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

![X Bot Demo](https://placeholder-image.com/twitter-demo.png)

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

## Chat UI Formatting Improvements

The default chat interface can be customized in several ways:

### Custom CSS Themes

Add custom themes by creating a CSS file in the `client/themes` directory:

```css
/* themes/swell-dark.css */
:root {
  --primary-color: #3498db;
  --background-color: #121212;
  --text-color: #f0f0f0;
  /* Add more custom variables */
}
```

Enable your theme in the `.env` file:
```
CLIENT_THEME=swell-dark
```

### Message Formatting

The agent supports rich text formatting in messages:

- Code blocks with syntax highlighting
- Tables for structured data
- Embedded charts for token prices
- Custom SwellChain transaction cards

Example of transaction card formatting:
```json
{
  "type": "transaction-card",
  "data": {
    "txType": "swap",
    "from": "ETH",
    "to": "SWELL",
    "amount": "0.5",
    "value": "$900.00"
  }
}
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


## Video Tutorial

Watch our setup video tutorial for a step-by-step guide:

[![Watch the video](https://res.cloudinary.com/dydj8hnhz/image/upload/v1745513114/guutivglcbdcarxslwnw.png)](https://youtu.be/FFEYxFZILEg)

## Future Improvements

We're actively working on enhancing the SwellChain Agent with the following planned features:

### Short-term Roadmap
- **Improved Chat Formatting**: Enhanced text formatting for better readability of financial data and transaction details
- **Rich Media Support**: Inline charts and graphs for token price history and APR comparisons
- **Multi-language Support**: Internationalization for global users

### Medium-term Roadmap
- **Voice Interface**: Integration with voice assistants for hands-free interaction

### Long-term Vision
- **Multi-chain Support**: Expand beyond SwellChain to other Layer 2 solutions
- **Agent Collaboration**: Allow multiple specialized agents to collaborate on complex tasks
- **Permissionless Plugin System**: Enable community-developed plugins for extended functionality

## Resources

- [Eliza Documentation](https://elizaos.github.io/eliza/)
- [SwellChain Documentation](https://build.swellnetwork.io/docs/)
- [Eliza Discord Community](https://discord.gg/elizaos)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
