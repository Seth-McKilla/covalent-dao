import Web3 from "web3";
import Web3Modal from "web3modal";

export const web3Connect = async function () {
  const providerOptions = {};
  const web3Modal = new Web3Modal({
    network: "mainnet",
    cacheProvider: true,
    providerOptions,
  });

  try {
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    return web3;
  } catch (error) {
    console.log(error);
  }
};
