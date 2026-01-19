import React, { useState } from "react";
import { TextRevealCard } from "./ui/text-reveal-card";
import { Button } from "./ui/button";
import { EncryptedText } from "./ui/encrypted-text";
import { Eye, EyeOff } from "lucide-react";
import Wallet from "./wallet";

const WalletPage = ({
  mnemonic,
  keyPairs,
  genWallet,
  deleteWallet,
  deleteAll,
  crypto
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPhrase = async () => {
    const phrase = mnemonic.join(" ").trim();
    if (!phrase) return;

    try {
      await navigator.clipboard.writeText(phrase);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy mnemonic", err);
    }
  };

  return (
    <div className="relative mb-15 z-10 mx-auto w-11/12 flex flex-col text-start text-primary ">
      <TextRevealCard
        text="Your Secret Phrase"
        revealText={mnemonic.join(" ").trim()}
        handleCopyPhrase={handleCopyPhrase}
      ></TextRevealCard>

      <div className="flex flex-col sm:flex-row gap-5  sm:items-center justify-between py-8">
        <p className=" text-4xl 2xl:text-5xl font-bold normal-case tracking-tighter text-nowrap ">
          Your Wallets
        </p>

        <div className="flex gap-3">
          <Button onClick={() => genWallet()}>Add Wallet</Button>
          <Button
            onClick={() => deleteAll()}
            className="bg-red-800 text-neutral-100 hover:bg-red-900"
          >
            Clear Wallets
          </Button>
        </div>
      </div>

      {keyPairs.map((keyPair, index) => (
        <Wallet
          key={index}
          index={index}
          keyPair={keyPair}
          deleteWallet={deleteWallet}
          crypto={crypto}
        ></Wallet>
      ))}
    </div>
  );
};

export default WalletPage;
