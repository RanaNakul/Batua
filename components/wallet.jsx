import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { EncryptedText } from "./ui/encrypted-text";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

const Wallet = ({ keyPair, index, deleteWallet, crypto }) => {
  const [showPK, setShowPK] = useState(false);

  const [userSelectedCoin, setUserSelectedCoin] = useState(null);

  const showKeyPair =
    userSelectedCoin ??
    (crypto === "Solana"
      ? "Solana"
      : crypto === "Ethereum"
        ? "Ethereum"
        : "Bitcoin");

  const activeKey = showKeyPair.toLowerCase();
  const { privateKey, publicKey } = keyPair[activeKey];

  const handleSelectCoin = (coin) => {
    setUserSelectedCoin(coin);
  };

  useEffect(() => {
    if (crypto === "Bitcoin" || crypto === "All") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      handleSelectCoin("Bitcoin");
    } else if (crypto === "Solana") {
      handleSelectCoin("Solana");
    } else if (crypto === "Ethereum") {
      handleSelectCoin("Ethereum");
    }
  }, [crypto]);

  if (!keyPair[activeKey]) return null;

  return (
    <div className="bg-neutral-100 dark:bg-neutral-950 border border-black/10 dark:border-white/8 w-full rounded-2xl mb-10">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between p-4 sm:p-7">
        <div className="w-full h-fit mx-auto flex items-center gap-8">
          <div className="w-[170px] sm:w-fit">
            <p className="text-2xl sm:text-3xl font-bold tracking-tighter  text-nowrap">
              {showKeyPair} Wallet {index + 1}
            </p>
          </div>

          <div className="flex items-center  gap-4">
            {(crypto === "Bitcoin" || crypto === "All") && (
              <button onClick={() => handleSelectCoin("Bitcoin")}>
                <Image
                  loading="eager"
                  className=" w-8 cursor-pointer object-cover contrast-75"
                  alt="bitcoin "
                  src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=040"
                  height={30}
                  width={30}
                />
              </button>
            )}
            {(crypto === "Solana" || crypto === "All") && (
              <button onClick={() => handleSelectCoin("Solana")}>
                <Image
                  loading="eager"
                  className=" w-8 cursor-pointer object-cover contrast-75"
                  alt="solana "
                  src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=040"
                  height={30}
                  width={30}
                />
              </button>
            )}
            {(crypto === "Ethereum" || crypto === "All") && (
              <button onClick={() => handleSelectCoin("Ethereum")}>
                <Image
                  loading="eager"
                  className=" w-6 cursor-pointer object-cover contrast-75"
                  alt="ethereum "
                  src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=040"
                  height={30}
                  width={30}
                />
              </button>
            )}
          </div>
        </div>
        <Button
          onClick={() => deleteWallet(index)}
          className="text-red-800 border bg-transparent border-red-800 font-bold hover:bg-red-900/20"
        >
          Delete
        </Button>
      </div>
      <div className="bg-neutral-200 flex flex-col gap-5 dark:bg-neutral-900 p-7 w-full rounded-2xl text-xs md:text-base">
        <div className="flex flex-col gap-3 ">
          <p className="text-xl font-bold tracking-tighter ">Public Key</p>
          <EncryptedText
            text={publicKey}
            encryptedClassName="text-neutral-500"
            revealedClassName="dark:text-neutral-300 text-neutral-700"
            revealDelayMs={10}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold tracking-tighter ">Private Key</p>
            <Button
              size="icon"
              onClick={() => setShowPK(!showPK)}
              variant="outline"
              className="flex min-[546px]:hidden"
            >
              {!showPK ? <Eye /> : <EyeOff />}
            </Button>
          </div>
          <div className="flex items-center justify-between  ">
            {showPK ? (
              <EncryptedText
                text={privateKey}
                encryptedClassName="text-neutral-500"
                revealedClassName="dark:text-neutral-300 text-neutral-700"
                revealDelayMs={10}
              />
            ) : (
              <p className="dark:text-neutral-300 text-neutral-800">
                ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕
                ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕ ⁕
              </p>
            )}

            <Button
              size="icon"
              onClick={() => setShowPK(!showPK)}
              variant="outline"
              className="hidden min-[546px]:flex"
            >
              {!showPK ? <Eye /> : <EyeOff />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
