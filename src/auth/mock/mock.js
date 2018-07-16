import Wallet from 'common/wallets/wallet'
import {fromPrivateKey} from 'LoopringJS/ethereum/account'
import util,{keccakHash} from 'LoopringJS/common/utils'
import {toBuffer} from "LoopringJS/common/formatter";
import {Toast} from 'antd-mobile'


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
    return new Promise((resolve) => {
      resolve({result: 'zh-CN'})
     // resolve({result: 'en-US'})
    })
  }


  getCurrency() {
    return new Promise((resolve) => {
      resolve({result: 'CNY'})
    })
  }

  getLrcFee() {
    return new Promise((resolve) => {
      resolve({result: 0.002})
    })
  }

  getCurrentAccount() {
    return new Promise((resolve) => {
      if(this.key){
        resolve({result: this.wallet.getAddress()})
      }else{
        resolve({result: "0x23bD9CAfe75610C3185b85BC59f760f400bd89b5"})
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
      }

    })
  }
}
