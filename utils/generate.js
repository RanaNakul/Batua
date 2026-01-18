import nacl from "tweetnacl";
import bs58 from "bs58";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { HDNodeWallet, Wallet } from "ethers";
import * as ecc from "tiny-secp256k1";
import BIP32Factory from "bip32";
import { networks, payments } from "bitcoinjs-lib";

export function genMnemonic() {
  const mnemonic = generateMnemonic(128);

  // console.log(mnemonic);
  return mnemonic;
}

export function genSeed(mnemonic) {
  const seed = mnemonicToSeedSync(mnemonic);
  // console.log(seed);
  return seed;
}

function bitcoinKP(seed, index) {
  const bitcoinPath = `m/84'/0'/0'/0/${index}`; // This is the derivation path

  const bip32 = BIP32Factory(ecc);
  const hdroot = bip32.fromSeed(seed, networks.bitcoin);
  const bitcoinNode = hdroot.derivePath(bitcoinPath);
  const privateKey = bitcoinNode.toWIF();
  const { address } = payments.p2wpkh({
    pubkey: bitcoinNode.publicKey,
    network: networks.bitcoin,
  });
  const publicKey = address;

  return { publicKey, privateKey };
}

function solanaKP(seed, index) {
  const solanaPath = `m/44'/501'/${index}'/0'`; // This is the derivation path

  const solanaDerivedSeed = derivePath(solanaPath, seed.toString("hex")).key;
  const solanaSecret = nacl.sign.keyPair.fromSeed(solanaDerivedSeed).secretKey;
  const publicKey = Keypair.fromSecretKey(solanaSecret).publicKey.toBase58();
  const privateKey = bs58.encode(solanaDerivedSeed);

  return { publicKey, privateKey };
}

function ethereumKP(seed, index) {
  const ethereumPath = `m/44'/60'/0'/0/${index}`; // This is the derivation path
  const hdnode = HDNodeWallet.fromSeed(seed);
  const ethDerivedNode = hdnode.derivePath(ethereumPath);
  const ethWallet = new Wallet(ethDerivedNode.privateKey);
  const publicKey = ethWallet.address;
  const privateKey = ethWallet.privateKey;

  return { publicKey, privateKey };
}

export function genKeypair(seed, index, crypto) {
  let bitcoin = {};

  let solana = {};

  let ethereum = {};

  console.log("index2: ", index);

  console.log("crypto: ", crypto);

  if (crypto === "All") {
    bitcoin = bitcoinKP(seed, index);
    solana = solanaKP(seed, index);
    ethereum = ethereumKP(seed, index);
  } else if (crypto === "Bitcoin") {
    bitcoin = bitcoinKP(seed, index);
  } else if (crypto === "Solana") {
    solana = solanaKP(seed, index);
  } else if (crypto === "Ethereum") {
    ethereum = ethereumKP(seed, index);
  }

  console.log("bitcoin: ", bitcoin);

  return { bitcoin, solana, ethereum };
}
