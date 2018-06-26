import request from './bridge'
import Wallet from 'common/wallets/wallet'

export default class Loopr extends Wallet{

  constructor(){
    super();
    this.walletType='loopr'
  }
  getLanguage() {
   return new Promise((resolve) => {
      request('getLanguage', null, ({error,result}) => {
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
      request('getCurrency', null, ({error,result}) => {
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
      request('getLrcFee', null, ({error,result}) => {
        if(error){
          resolve({error})
        }else{
          resolve({result})
        }
      })
    })
  }

  getCurrentAccount() {
    return new Promise((resolve) => {
      request('getCurrentAccount', null, ({error,result}) => {
        if(error){
          resolve({error})
        }else{
          resolve({result})
        }
      })
    })
  }

  signMessage(message) {

    return new Promise((resolve) => {
      request('signMessage', message, ({error,result}) => {
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
      request('signTx', tx, ({error,result}) => {
        if(error){
          resolve({error})
        }else{
          resolve({result})
        }
      })
    })
  }
}
