import {arweave, txTags, txOwner, txData, arweaveID} from "./arweave.js";
import {APP_NAME} from "./constants.js";

export const read = async txid => {
  let tx = window.localStorage.getItem(txid);
  if (tx) {
    return JSON.parse(tx);
  }

  tx = await arweave.transactions.get(txid);
  const clone = {...tx};

  clone['tags'] = txTags(tx);
  clone['data'] = await txData(tx);
  clone['owner'] = await txOwner(tx);
  clone['owner_name'] = await arweaveID(clone.owner);
  window.localStorage.setItem(clone.id, JSON.stringify(clone));
  return clone;
};

export const publish = async (props, wallet, address) => {
  const id = props.id;
  const title = props.title;
  const subtitle = props.subtitle;
  const imageUrl = props.imageUrl;
  const duration = props.duration;
  const language = props.language;
  const rating = props.rating;
  const reviewCount = props.reviewCount;
  const isFavorite = props.isFavorite;
  const badge = props.badge;
  const author = props.author;
  const mentorAvailable = props.mentorAvailable;
  const price = props.price;
  const subject = props.subject;
  const status = props.status;
  const apiVersion = props.apiVersion;
  const content = props.content;
  const timestamp = Math.round((new Date()).getTime() / 1000);
  let transaction = await arweave.createTransaction(
    {
      data: content,
    },
    wallet
  );

  transaction.addTag('Content-Type', 'text/html');

  const tags = {
    'App-Name': APP_NAME,
    'Syllabus-Id': id,
    'Syllabus-Title': title,
    'Syllabus-Subtitle': subtitle,
    'Syllabus-ImageUrl': imageUrl,
    'Syllabus-Duration': duration,
    'Syllabus-Language': language,
    'Syllabus-Rating': rating,
    'Syllabus-ReviewCount': reviewCount,
    'Syllabus-IsFavorite': isFavorite,
    'Syllabus-Badge': badge,
    'Syllabus-Author': author,
    'Syllabus-Mentor': mentorAvailable,
    'Syllabus-Price': price,
    'Syllabus-Subject': subject,
    'Syllabus-Status': status,
    'Syllabus-API': apiVersion,
    'Syllabus-Timestamp': timestamp
  };

  for (const [tagKey, tagValue] of Object.entries(tags)) {
    transaction.addTag(tagKey, tagValue);
  }
    
  console.log(transaction);

  await arweave.transactions.sign(transaction, wallet);
  let uploader = await arweave.transactions.getUploader(transaction);
  while (!uploader.isComplete) {
    await uploader.uploadChunk();
    console.log(
      `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
    );
  }
  return transaction;
};
