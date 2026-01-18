import React from "react";
import { Button } from "./ui/button";
import { CryptoCoin } from "./cryptocoin";

const Chooseblockchain = ({ setCrypto }) => {
  return (
    <div className="relative  z-10 mx-auto w-10/12 flex gap-35   text-start text-primary px-7 ">
      <div className="mt-[5%] w-[60%] ">
        <p className="text-sm mt-4 pl-1.75 text-neutral-400/45  whitespace-pre">
          text-8xl text-white tracking-tighter text-balance
        </p>
        <p className=" text-7xl 2xl:text-8xl mt-2 font-medium normal-case tracking-tighter text-balance ">
          Digital batwa for a decentralized world
        </p>
        <p className="text-2xl 2xl:text-3xl pl-2 mt-0.5 font-medium tracking-tighter text-neutral-800 dark:text-neutral-200">
          Choose a blockchain to get started.
        </p>

        <div className=" flex gap-4 mt-7 pl-2">
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
        className=" mt-24 w-[19%]"
        src="/bitcoin-logo-svgrepo-com.svg"
      ></CryptoCoin>
    </div>
  );
};

export default Chooseblockchain;
