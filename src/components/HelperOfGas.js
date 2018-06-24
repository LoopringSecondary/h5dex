import React from 'react';
import { connect } from 'dva';
import { Tabs,Slider,Icon } from 'antd-mobile';
import { Icon as WebIcon } from 'antd';
import intl from 'react-intl-universal';
import {toBig, toFixed} from 'LoopringJS/common/formatter'
import {getTokensByMarket} from 'modules/formatter/common'
import config from 'common/config'
import * as tokenFormatter from 'modules/tokens/TokenFm'
import * as orderFormatter from 'modules/orders/formatters'

function HelperOfGas(props) {
  const tabs = [
    { title: <div className="text-center">Balance</div> },
    { title: <div className="text-center">Depth</div> },
  ]
  const {pair,side,amountInput,priceInput,amountPercentage,amountSlider,amountSliderSelected,balance,dispatch} = props
  const tokens = getTokensByMarket(pair)
  const balanceL = tokenFormatter.getBalanceBySymbol({balances:balance, symbol:tokens.left, toUnit:true})
  const balanceR = tokenFormatter.getBalanceBySymbol({balances:balance, symbol:tokens.right, toUnit:true})
  const right = config.getTokenBySymbol(pair.split('-')[1].toUpperCase())
  const marketConfig = config.getMarketBySymbol(tokens.left, tokens.right)
  const amountPrecision = Math.max(0, right.precision - marketConfig.pricePrecision)
  let availableAmount = toBig(orderFormatter.calculateAvailableAmount(side, priceInput, balanceL, balanceR, amountPrecision))

  const amountSliderChange = (amountPercentage) => {
    dispatch({type:'placeOrderHelper/amountSliderEffects', payload:{percentage:amountPercentage}})
    const amount = availableAmount.times(amountPercentage).div(100).toString(10)
    dispatch({type:'placeOrder/amountChange', payload:{amountInput:amount}})
  }
  const amountPercentageSelect = (percentage) => {
    dispatch({type:'placeOrderHelper/amountPercentageEffects', payload:{percentage}})
    const amount = availableAmount.times(percentage).div(100).toString(10)
    dispatch({type:'placeOrder/amountChange', payload:{amountInput:amount}})
  }
  return (
    <div className="">
      <div className="pt15 pb15 fs18 color-black-1 zb-b-b text-center">Set Gas</div>
      <div className="bg-grey-100">
        <div className="row pt15 pb15 ml0 mr0 zb-b-b">
          <div className="col color-black-1 text-left pl10" onClick={()=>{}}>
            <span className="d-inline-block">推荐Gas</span>
            <span className="color-black-3 ml25">0.0005ETH ≈ $1.5</span>
          </div>
        </div>
        <div className="pt15 pb35">
          <div className="color-black-1 pl10 pb25 text-left">
            自定义Gas
            <span className="color-black-3 ml25">0.0005ETH ≈ $1.5</span>
          </div>
          <Slider
            className="ml15 mr15"
            defaultValue={0}
            min={0}
            max={100}
            onChange={amountSliderChange}
            onAfterChange={()=>{}}
          />
        </div>
      </div>
    </div>
  )
}
export default connect(({
  placeOrder:{pair,side,amountInput,priceInput},
  placeOrderHelper:{amountPercentage, amountSlider,amountSliderSelected},
  sockets,
})=>({
  pair,side,amountInput,priceInput,amountPercentage,amountSlider,amountSliderSelected,balance:sockets.balance.items
}))(HelperOfGas)



