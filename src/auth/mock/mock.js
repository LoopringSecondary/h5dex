import Wallet from 'common/wallets/wallet'
import {fromPrivateKey} from 'LoopringJS/ethereum/account'
import util,{keccakHash} from 'LoopringJS/common/utils'
import {toBuffer} from "LoopringJS/common/formatter";
import {Toast} from 'antd-mobile'
import settings from 'modules/storage/settings'

export default class MockWallet extends Wallet {
  constructor(key) {
    super();
    if(key){
      this.key = key
      this.wallet = fromPrivateKey(key);
    }
    this.walletType='mock'
  }

  getLanguage() {
    const userSettings = settings.getLanguage()
    if(userSettings) {
      return new Promise((resolve, reject) => {
        resolve({result: userSettings});
      })
    } else {
      return new Promise((resolve) => {
        resolve({result: 'zh-CN'})
        // resolve({result: 'en-US'})
      })
    }
  }

  getCurrency() {
    const userSettings = settings.getCurrency()
    if(userSettings) {
      return new Promise((resolve, reject) => {
        resolve({result: userSettings});
      })
    } else {
      return new Promise((resolve) => {
        resolve({result: 'CNY'})
      })
    }
  }

  getLrcFee() {
    const userSettings = settings.getLRCFee()
    if(userSettings) {
      return new Promise((resolve, reject) => {
        resolve({result: userSettings});
      })
    } else {
      return new Promise((resolve) => {
        resolve({result: 0.002})
      })
    }
  }

  getCurrentAccount() {
    return new Promise((resolve) => {
      if(this.key){
        resolve({result: this.wallet.getAddress()})
      }else{
        resolve({result: "0xb94065482ad64d4c2b9252358d746b39e820a582"})
      }
    })
  }

  signMessage(message) {
    const hash = util.hashPersonalMessage(toBuffer(keccakHash(toBuffer(message))));
    return new Promise((resolve) => {
      if(this.key){
        const sig = this.wallet.sign(hash);
        resolve({result: sig})
      }else{
        Toast.fail('Mock 模式不支持Sign操作')
        resolve({error: {message:"Mock 模式不支持Sign操作"}})
      }
    })
  }

  signTx(tx) {
    const {chainId, data, gasPrice, gasLimit} = tx;
    tx.chainId = chainId || 1;
    tx.data = data || '0x';
    tx.gasPrice = gasPrice || '0x2540be400';
    tx.gasLimit = gasLimit || '0x249f0';
    return new Promise((resolve) => {
      if(this.key){
        const sig = this.wallet.signEthereumTx(tx);
        resolve({result: sig})
      }else{
        Toast.fail('Mock 模式不支持Sign操作')
        resolve({error: {message:"Mock 模式不支持Sign操作"}})
      }

    })
  }
}
