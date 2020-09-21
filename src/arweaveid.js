import Arweave from "arweave";
import { get as idGet, getIdenticon as idGetIdenticon} from "arweave-id";
const instance = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol:'https',
  timeout: 20000
});
export const get = async (address) => {
  return idGet(address, instance);
}
export const getIdenticon = (name) => {
  return idGetIdenticon(name);
}