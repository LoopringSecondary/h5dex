import Wallet from 'common/wallets/wallet';
import config from './config'
import {toNumber,addHexPrefix} from 'LoopringJS/common/formatter'

export default class Imtoken extends Wallet {

  constructor(imtoken) {
    super();
    this.imtoken = imtoken;
    this.walletType = 'imtoken'
  }
  getLanguage() {
    return new Promise((resolve) => {
      this.imtoken.callAPI('device.getCurrentLanguage', (error,result) => {
        if(error){
          resolve({error})
        }else{
          resolve({result})
        }
      })
    })
  }

  getCurrency() {
    return new Promise((resolve) => {
      this.imtoken.callAPI('device.getCurrentCurrency', (error,result) => {
        if(error){
          resolve({error})
        }else{
          resolve({result})
        }
      })
    })
  }

  getLrcFee() {
    return new Promise((resolve) => {
      resolve({result:config.getLrcFeePercentage()})
    })
  }

  getCurrentAccount() {
    return new Promise((resolve) => {
          resolve({result:window.web3.eth.defaultAccount})
    })
  }

  signMessage(message) {

    return new Promise((resolve) => {
      this.imtoken.callAPI('transaction.personalSign', {message,address:window.web3.eth.defaultAccount}, (error,result) => {
        if(error){
          resolve({error})
        }else{
          const r = result.slice(0, 66);
          const s = addHexPrefix(result.slice(66, 130));
          const v = toNumber(addHexPrefix(result.slice(130, 132)));
          resolve({result:{r,s,v}})
        }
      })
    })
  }

  signTx(tx) {
    return new Promise((resolve) => {
      this.imtoken.callAPI('transaction.signTransaction', {...tx,from:window.web3.eth.defaultAccount}, (error,result) => {
        if(error){
          resolve({error})
        }else{
          resolve({result})
        }
      })
    })
  }
}


