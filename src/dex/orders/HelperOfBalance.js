import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd-mobile';
import routeActions from 'common/utils/routeActions'
import {getTokensByMarket} from 'modules/formatter/common'
import * as tokenFormatter from 'modules/tokens/TokenFm'
import {FormatAmount} from 'modules/formatter/FormatNumber'
import {toNumber,toBig,toFixed} from "LoopringJS/common/formatter";
import intl from 'react-intl-universal'

const HelperOfBalance = (props)=>{
  const {dispatch,pair,balance} = props
  const marketTokens = getTokensByMarket(pair)
  const showLayer = (payload={})=>{
    dispatch({
      type:'layers/showLayer',
      payload:{
        ...payload
      }
    })
  }
  const tokens = getTokensByMarket(pair)
  const relatedTokens = new Array()
  const balanceL = {
    symbol:tokens.left,
    name:tokens.left,
    ...tokenFormatter.getBalanceBySymbol({balances:balance, symbol:tokens.left, toUnit:true}),
  }
  const balanceR = {
    symbol:tokens.right,
    name:tokens.right,
    ...tokenFormatter.getBalanceBySymbol({balances:balance, symbol:tokens.right, toUnit:true})
  }
  relatedTokens.push(balanceL)
  relatedTokens.push(balanceR)
  if(tokens.right === 'WETH') {
    relatedTokens.push({
      symbol:'ETH',
      name:'ETH',
      ...tokenFormatter.getBalanceBySymbol({balances:balance, symbol:'ETH', toUnit:true})
    })
  }
  const gotoReceive = (payload)=>{
    showLayer({id:'receiveToken',...payload})
  }
  const gotoConvert = (payload)=>{
    routeActions.gotoPath('/dex/convert')
  }
  const gotoAll = (payload)=>{
    // TODO
    // routeActions.gotoPath('/dex/convert')
  }

  return (
    <div className="fs20">
      <table className="w-100 fs13">
        <thead>
          <tr className="">
            <th className="text-left zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">{intl.get('common.token')}</th>
            <th className="text-left zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">{intl.get('common.balance')}</th>
            <th className="text-left zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">{intl.get('helper_of_market_order.selling')}</th>
            <th className="text-center zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">{intl.get('common.actions')}</th>
          </tr>
        </thead>
        <tbody>
            {
              relatedTokens.map((token,index)=>
                <tr key={index} onClick={()=>{}}>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left">
                    {token.symbol}
                    <span hidden className="color-black-3 ml5">{token.name}</span>
                  </td>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left">{toFixed(token.balance, 8)}</td>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left">0.00</td>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-center">
                    {
                      false && token.symbol === 'ETH' &&
                      <a onClick={gotoConvert.bind(this,{type:"eth2weth"})}>{intl.get('common.convert')}</a>
                    }
                    {
                      token.symbol === 'WETH' &&
                      <a onClick={gotoConvert.bind(this,{type:"weth2eth"})}>{intl.get('common.convert')}</a>
                    }
                    {
                      token.symbol !== 'WETH' &&
                      <a onClick={gotoReceive.bind(this,{symbol:token.symbol})}>{intl.get('common.receive')}</a>
                    }
                  </td>
                </tr>
              )
            }
        </tbody>
      </table>
      <div className="p10 mb15">
        <Button onClick={gotoAll} type="" size="small" style={{height:"36px",lineHeight:'36px'}} className="d-block w-100 fs13 bg-none color-black-2">{intl.get("actions.all_assets")}</Button>
      </div>
    </div>
  )
}
export default connect(({
  placeOrder:{pair},
  sockets,
})=>({
  pair,balance:sockets.balance.items
}))(HelperOfBalance)





