import React, { useEffect, useRef } from "react";
import { CryptoCoin } from "./cryptocoin";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Phrasegen = ({
  mnemonic,
  setMnemonic,
  setCrypto,
  crypto,
  genWallet,
  isGen,
}) => {
  const WORD_COUNT = 12;

  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    const updated = [...mnemonic];
    updated[index] = value.replace(/\s/g, "");
    setMnemonic(updated);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === " " || e.code === "Space") {
      e.preventDefault();

      if (mnemonic[index] && index < WORD_COUNT - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
    if (e.key === "Backspace" && !mnemonic[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedText = e.clipboardData.getData("text");
    const words = pastedText
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .slice(0, WORD_COUNT);

    if (words.length === WORD_COUNT) {
      setMnemonic(words);

      // focus last input
      inputsRef.current[WORD_COUNT - 1]?.focus();
    }
  };

  return (
    <div className="relative  z-10 mx-auto w-11/12 flex flex-col text-start text-primary ">
      <div className="w-full h-fit mx-auto flex items-center gap-8">
        <div className="w-fit">
          <p className="text-xs -mb-1.5 text-neutral-400/45  whitespace-pre">
            text-5xl text-white
          </p>
          <p className=" text-[46px] 2xl:text-8xl font-bold normal-case tracking-tighter text-nowrap ">
            Secret Recovery Phrase
          </p>
          <p className="text-xl -mt-1 2xl:text-3xl font-medium tracking-tighter text-neutral-800 dark:text-neutral-200">
            Enter your secret phrase or leave blank to generate.
          </p>
        </div>
        <div className="w-full flex items-center  gap-2">
          {(crypto === "Bitcoin" || crypto === "All") && (
            <CryptoCoin
              className=" w-[11%] "
              src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=040"
            ></CryptoCoin>
          )}
          {(crypto === "Solana" || crypto === "All") && (
            <CryptoCoin
              className=" w-[11%] "
              src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=040"
            ></CryptoCoin>
          )}
          {(crypto === "Ethereum" || crypto === "All") && (
            <CryptoCoin
              className=" w-[9%]  "
              src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=040"
            ></CryptoCoin>
          )}
        </div>
        <Button className="mt-5" onClick={() => setCrypto("")}>
          Change blockchain
        </Button>
      </div>

      <div
        className="w-2xl mx-auto grid grid-cols-3 gap-4 my-5"
        onPaste={handlePaste}
      >
        {mnemonic.map((word, index) => (
          <Input
            className="bg-neutral-100 dark:bg-neutral-950"
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            value={word}
            placeholder={`word ${index + 1}`}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            autoComplete="off"
          />
        ))}
      </div>

      <Button
        onClick={() => genWallet()}
        disabled={isGen}
        className="mx-auto px-13"
      >
        Generate Wallet
      </Button>
    </div>
  );
};

export default Phrasegen;
