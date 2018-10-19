import wallet from './wallet'
import settings from './settings'
import tokens from './tokens'
import transactions from './transactions'
import markets from './markets'
import orders from './orders'

const setLocalStorageVersion = (version) => {
  localStorage.dataVersion = version
}

const getLocalStorageVersion = () => {
  return localStorage.dataVersion || 0
}

const clearLocalStorage = () => {
  localStorage.clear();
}

export default {
  wallet,
  settings,
  tokens,
  transactions,
  markets,
  orders,
  setLocalStorageVersion,
  getLocalStorageVersion,
  clearLocalStorage
}
