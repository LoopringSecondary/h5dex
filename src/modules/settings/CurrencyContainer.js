import React from 'react'
import {connect} from 'react-redux'
class CurrencyContainer extends React.Component {
  shouldComponentUpdate(nextProps){
    return nextProps.currency !== this.props.currency;
  }
  render() {
    const {amount,currency,token}= this.props
    let currencySymbol
    if(currency === 'USD'){
      currencySymbol = '$'
    }
    if(currency === 'CNY'){
      currencySymbol = '$'
    }
    return currencySymbol
  }
}

export default connect(({settings,sockets})=>({
  currency:settings.preference.currency,
  marketcap:sockets.marketcap
}))(CurrencyContainer)
