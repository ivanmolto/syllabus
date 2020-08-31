import {arweave, txTags, txOwner, txData} from "./arweave.js";
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
  let tx = await arweave.createTransaction(
    {
      data: content,
    },
    wallet
  );
  tx['last_tx'] = await arweave.api.get('/tx_anchor').then(x => x.data);
  tx.addTag('Content-Type', 'text/html');
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
    tx.addTag(tagKey, tagValue);
  }
  await arweave.transactions.sign(tx, wallet);
  let uploader = await arweave.transactions.getUploader(tx);
  while (!uploader.isComplete) {
    await uploader.uploadChunk();
  }
  const clone = {...tx};
  clone['tags'] = tags;
  clone['data'] = content;
  clone['owner'] = address;
  window.localStorage.setItem(clone.id, JSON.stringify(clone));
  return clone;
};
