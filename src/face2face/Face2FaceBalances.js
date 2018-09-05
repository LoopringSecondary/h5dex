import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd-mobile';
import routeActions from 'common/utils/routeActions'
import {getTokensByMarket} from 'modules/formatter/common'
import * as tokenFormatter from 'modules/tokens/TokenFm'
import {FormatAmount} from 'modules/formatter/FormatNumber'
import {toNumber,toBig,toFixed} from "LoopringJS/common/formatter";

const HelperOfBalance = (props)=>{
  const {dispatch,tokenS,tokenB,balance} = props
  const showLayer = (payload={})=>{
    dispatch({
      type:'layers/showLayer',
      payload:{
        ...payload
      }
    })
  }
  const relatedTokens = new Array()
  const balanceS = {
    symbol:tokenS,
    name:tokenS,
    ...tokenFormatter.getBalanceBySymbol({balances:balance, symbol:tokenS, toUnit:true}),
  }
  const balanceB = {
    symbol:tokenB,
    name:tokenB,
    ...tokenFormatter.getBalanceBySymbol({balances:balance, symbol:tokenB, toUnit:true})
  }
  relatedTokens.push(balanceS)
  relatedTokens.push(balanceB)
  if(tokenS === 'WETH' || tokenB === 'WETH') {
    relatedTokens.push({
      symbol:'ETH',
      name:'ETH',
      ...tokenFormatter.getBalanceBySymbol({balances:balance, symbol:'ETH', toUnit:true})
    })
  }
  const gotoReceive = (payload)=>{
    showLayer({id:'receiveToken'})
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
            <th className="text-left zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Token</th>
            <th className="text-right zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Balance</th>
            <th className="text-center zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Actions</th>
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
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-right">{toFixed(token.balance, 8)}</td>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-center">
                    {
                      false && token.symbol === 'ETH' &&
                      <a onClick={gotoConvert.bind(this,{type:"eth2weth"})}>Convert</a>
                    }
                    {
                      token.symbol === 'WETH' &&
                      <a onClick={gotoConvert.bind(this,{type:"weth2eth"})}>Convert</a>
                    }
                    {
                      token.symbol !== 'WETH' &&
                      <a onClick={gotoReceive.bind(this,{symbol:token.symbol})}>Receive</a>
                    }
                  </td>
                </tr>
              )
            }
        </tbody>
      </table>
      <div hidden className="p10 mb15">
        <Button onClick={gotoAll} type="" size="small" style={{height:"36px",lineHeight:'36px'}}className="d-block w-100 fs14 bg-none">View all assets</Button>
      </div>
    </div>
  )
}
export default connect(({
  p2pOrder:{tokenS,tokenB},
  sockets,
})=>({
  tokenS,tokenB,balance:sockets.balance.items
}))(HelperOfBalance)





