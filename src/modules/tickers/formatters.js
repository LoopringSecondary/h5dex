import intl from 'react-intl-universal'
import {getTokensByMarket} from '../formatter/common'
import storage  from '../storage'
import {toBig,toNumber} from 'LoopringJS/common/formatter'

export class TickersFm{
  constructor(tickers){
    this.tickers = tickers
  }
  getFavoredTickers(){
    return getFavoredTickers(this.tickers)
  }
  getSearchTickers(keyword) {
    return getSearchTickers(this.tickers, keyword)
  }
  getRecentTickers(){
    return getRecentTickers(this.tickers)
  }
  getAllTickers(){
    return getAllTickers(this.tickers)
  }
  getTickersBySymbol(symbol){
    return this.tickers.items.filter(ticker=>ticker.market.indexOf(symbol) > -1)
  }
}
export const sortTickers = (items)=>{
  const new_items =[...items]
  const sorter = (a,b)=>{
    if(a.vol === b.vol ){
      if(a.last === b.last){
        return a.market - b.market
      }else{
        return Number(b.last) - Number(a.last)
      }
    }else{
      return Number(b.vol) - Number(a.vol)
    }
  }
  return new_items.sort(sorter)
}

export const sorterByMarket = (tokenA, tokenB) => {
  if(tokenA.market > tokenB.market){
    return 1;
  } else if (tokenA.market < tokenB.market){
    return -1;
  } else {
    return 0;
  }
};

export const sorterByVolume = (tokenA, tokenB) => {
  if(tokenA.volume > tokenB.volume){
    return 1;
  } else if (tokenA.volume < tokenB.volume){
    return -1;
  } else {
    return 0;
  }
};

export const sorterByPirce = (tokenA, tokenB) => {
  if(tokenA.last > tokenB.last){
    return 1;
  } else if (tokenA.last < tokenB.last){
    return -1;
  } else {
    return 0;
  }
};

export const sorterByChange = (tokenA, tokenB) => {
  const changeA = toNumber(tokenA.change.substring(0, tokenA.change.length-1))
  const changeB = toNumber(tokenB.change.substring(0, tokenB.change.length-1))
  return changeA - changeB
  // if(changeA > changeB){
  //   return 1;
  // } else if (changeA < changeB){
  //   return -1;
  // } else {
  //   return 0;
  // }
};

export const getFavoredTickers = (tickers)=>{
  const {extra,items} = tickers;
  let new_items = [];
  if(extra && extra.favored){
    const {favored} = extra;
     new_items = items.filter(item => !!favored[item.market])
  }

  if(extra.keywords){
    new_items = new_items.filter(item=>item.market.toLowerCase().indexOf(extra.keywords.toLowerCase())> -1 )
  }

  return sortTickers(new_items)
};
export const getSearchTickers = (tickers, keyword)=>{
  const {extra,items} = tickers;
  let new_items = items;

  if(keyword){
    new_items = new_items.filter(item=>item.market.toLowerCase().indexOf(keyword.toLowerCase())> -1 )
  }

  return sortTickers(new_items)
};
export const getRecentTickers = (tickers)=>{
  const {items} = tickers;
  const recentMarkets = storage.markets.getRecent();
  return recentMarkets.map(market => items.find(item => market.toLowerCase() === item.market.toLowerCase()))
}

export const getAllTickers = (tickers)=>{
  const {extra,items} = tickers
  let new_items = [...items]
  if(extra && extra.keywords){
    new_items = new_items.filter(item=>item.market.toLowerCase().indexOf(extra.keywords.toLowerCase())> -1 );
  }

  // if(extra && extra.favored){
  //   const {favored} = extra;
  //   new_items = new_items.filter(item => !favored[item.market])
  // }
  return sortTickers(new_items)
};


export class TickerFm {
  constructor(ticker){
    this.ticker = ticker
  }
  getVol(){
    return getVol(this.ticker.vol)
  }
  getLast(){
    return getPrice(this.ticker.last)
  }
  getHigh(){
    return getPrice(this.ticker.high)
  }
  getLow(){
    return getPrice(this.ticker.low)
  }
  getChangeDirection(){
    return getChangeDirection(this.ticker.change)
  }
  getChange(){
    return getChange(this.ticker.change)
  }
  getTokens(){
    return getTokensByMarket(this.ticker.market || 'LRC-WETH') //TODO
  }
  getExchange(){
    return this.ticker.exchange
  }
}

export const getVol = (value)=>{
  value = Number(value)
  if(value>1000){
    return value.toFixed(0)
  }
  if(value<=1000 && value>=100){
    return value.toFixed(1)
  }
  if(value<=100 && value>=1){
    return value.toFixed(2)
  }
  if(value<1 && value>=0.001){
    return value.toFixed(5)
  }
  if(value<0.001 & value>0){
    return value.toFixed(8)
  }
  if(value===0){
    return '0.00'
  }
  if(!!value){
    return '0.00'
  }
}

export const getPrice = (value)=>{

  value = Number(value)
  switch (true) {
    case value>1000:
      value = value.toFixed(2)
      break;
    case value<=1000 && value>=1:
      value = value.toFixed(2)
      break;
    case value<1 && value>=0.01:
      value = value.toFixed(5)
      break;
    case value<0.01 && value>0:
      value = value.toFixed(8)
      break;
    default:
      value = '0.00'
      break;
  }
  return value
}
export const getChange = (change)=>{
  if(!change){
    return '0.00%'
  }else{
    return change
  }
}
export const getChangeDirection = (change)=>{
  if(!change){
    change = '0.00%'
  }
  change = change.replace('%','')
  if(Number(change)>0){
    return 'up'
  }
  if(Number(change)<0){
    return 'down'
  }
  if(Number(change) == 0){
    return 'none'
  }
}



