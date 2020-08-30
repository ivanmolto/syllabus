import { arweave } from "./arweave.js";
import { read } from "./syllabus.js";
import { APP_NAME } from "./constants.js";
export const syllabiByApp = async() => {
  const txIds = await arweave.arql(
    {
      op: 'equals',
      expr1: 'App-Name',
      expr2: APP_NAME
    }
  );
  return await fillTxIdsWithData(txIds);
};
export const syllabiByAddress = async address => {
  const txIds = await arweave.arql(
    {
      op: 'and',
      expr1: {
        op: 'equals',
        expr1: 'from',
        expr2: address
      },
      expr2: {
        op: 'equals',
        expr1: 'App-Name',
        expr2: APP_NAME
      }
    }
  );
  return await fillTxIdsWithData(txIds);
}
const fillTxIdsWithData = async txIds => {
  if (!txIds.length) {
    return [];
  }
  let txs = [];
  await Promise.all(
    txIds.map(async txId => {
      const tx = await read(txId);
      if (tx.data.length >= 0) {
        txs = [...txs, tx];
      }
    })
  );
  return txs;
};
