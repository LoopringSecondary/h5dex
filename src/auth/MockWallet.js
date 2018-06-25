import Wallet from 'common/wallets/wallet'
import {fromPrivateKey} from 'LoopringJS/ethereum/account'
import util from 'LoopringJS/common/utils'
import {toBuffer} from "LoopringJS/common/formatter";

export default class MockWallet extends Wallet {


  constructor(key) {
    super();
    this.wallet = fromPrivateKey(key);
    this.walletType='mock'
  }

  getLanguage() {
    return new Promise((resolve) => {
      resolve({result: 'zh-CN'})
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
      resolve({result: this.wallet.getAddress()})
    })
  }

  signMessage(message) {

    const hash = util.hashPersonalMessage(toBuffer(message));
    return new Promise((resolve) => {
      const sig = this.wallet.sign(hash);
      resolve({result: sig})
    })
  }

  signTx(tx) {

    const {chainId, data, gasPrice, gasLimit} = tx;
    tx.chainId = chainId || 1;
    tx.data = data || '0x';
    tx.gasPrice = gasPrice || '0x2540be400';
    tx.gasLimit = gasLimit || '0x249f0';
    return new Promise((resolve) => {
      const sig = this.wallet.signEthereumTx(tx);
      resolve({result: sig})
    })
  }
}
