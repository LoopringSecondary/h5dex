import Wallet from 'common/wallets/wallet';
import config from './config'
import {toNumber,addHexPrefix} from 'LoopringJS/common/formatter'
import {keccakHash} from 'LoopringJS/common/utils'
import { Modal } from 'antd-mobile'

export default class Imtoken extends Wallet {

  constructor(imtoken) {
    super();
    this.imtoken = imtoken;
    this.walletType = 'imtoken'
  }
  getLanguage() {
    // Modal.alert('getLanguage start')
    return new Promise((resolve) => {
      this.imtoken.callAPI('device.getCurrentLanguage', (error,result) => {
        // Modal.alert('getLanguage res',result)
        if(error){
          // Modal.alert('getLanguage res error',error)
          resolve({error})
        }else{
          let language = 'en-US'
          if(result.indexOf('zh') !== -1){
            language = 'zh-CN'
          }
          resolve({result:language})
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
          let currency = 'USD'
          if(result === 'CNY'){
            currency = 'CNY'
          }
          resolve({result:currency})
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
      this.imtoken.callAPI('transaction.personalSign', {message:keccakHash(message),address:window.web3.eth.defaultAccount}, (error,result) => {
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

  signTx(tx,feeCustomizable) {
    tx.gas = tx.gasLimit;
    delete  tx.gasLimit;
    tx.from = window.web3.eth.defaultAccount
    tx.feeCustomizable = !!feeCustomizable
    return new Promise((resolve) => {
      this.imtoken.callAPI('transaction.signTransaction', tx, (error,result) => {
        if(error){
          resolve({error})
        }else{
          resolve({result:addHexPrefix(result)})
        }
      })
    })
  }
}


