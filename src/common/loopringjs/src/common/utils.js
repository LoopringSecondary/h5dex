import {keccak} from 'ethereumjs-util';
import {toHex, toBig} from './formatter';
import {hashPersonalMessage} from 'ethereumjs-util'
import util from 'ethereumjs-util'

/**
 * trim head space and tail space
 * @param str string
 */
export function trim (str)
{
    return str.replace(/(^\s+)|(\s+$)/g, '');
}

/**
 * trim all spaces
 * @param str
 */
export function trimAll (str)
{
    return trim(str).replace(/\s/g, '');
}

export function keccakHash (str)
{
  util.bufferToHex(util.hashPersonalMessage(util.toBuffer('0x7acbff6790c56d332cc002ea6e0c3f73fce8f927947709986ab993b234c78416')))

    return toHex(keccak(str));
}

export function calculateGas (gasPrice, gasLimit)
{
    return toBig(gasPrice).times(gasLimit).div(1e9);
}


export default {
  hashPersonalMessage
}
