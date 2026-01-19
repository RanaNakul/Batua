import React from "react";
import { Button } from "./ui/button";
import { CryptoCoin } from "./cryptocoin";

const Chooseblockchain = ({ setCrypto }) => {
  return (
    <div className="relative z-10 mx-auto w-full md:w-11/12 lg:w-10/12 max-w-[1400px] flex gap-20 2xl:gap-35 text-start text-primary px-7 ">
      <div className="mt-[5%] w-[65%] ">
        <p className="text-[7px] min-[500px]:text-[10px] md:text-sm mt-4 pl-1 text-neutral-400/45  whitespace-pre">
          text-8xl text-white tracking-tighter text-balance
        </p>
        <p className="text-3xl min-[500px]:text-5xl md2:text-[55px]/14 lg2:text-7xl xl2:text-[85px] 2xl:text-8xl md:mt-2 font-mediu normal-case tracking-tighter text-nowrap ">
          Digital batwa for <br /> a decentralized world
        </p>
        <p className="text-sm min-[500px]:text-xl 2xl:text-3xl pl-1 mt-0.5 font-medium tracking-tighter text-neutral-800 dark:text-neutral-200">
          Choose a blockchain to get started.
        </p>

        <div className=" flex flex-wrap gap-3 sm:gap-4 mt-7 pl-1 justify-start">
          <Button
            onClick={() => setCrypto("Solana")}
            className="capitalize font-manrope "
          >
            Solana
          </Button>
          <Button
            onClick={() => setCrypto("Ethereum")}
            className="capitalize font-manrope "
          >
            Ethereum
          </Button>
          <Button
            onClick={() => setCrypto("Bitcoin")}
            className="capitalize font-manrope "
          >
            Bitcoin
          </Button>
          <Button
            onClick={() => setCrypto("All")}
            className="capitalize font-manrope "
          >
            All
          </Button>
        </div>
      </div>

      <CryptoCoin
        className=" hidden md:block mt-18 md:mt-24 w-[19%]"
        src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=040"
      ></CryptoCoin>
    </div>
  );
};

export default Chooseblockchain;