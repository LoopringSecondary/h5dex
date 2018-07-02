import {toNumber} from "LoopringJS/common/formatter";
import validator from 'LoopringJS/ethereum/validator';

const storeUnlockedAddress = (unlockType, address) => {
  localStorage.unlockedType = unlockType;
  localStorage.unlockedAddress = address
};

const getUnlockedAddress = () => {
  return localStorage.unlockedAddress || ''
};

const getUnlockedType = () => {
  return localStorage.unlockedType || ''
};

const clearUnlockedAddress = () => {
  localStorage.unlockedType = ''
  localStorage.unlockedAddress = ''
};


export default {
  storeUnlockedAddress,
  getUnlockedAddress,
  getUnlockedType,
  clearUnlockedAddress
}

