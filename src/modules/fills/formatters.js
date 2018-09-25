import React from 'react'
import { toBig, toFixed, toNumber } from 'LoopringJS/common/formatter'
import config from 'common/config'
import commonFm from '../formatter/common'
import TokenFm from '../tokens/TokenFm'
import { formatter } from 'modules/formatter/FormatNumber'

export class FillFm{
  constructor(fill={}){
    this.fill = fill
  }
  getRingIndex(){
    return this.fill.ringIndex
  }
  getRingHash(){
    return this.fill.ringHash
  }
  getTxHash(){
    return this.fill.txHash
  }
  getMiner(){
    return this.fill.miner
  }
  getBlockNumber(){
    return this.fill.blockNumber
  }
  getFeeRecipient(){
    return this.fill.feeRecipient
  }
  getTotalLrcFee(){
    return commonFm.getFormatNum(toFixed(toBig(this.fill.lrcFee).div(1e18)),6) + ' LRC'
  }
  getTotalSplitFee(){
    const token =  this.fill.splitS ? this.fill.tokenS : this.fill.tokenB;
    const tokenFm = new TokenFm({symbol:token});
    const split =  this.fill.splitS ? this.fill.splitS : this.fill.splitB;
    return commonFm.getFormatNum(tokenFm.toPricisionFixed(tokenFm.getUnitAmount(split))) + ' '
  }
  getAmount(){
    const fmS = this.fill.side.toLowerCase() === 'buy' ? new TokenFm({symbol: this.fill.tokenB}) : new TokenFm({symbol: this.fill.tokenS});
    const amount = this.fill.side.toLowerCase() === 'buy' ? fmS.getUnitAmount(this.fill.amountB) : fmS.getUnitAmount(this.fill.amountS);
    const symbol = this.fill.side === 'buy' ? this.fill.tokenB : this.fill.tokenS
    // return commonFm.getFormatNum(fmS.toPricisionFixed(amount)) + '' + symbol
    return formatter(toBig(amount), 4).d
  }
  getBuy() {
    const tf = new TokenFm({symbol:this.fill.tokenB})
    return `${tf.toPricisionFixed(tf.getUnitAmount(this.fill.amountB))} ${this.fill.tokenB}`
  }
  getSell() {
    const tf = new TokenFm({symbol:this.fill.tokenS})
    return `${tf.toPricisionFixed(tf.getUnitAmount(this.fill.amountS))} ${this.fill.tokenS}`
  }
  getSide(){
    return this.fill.side
  }
  getTotal(){
    const fmS = this.fill.side.toLowerCase() === 'buy' ? new TokenFm({symbol: this.fill.tokenS}) : new TokenFm({symbol: this.fill.tokenB});
    const amount = this.fill.side.toLowerCase() === 'buy' ? fmS.getUnitAmount(this.fill.amountS) : fmS.getUnitAmount(this.fill.amountB);
    const symbol = this.fill.side === 'buy' ? this.fill.tokenS : this.fill.tokenB
    return commonFm.getFormatNum(fmS.toPricisionFixed(amount))
  }
  getPrice(){
    const tokenB = new TokenFm({symbol:this.fill.tokenB});
    const tokenS = new TokenFm({symbol:this.fill.tokenS});
    const market = config.getMarketByPair(this.fill.market);
    const price = this.fill.side.toLowerCase() === 'buy' ? tokenS.getUnitAmount(this.fill.amountS).div(tokenB.getUnitAmount(this.fill.amountB)) :
      tokenB.getUnitAmount(this.fill.amountB).div(tokenS.getUnitAmount(this.fill.amountS));
    return commonFm.getFormatNum(toFixed(price,market.pricePrecision,true))
  }
  getLRCFee(){
    const fmLrc = new TokenFm({symbol: 'LRC'});
    return commonFm.getFormatNum(fmLrc.toPricisionFixed(fmLrc.getUnitAmount(this.fill.lrcFee))) + ' LRC'
  }
  getLRCReward(){
    const fmLrc = new TokenFm({symbol: 'LRC'});
    return commonFm.getFormatNum(fmLrc.toPricisionFixed(fmLrc.getUnitAmount(this.fill.lrcReward))) + ' LRC'
  }
  getCreateTime(){
    return commonFm.getFormatTime(toNumber(this.fill.createTime) * 1e3,'MM-DD HH:mm')
  }
}

export default {
  FillFm
}
