"use client";

import { genKeypair, genMnemonic, genSeed } from "@/utils/generate";
import { useEffect, useRef, useState } from "react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import Navbar from "@/components/navbar";
import Phrasegen from "@/components/phrase-gen";
import Chooseblockchain from "@/components/chooseblockchain";
import WalletPage from "@/components/walletpage";

export default function Home() {
  const [mnemonic, setMnemonic] = useState(Array(12).fill(""));
  // const [mnemonic, setMnemonic] = useState([
  //   "recycle",
  //   "you",
  //   "clutch",
  //   "session",
  //   "seven",
  //   "claw",
  //   "say",
  //   "tube",
  //   "dinosaur",
  //   "demise",
  //   "evoke",
  //   "thunder",
  // ]);

  const walletIndexRef = useRef(0);

  const [crypto, setCrypto] = useState("");

  const [keyPairs, setKeyPairs] = useState([]);

  const [isGen, setIsGen] = useState(false);

  const genWallet = () => {
    // if (isGen) return;

    let mnemonicPhrase = mnemonic.join(" ").trim();
    if (!mnemonicPhrase) {
      mnemonicPhrase = genMnemonic();
      setMnemonic(mnemonicPhrase.split(" "));
    }

    const seed = genSeed(mnemonicPhrase);

    const keypair = genKeypair(seed, walletIndexRef.current, crypto);

    setKeyPairs((prev) => [...prev, keypair]);

    setIsGen(true);

    walletIndexRef.current++;
  };

  const deleteWallet = (indexToDelete) => {
    setKeyPairs((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  const deleteAll = () => {
    setMnemonic(Array(12).fill(""));
    setCrypto("")
    setKeyPairs([]);
    setIsGen(false);
    walletIndexRef.current = 0
  }

  useEffect(() => {
    console.log("index: ", walletIndexRef.current);

    console.log("KeyPair updated:", keyPairs);
  }, [keyPairs]);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-start justify-start   bg-neutral-100  dark:bg-neutral-950">
      <BackgroundRippleEffect />
      <Navbar />

      {!crypto && <Chooseblockchain setCrypto={setCrypto}></Chooseblockchain>}

      {crypto && isGen === false && (
        <Phrasegen
          mnemonic={mnemonic}
          setMnemonic={setMnemonic}
          crypto={crypto}
          setCrypto={setCrypto}
          genWallet={genWallet}
          isGen={isGen}
        ></Phrasegen>
      )}

      {isGen && (
        <WalletPage
          mnemonic={mnemonic}
          keyPairs={keyPairs}
          genWallet={genWallet}
          deleteWallet={deleteWallet}
          deleteAll={deleteAll}
          crypto={crypto}
        ></WalletPage>
      )}
    </div>
  );
}
