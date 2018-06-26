import React from 'react'
import {connect} from 'react-redux'
import {toFixed, getDisplaySymbol} from 'LoopringJS/common/formatter'
import {calculateWorthInLegalCurrency} from '../orders/formatters'

class Worth extends React.Component {
  render() {
    const {amount=0,symbol,marketcap}= this.props
    const {currency}= this.props
    if(!symbol) return null
    let worth = calculateWorthInLegalCurrency(marketcap.items,symbol,amount)
    let currencySymbol = getDisplaySymbol(currency)
    return `${currencySymbol}${toFixed(worth, 2)}`
  }
}
export default connect(({settings,sockets})=>({
  currency:settings.preference.currency,
  marketcap:sockets.marketcap
}))(Worth)
