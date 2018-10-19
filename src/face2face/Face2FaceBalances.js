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
  const {dispatch,tokenS,tokenB,balance} = props
  const showLayer = (payload={})=>{
    dispatch({
      type:'layers/showLayer',
      payload:{
        ...payload
      }
    })
  }
  const relatedTokens = []
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
  const gotoReceive = ({symbol})=>{
    showLayer({id:'receiveToken',symbol})
  }
  const gotoConvert = ({type})=>{
    routeActions.gotoPath(`/dex/convert/${type}`)
  }
  const gotoAll = (payload)=>{
  }

  return (
    <div className="fs20">
      <table className="w-100 fs13">
        <thead>
          <tr className="">
            <th className="text-center zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">{intl.get('common.token')}</th>
            <th className="text-center zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">{intl.get('common.balance')}</th>
            <th className="text-center zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">{intl.get('common.actions')}</th>
          </tr>
        </thead>
        <tbody>
            {
              relatedTokens.map((token,index)=>
                <tr key={index}>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-center">
                    {token.symbol}
                    <span hidden className="color-black-3 ml5">{token.name}</span>
                  </td>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-center">{toFixed(token.balance, 8)}</td>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-center">
                    {
                      token.symbol === 'WETH' &&
                      <a onClick={gotoConvert.bind(this,{type:"ETH"})}>{intl.get('common.convert')}</a>
                    }
                    {
                      token.symbol !== 'WETH' &&
                      <a onClick={(e) => {e.stopPropagation();gotoReceive({symbol:token.symbol})}}>{intl.get('token.action_types.receive',{token:token.symbol})}</a>
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





