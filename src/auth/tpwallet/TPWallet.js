import Wallet from 'common/wallets/wallet'
import config from './config'
import {toNumber,addHexPrefix} from 'LoopringJS/common/formatter'
import {keccakHash} from 'LoopringJS/common/utils'
import {callApi} from './bridge'

export default class TPWallet extends Wallet{

  constructor() {
    super();
    this.walletType = 'tpwallet'
  }
  getLanguage() {
    return new Promise((resolve) => {
      callApi('device.getCurrentLanguage', (error,result) => {
        let language = 'en-US'
        if(error){
          resolve({result:language})
        }else{
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
      callApi('device.getCurrentCurrency', (error,result) => {
        let currency = 'USD'
        if(error){
          resolve({result:currency})
        }else{

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
      callApi('user.getCurrentAccount', function(err, address) {
        if(err) {
          resolve({err})
        } else {
          resolve({result:address})
        }
      })
    })
  }

  signMessage(message) {
    return new Promise((resolve) => {
      callApi('message.sign', {message:keccakHash(message),address:window.web3.eth.defaultAccount}, (error,result) => {
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
    return new Promise((resolve) => {
      callApi('transaction.sign', tx, (error,result) => {
        if(error){
          resolve({error})
        }else{
          resolve({result:addHexPrefix(result)})
        }
      })
    })
  }
}
