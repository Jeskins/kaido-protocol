# Kaido Protocol
Safest defi protocol for beginners built on Kinto powered by Galadriel AI

## Problem
DeFi platforms are often overwhelming for beginners trying to enter the Web3 space, making them accessible mainly to those familiar with the technicalities. This creates a barrier for new users, leading to feelings of being left out despite their desire to participate.

With the growth of LLMs and Chatbots, people have become more accustomed to interacting with AI bots for guidance. This project aims to bridge the gap by offering a solution where users can perform DeFi actions on Kinto, assisted by a real-time AI chatbot. Our AI bot provides users with real-time data on crypto prices and guides them in making informed financial decisions. Users can clarify complex terms and utilize the platform as a one-stop solution for all their DeFi needs.

## Features
- Real-time AI Assistance: An AI chatbot that helps users navigate the complexities of DeFi, providing real-time guidance based on up-to-date market data.
- DeFi Actions: Perform swaps, manage liquidity pools, and more directly on the Kinto platform.
- User-friendly Interface: Built on a modern tech stack to ensure an intuitive and seamless user experience.

## How It's Made
Our application is built using the Next.js stack to create a responsive and functional user interface. We’ve forked Uniswap V3 contracts to manage liquidity pools and enable token swaps, ensuring the core DeFi functions are reliable and efficient. The platform is deployed on the Kinto Mainnet, providing the necessary scalability and security. We use Kinto wallet connectors to enable Smart Accounts, simplifying user authentication and transaction management.

The AI agent, built with Galadriel, is integrated into our platform using XMTP chat. This AI offers real-time assistance by providing up-to-date crypto data and guiding users through DeFi actions. Whether it's clarifying terms or making financial decisions, the AI helps users navigate the platform effectively.

## Sponsor Integration

### Galdriel

AI Agent Contract deployment

`https://explorer.galadriel.com/address/0x94f9BbBA5081Bc9232493f1aa0D74Ca56e942571`

AI Agent Contract code

`https://github.com/Jeskins/kaido-protocol/blob/main/LLM/contracts/contracts/OpenAiSimpleLlm.sol`

### Kinto

Uniswap V3 Fork contracts code deployed on Kinto

`https://github.com/Jeskins/kaido-protocol/tree/main/hardhat/contracts`

Kinto deployments

`https://github.com/Jeskins/kaido-protocol/blob/main/hardhat/networks.js#L58`

Frontend contract call integration

`https://github.com/Jeskins/kaido-protocol/blob/main/frontend/src/components/sections/pool/transaction.tsx#L307`

### XMTP

AI Agent Chat bot built using MessageKit

`https://github.com/Jeskins/kaido-protocol/blob/main/XMTPfinale/index.ts`

## Getting Started
1. Clone the Repository:
```bash
git clone https://github.com/Jeskins/kaido-protocol.git
cd kaido-protocol
```

2. Install dependencies:
```bash
npm install
```

3. Run the Development Server:
```
npm run dev
```

## Contributing
We welcome contributions from the community! Please feel free to submit issues, fork the repository, and open pull requests.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

Built with ❤️ by @Jeskins and @Marshal-AM


