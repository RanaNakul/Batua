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
    <div className="relative  z-10 mx-auto w-full md:w-11/12 lg:w-10/12 max-w-[1400px] flex flex-col text-start text-primary px-7 min-[772px]:px-0 ">
      <div className="w-full mb-6 h-fit mx-auto min-[588px]:flex items-center gap-8">
        <div className="w-full min-[772px]:w-fit space-y-1.5 ">
          <p className="text-xs -mb-1.5 text-neutral-400/45  whitespace-pre">
            text-5xl text-white
          </p>
          <p className="text-2xl min-[400px]:text-[32px] min-[944px]:text-[46px] 2xl:text-7xl font-bold normal-case tracking-tighter text-nowrap ">
            Secret Recovery Phrase
          </p>
          <p className="text-sm min-[944px]:text-xl -mt-1 2xl:text-3xl font-medium tracking-tighter text-neutral-800 dark:text-neutral-200">
            Enter your secret phrase or leave blank to generate.
          </p>
        </div>
        <div className="w-full hidden min-[772px]:flex items-center  gap-2">
          {(crypto === "Bitcoin" || crypto === "All") && (
            <CryptoCoin
              className=" w-12 "
              src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=040"
            ></CryptoCoin>
          )}
          {(crypto === "Solana" || crypto === "All") && (
            <CryptoCoin
              className=" w-12 "
              src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=040"
            ></CryptoCoin>
          )}
          {(crypto === "Ethereum" || crypto === "All") && (
            <CryptoCoin
              className=" w-10 "
              src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=040"
            ></CryptoCoin>
          )}
        </div>
        <Button className="mt-5" onClick={() => setCrypto("")}>
          Change blockchain
        </Button>
      </div>

      <div
        className="w-full  min-[520px]:w-fit mx-auto grid grid-cols-1 min-[520px]:grid-cols-2 md:grid-cols-3 gap-4 my-5"
        onPaste={handlePaste}
      >
        {mnemonic.map((word, index) => (
          <Input
            className="bg-neutral-100 dark:bg-neutral-950 w-full min-[520px]:w-[195px]"
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
        className="mx-auto px-13 w-full  min-[520px]:w-[195px] mb-20"
      >
        Generate Wallet
      </Button>
    </div>
  );
};

export default Phrasegen;
