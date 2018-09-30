import React from 'react'
import { Link, Redirect, Route, Switch } from 'dva/router'
import routeActions from 'common/utils/routeActions'
import intl from 'react-intl-universal'
import { TabBar } from 'antd-mobile'
import { connect } from 'dva'
import { toBig } from 'LoopringJS/common/formatter'
import { getBalanceBySymbol } from '../modules/tokens/TokenFm'

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
        <div className="tabbar-only-bar">
          <TabBar
            style={{position: 'fixed', bottom: 0, left: 0, right: 0}}
            className="position-fixed"
          >
            <TabBar.Item
              title={
                <span className={isActive('/dex/markets') ? 'text-primary' : ''}>{intl.get('common.markets')}</span>
              }
              key="markets"
              icon={
                <i className="icon-market color-primary-light-bak"></i>
              }
              selectedIcon={
                <i className="icon-market text-primary"></i>
              }
              selected={isActive('/dex/markets')}
              onPress={() => {
                changeTab('markets')
              }}
            />
            <TabBar.Item
              icon={<i className="icon-trade-m color-primary-light-bak"/>}
              selectedIcon={<i className="icon-trade-m text-primary"/>}
              title={<span
                className={isActive('/dex/placeOrder') ? 'text-primary' : ''}>{intl.get('common.trade')}</span>}
              key="placeOrder"
              selected={isActive('/dex/placeOrder')}
              onPress={() => {
                changeTab('placeOrder')
              }}
            />
            <TabBar.Item
              badge={todos}
              icon={<i className="icon-bell color-primary-light-bak" style={{position: 'relative', top: '2px'}}/>}
              selectedIcon={<i className="icon-bell text-primary" style={{position: 'relative', top: '2px'}}/>}
              title={<span className={isActive('/dex/notifications') ? 'text-primary' : ''}
                           style={{position: 'relative', top: '0px'}}>
                            {false && intl.get('todos.tab_title')}
                            {intl.get('todo_list.todo_list_title')}
                           </span>}
              key="Notifications"
              selected={isActive('/dex/notifications')}
              onPress={() => {
                changeTab('notifications')
              }}
            />
            <TabBar.Item
              icon={<i className="icon-user color-primary-light-bak"/>}
              selectedIcon={<i className="icon-user text-primary"/>}
              title={
                <span
                  className={isActive('/dex/usercenter') ? 'text-primary' : ''}>{intl.get('user_center.tab_title')}</span>
              }
              key="usercenter"
              selected={isActive('/dex/usercenter')}
              onPress={() => {
                changeTab('usercenter')
              }}
            />
          </TabBar>
        </div>
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


