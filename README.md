# Batua
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/RanaNakul/Batua)

Batua is a secure, client-side Web3 wallet generator that puts you in complete control of your digital assets. It allows you to create and manage wallets for multiple blockchains, ensuring your private keys never leave your device. Designed for simplicity, speed, and security, Batua is your trusted gateway to the decentralized web.

## Key Features

*   **Client-Side Security:** All cryptographic operations, including mnemonic and key pair generation, happen locally in your browser. Your private keys are never stored or transmitted.
*   **Multi-Chain Support:** Generate wallets for Bitcoin, Ethereum, and Solana from a single secret recovery phrase.
*   **Mnemonic Phrase Control:** Generate a new 12-word secret recovery phrase or import your existing one to derive wallets.
*   **Hierarchical Deterministic (HD) Wallets:** Create multiple wallet accounts (addresses) from a single seed using standard derivation paths.
*   **Interactive UI:** A modern, responsive interface built with Next.js and Tailwind CSS for a smooth user experience, featuring components from Shadcn/ui and Aceternity UI.

## How It Works

1.  **Choose Blockchain:** Select from Bitcoin, Ethereum, Solana, or "All" to generate wallets for all three.
2.  **Enter or Generate Phrase:** Provide your 12-word secret recovery phrase. If you leave the fields blank, a new, secure phrase will be generated for you.
3.  **Generate Wallet:** Batua uses the phrase to derive a master seed and then generates the public and private keys for the selected blockchain(s).
4.  **Manage Wallets:** View your wallet addresses and reveal private keys when needed. You can add more accounts derived from the same phrase or clear all generated data from the interface.

## Supported Blockchains

*   Bitcoin (BTC)
*   Ethereum (ETH)
*   Solana (SOL)

## Technology Stack

*   **Framework:** [Next.js](https://nextjs.org/)
*   **UI Library:** [React](https://reactjs.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/), [Shadcn/ui](https://ui.shadcn.com/), [Aceternity UI](https://ui.aceternity.com/)
*   **Cryptography:**
    *   **Ethereum:** [ethers.js](https://ethers.io/)
    *   **Solana:** [@solana/web3.js](https://solana-labs.github.io/solana-web3.js/)
    *   **Bitcoin:** [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib)
    *   **Mnemonic/Seed:** [bip39](https://github.com/bitcoinjs/bip39), [bip32](https://github.com/bitcoinjs/bip32)

## Local Development

To run Batua on your local machine, follow these steps:

1.  Clone the repository:
    ```bash
    git clone https://github.com/rananakul/batua.git
    ```

2.  Navigate to the project directory:
    ```bash
    cd batua
    ```

3.  Install the dependencies:
    ```bash
    npm install
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## ⚠️ Security Disclaimer

**IMPORTANT:** This is a powerful tool for educational and practical purposes. Since all operations are client-side, **you** are solely responsible for the security of your generated secret recovery phrase.

*   **Never share your secret recovery phrase with anyone.**
*   **Store your phrase in a secure, offline location.** Losing your phrase means losing access to your wallets and any funds they contain forever.
*   This software is provided as-is, without any warranty. Always exercise caution and consider using it for smaller amounts until you have verified its behavior and security.
