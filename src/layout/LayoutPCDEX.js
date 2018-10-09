import React from 'react'
import { Link, Redirect, Route, Switch } from 'dva/router'
import routeActions from 'common/utils/routeActions'
import intl from 'react-intl-universal'
import { TabBar, NavBar, Icon } from 'antd-mobile'
import { Icon as WebIcon } from 'antd'
import { connect } from 'dva'
import {toBig,toNumber} from '../common/loopringjs/src/common/formatter'
import TokenFormatter, { getBalanceBySymbol } from '../modules/tokens/TokenFm'

class DexHomeLayout extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {balance, txs, allocates} = this.props
    const url = routeActions.match.getUrl(this.props)
    const pathname = routeActions.location.getPathname(this.props)
    const changeTab = (path) => {
      routeActions.gotoPath(`/dex/${path}`)
    }
    const isActive = (path) => {
      return pathname.indexOf(path) > -1
    }
    let todos = 0
    const lrcFee  = allocates['frozenLrcFee'] || 0 ;
    const symbols = Object.keys(allocates)
    if(balance.items.length !== 0){
      symbols.forEach((symbol, index) => {
        if(symbol.toLocaleLowerCase() !== "frozenlrcfee"){
          const value = allocates[symbol]
          console.log(allocates)
          const assets = getBalanceBySymbol({balances: balance.items, symbol: symbol})
          let selling = toBig(value)
          if (symbol.toUpperCase() === 'LRC') {
            selling = selling.plus(toBig(lrcFee))
          }
          if (selling.gt(assets.balance)) {
            todos = todos + 1
          }
          let allowance = assets.allowance
          if (selling.gt(allowance)) {
            todos = todos + 1
          }
        }
      })
    }

    todos = todos + txs.filter(tx => tx.type.toLowerCase() === 'convert_income').length

    return (
      <div style={{}}>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    balance: state.sockets.balance,
    txs: state.sockets.pendingTx.items,
    allocates: state.sockets.orderAllocateChange.items,
  }
}

export default connect(mapStateToProps)(DexHomeLayout)


