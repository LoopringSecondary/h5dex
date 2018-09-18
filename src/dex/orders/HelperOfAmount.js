import React from 'react';
import { connect } from 'dva';
import { Tabs,Slider,Icon,NavBar } from 'antd-mobile';
import { Icon as WebIcon } from 'antd';
import intl from 'react-intl-universal';
import HelperOfDepth from './HelperOfDepth'
import {toBig, toFixed} from 'LoopringJS/common/formatter'
import {getTokensByMarket} from 'modules/formatter/common'
import config from 'common/config'
import * as tokenFormatter from 'modules/tokens/TokenFm'
import * as orderFormatter from 'modules/orders/formatters'

const FaqOfAmount = ()=>{
  return (
    <div className="text-left bg-white-light">
      <div className="zb-b-b p15">
        <div className="fs14 color-black-1 mb5">钱包余额不足也可以下下单</div>
        <div className="fs12 color-black-2 lh20">
          1. 支持先下单，之后向钱包转入资产<br />
          2. 钱包余额不足时，关联的订单会自动失效<br />
          2. 钱包转入余额后，关联的订单会自动生效<br />
        </div>
      </div>
      <div className="zb-b-b p15">
        <div className="fs14 color-black-1 mb5">下单后不冻结钱包的余额</div>
        <div className="fs12 color-black-2 lh20">
          1. 钱包的余额的在下单后也可以随时转出<br />
          2. 钱包的余额转出后，关联的订单会自动失效<br />
        </div>
      </div>

    </div>
  )
}
function HelperOfAmount(props) {
  const tabs = [
    { title: <div className="text-center">{intl.get("common.balance")}</div> },
    { title: <div className="text-center">{intl.get("common.help")}</div> },
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
  const hideLayer = (payload = {}) => {
    dispatch({
      type: 'layers/hideLayer',
      payload: {
        ...payload
      }
    })
  }

  const Content = () => {
    if(availableAmount.gt(0)) {
      const prefix = side === 'buy' ? `${toFixed(balanceR.balance, right.precision)}${tokens.right} ≈ ` : ''
      return (
        <Tabs tabs={tabs}
              swipeable={false}
              initialPage={0}
              onChange={(tab, index) => { console.log('onChange', index, tab); }}
              onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div className="bg-white-light pb15">
            <div className="divider 1px zb-b-b mb15"></div>
            <div className="row pt10 pb10 ml0 mr0 zb-b-b">
              <div className="col color-black-1 text-left pl20" onClick={amountPercentageSelect.bind(this, 100)}>
                <span className="d-inline-block" style={{width:'50px'}}>100%</span>
                <span className="color-black-3 ml25">{`${prefix} ${availableAmount.toString(10)}${tokens.left}`}</span>
              </div>
              {!amountSliderSelected && amountPercentage === 100 && <div className="col-auto fs18 color-black-1"><WebIcon type="check-circle-o" /></div>}
            </div>
            <div className="row pt10 pb10 ml0 mr0 zb-b-b">
              <div className="col color-black-1 text-left pl20" onClick={amountPercentageSelect.bind(this, 75)}>
                <span className="d-inline-block" style={{width:'50px'}}>75%</span>
                <span className="color-black-3 ml25">{`${prefix} ${availableAmount.times(0.75).toString(10)}${tokens.left}`}</span>
              </div>
              {!amountSliderSelected && amountPercentage === 75 && <div className="col-auto fs18 color-black-1"><WebIcon type="check-circle-o" /></div>}
            </div>
            <div className="row pt10 pb10 ml0 mr0 zb-b-b">
              <div className="col color-black-1 text-left pl20" onClick={amountPercentageSelect.bind(this, 50)}>
                <span className="d-inline-block" style={{width:'50px'}}>50%</span>
                <span className="color-black-3 ml25">{`${prefix} ${availableAmount.times(0.5).toString(10)}${tokens.left}`}</span>
              </div>
              {!amountSliderSelected && amountPercentage === 50 && <div className="col-auto fs18 color-black-1"><WebIcon type="check-circle-o" /></div>}
            </div>
            <div className="row pt15 pb15 ml0 mr0 zb-b-b">
              <div className="col color-black-1 text-left pl20" onClick={amountPercentageSelect.bind(this, 25)}>
                <span className="d-inline-block" style={{width:'50px'}}>25%</span>
                <span className="color-black-3 ml25">{`${prefix} ${availableAmount.times(0.25).toString(10)}${tokens.left}`}</span>
              </div>
              {!amountSliderSelected && amountPercentage === 25 && <div className="col-auto fs18 color-black-1"><WebIcon type="check-circle-o" /></div>}
            </div>
            {false && <div>
              <div className="row pt15 pb15 ml0 mr0">
                <div className="col color-black-1 text-left pl20">
                  <span className="ml5">{amountSlider}%</span>
                  <span className="color-black-3 ml25">{`${prefix} ${availableAmount.times(amountSlider).div(100).toString(10)}${tokens.left}`}</span>
                </div>
                {amountSliderSelected && <div className="col-auto fs18 color-black-1"><WebIcon type="check-circle-o" /></div>}
              </div>
              <div className="mt15 pb25 pl25 pr20">
                <Slider
                  className=""
                  defaultValue={10}
                  min={0}
                  max={100}
                  onChange={amountSliderChange}
                  onAfterChange={()=>{}}
                />
              </div>
            </div>}
          </div>
          <div className="" style={{maxHeight:'45vh',overflow:'auto'}}>
            <div className="divider 1px zb-b-b"></div>
            <FaqOfAmount />
          </div>
        </Tabs>
      )
    } else {
      return (
        <div className="bg-white-light" style={{maxHeight:'45vh',overflow:'auto'}}>
          <FaqOfAmount />
        </div>
      )
    }
  }

  return (
    <div className="tabs-no-border bg-white-light">
      <NavBar
        className="bg-white"
        mode="light"
        onLeftClick={() => hideLayer({id:'helperOfAmount'})}
        leftContent={[
          <span key='1' className=""><Icon type="cross"/></span>,
        ]}
        rightContent={null && [
          <span key='1' onClick={()=>window.Toast.info('请点击价格或数量', 1, null, false)} className=""><WebIcon type="question-circle-o"/></span>,
        ]}
      >
        <div className="color-black">{intl.get('common.amount')}{intl.get('common.helper')}</div>
      </NavBar>
      <div className="divider 1px zb-b-t"></div>
      <Content />
    </div>
  )
}
export default connect(({
  placeOrder:{pair,side,amountInput,priceInput},
  placeOrderHelper:{amountPercentage, amountSlider,amountSliderSelected},
  sockets,
})=>({
  pair,side,amountInput,priceInput,amountPercentage,amountSlider,amountSliderSelected,balance:sockets.balance.items
}))(HelperOfAmount)



