import { arweave } from "./arweave.js";
export const loginUser = async event => {
  return new Promise((resolve, reject) => {
    const input = event.target;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const data = reader.result;
        const wallet = JSON.parse(data);
        arweave.wallets.jwkToAddress(wallet).then(address => resolve({wallet, address}));
      } catch(error) {
        alert(error.toString());
        reject(error);
      }
    };
    reader.readAsText(file);
  });
};
