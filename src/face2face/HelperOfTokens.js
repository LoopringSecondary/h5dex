import React from 'react';
import { Modal,List,Button,SearchBar } from 'antd-mobile';
import { connect } from 'dva';
import intl from 'react-intl-universal';
import {sorterBySymbol, getBalanceBySymbol} from 'modules/tokens/TokensFm'
import * as tokenFormatter from 'modules/tokens/TokenFm'

function HelperOfTokens(props) {
  const {helperOfTokens, p2pOrder, tokens, balance, dispatch} = props
  const {side} = helperOfTokens
  const allTokens = tokens.map(item=>{
    const tokenBalance = tokenFormatter.getBalanceBySymbol({balances:balance, symbol:item.symbol, toUnit:true})
    return {...item, ...tokenBalance}
  })
  const filterToken = side === 'buy' ? p2pOrder.tokenS : p2pOrder.tokenB
  const tokensList = [...allTokens].filter(item => item.symbol !== 'ETH' && item.symbol !== 'WETH_OLD' && item.symbol !== filterToken)
  tokensList.sort(sorterBySymbol)

  const hideLayer = (payload={})=>{
    dispatch({
      type:'layers/hideLayer',
      payload:{
        ...payload
      }
    })
  }

  function tokenChange(token) {
    if(side === 'buy') {
      dispatch({type:'p2pOrder/tokenChange', payload:{'tokenB':token}})
    } else {
      dispatch({type:'p2pOrder/tokenChange', payload:{'tokenS':token}})
    }
    hideLayer({id:'helperOfTokens'})
  }

  return (
    <div className="" >
        <SearchBar placeholder="Search" maxLength={8} />
        <div style={{maxHeight:'50vh',overflow:'auto'}}>
          <List className="popup-list">
            {
              tokensList.map((item,index)=>{
                return (
                  <List.Item key={index} arrow="horizontal" extra={`${item.balance.toString(10)} ${item.symbol}`} onClick={tokenChange.bind(this, item.symbol)}>
                  <i className={`mr10 icon icon-${item.symbol}`}></i>
                  {item.symbol}
                  </List.Item>
                )
              })
            }
          </List>
        </div>
    </div>
  )
}
export default connect(({
  sockets,
  face2face,
  p2pOrder,
  tokens
})=>({
 balance:sockets.balance.items,
 tokens:tokens.items,
 p2pOrder:p2pOrder
}))(HelperOfTokens)
