import * as fm from './formatter'
import {hashPersonalMessage,sha3} from 'ethereumjs-util'
/**
 * trim head space and tail space
 * @param str string
 */
export function trim(str) {
  return str.replace(/(^\s+)|(\s+$)/g, "");
}

/**
 * trim all spaces
 * @param str
 */
export function trimAll(str) {
  return trim(str).replace(/\s/g, "");
}

export function calculateGas(gasPrice, gasLimit) {
  return fm.toBig(gasPrice).times(gasLimit).div(1e9);
}
export default {
  hashPersonalMessage,
  sha3
}
