import { ethers } from "ethers";
import { useMoonSDK } from "../Hooks/moon";

const SendTransaction = async (contractAddress, data, abi) => {
  const { moon } = useMoonSDK();
  const account = await moon.listAccounts();
  const contract = new ethers.Contract(
    "0x8b57148723f938235afabdb8b070c78f9ccea6b0",
    abi
  );
  const data = contract.methods["deposit"](params1, param2).encodeABI();
  const raw_tx = await moon.getAccountsSDK().signTransaction(account, {
    to: contractAddress,
    data: data,
    gasPrice: "1000000000",
    gas: "200000",
    nonce: "0",
    chain_id: "1891",
    encoding: "utf-8",
    value: "0",
  });

  return raw_tx;
};

export default SendTransaction;
