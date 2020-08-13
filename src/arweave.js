import Arweave from 'arweave/web';

export const arweave = Arweave.init();

export const txTags = tx => {
  let tags = {};

  tx.get('tags').forEach(tag => {
    const key = tag.get('name', {decode: true, string: true});
    tags[key] = tag.get('value', {decode: true, string: true});
  });

  return tags;
};

export const txOwner = async tx => {
  return await arweave.wallets.ownerToAddress(tx.owner);
};

export const txData = async tx => {
  return tx.get('data', {decode: true, string: true});
};

export const arweaveID = async address => {
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
        expr2: 'arweave-id'
      }
    }
  );

  if (!txIds.length) {
    return null;
  }

  const txId = txIds[0];
  const txData = await arweave.transactions.getData(txId, {decode: true, string: true});

  return txData;
};