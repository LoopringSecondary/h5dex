import {getTokensByMarket} from 'modules/formatter/common'

export const getMarketTickersBySymbol = (symbol,tickers)=>{
  return tickers.filter(ticker=>{
    const tokens = getTokensByMarket(ticker.market)
    return tokens.right === symbol
  })
}
