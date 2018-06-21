import Wallet from '../common/wallets/wallet';
import config from './config'

export default class Imtoken extends Wallet {

  constructor(imtoken) {
    super();
    this.imtoken = imtoken;
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
          resolve({result})
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


