import React from 'react';
import { connect } from 'dva';
import { Tabs,Slider,Icon } from 'antd-mobile';
import intl from 'react-intl-universal';
import HelperOfDepth from './HelperOfDepth'
import {toBig} from 'LoopringJS/common/formatter'
import {getTokensByMarket} from 'modules/formatter/common'

function HelperOfAmount(props) {
  const tabs = [
    { title: <div className="text-center">Balance</div> },
    { title: <div className="text-center">Depth</div> },
  ]
  const {pair,side,amountInput,priceInput,amountPercentage,amountSlider,amountSliderSelected, dispatch} = props
  const tokens = getTokensByMarket(pair)
  //TODO mock balance
  const tokenR = toBig(123)
  let availableAmount = toBig(0)
  if(side === 'sell') {
    availableAmount = tokenR
  } else {
    availableAmount = tokenR.div(priceInput)
  }

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
    <div className="tabs-no-border">
      <div hidden className="pt15 pb15 fs18 color-black-1 zb-b-b text-center">Amount Helper</div>
      <Tabs tabs={tabs}
        tabBarActiveTextColor={"#000"}
        tabBarInactiveTextColor={"rgba(0,0,0,0.35)"}
        swipeable={false}
        initialPage={0}
        onChange={(tab, index) => { console.log('onChange', index, tab); }}
        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
      >
        <div className="bg-grey-100 pt15 pb15">
          <div className="row pt10 pb10 ml0 mr0 zb-b-b">
            <div className="col color-black-1 text-left pl10" onClick={amountPercentageSelect.bind(this, 100)}>
              <span className="d-inline-block" style={{width:'50px'}}>100%</span>
              <span className="color-black-3 ml25">{`${availableAmount.toString(10)} ${side === 'sell' ? tokens.left : tokens.right}`}</span>
            </div>
            {amountPercentage === 100 && <div className="col-auto"><Icon type="check-circle-o" /></div>}
          </div>
          <div className="row pt10 pb10 ml0 mr0 zb-b-b">
            <div className="col color-black-1 text-left pl10" onClick={amountPercentageSelect.bind(this, 75)}>
              <span className="d-inline-block" style={{width:'50px'}}>75%</span>
              <span className="color-black-3 ml25">{`${availableAmount.times(0.75).toString(10)} ${side === 'sell' ? tokens.left : tokens.right}`}</span>
            </div>
            {amountPercentage === 75 && <div className="col-auto"><Icon type="check-circle-o" /></div>}
          </div>
          <div className="row pt10 pb10 ml0 mr0 zb-b-b">
            <div className="col color-black-1 text-left pl10" onClick={amountPercentageSelect.bind(this, 50)}>
              <span className="d-inline-block" style={{width:'50px'}}>50%</span>
              <span className="color-black-3 ml25">{`${availableAmount.times(0.5).toString(10)} ${side === 'sell' ? tokens.left : tokens.right}`}</span>
            </div>
            {amountPercentage === 50 && <div className="col-auto"><Icon type="check-circle-o" /></div>}
          </div>
          <div className="row pt15 pb15 ml0 mr0 zb-b-b">
            <div className="col color-black-1 text-left pl10" onClick={amountPercentageSelect.bind(this, 25)}>
              <span className="d-inline-block" style={{width:'50px'}}>25%</span>
              <span className="color-black-3 ml25">{`${availableAmount.times(0.25).toString(10)} ${side === 'sell' ? tokens.left : tokens.right}`}C</span>
            </div>
            {amountPercentage === 25 && <div className="col-auto"><Icon type="check-circle-o" /></div>}
          </div>
          <div className="row pt15 pb15 ml0 mr0">
            <div className="col color-black-1 text-left pl10">
              <span className="ml5">{amountSlider}%</span>
              <span className="color-black-3 ml25">{`${availableAmount.times(amountSlider).div(100).toString(10)} ${side === 'sell' ? tokens.left : tokens.right}`}</span>
            </div>
            {amountSliderSelected && <div className="col-auto"><Icon type="check-circle-o" /></div>}
          </div>
          <div className="mt15 pb25">
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
        <div className="zb-b-t bg-grey-100" style={{maxHeight:'45vh',overflow:'auto'}}>
          <HelperOfDepth />
        </div>
      </Tabs>
    </div>
  )
}
export default connect(({
  placeOrder:{pair,side,amountInput,priceInput},
  placeOrderHelper:{amountPercentage, amountSlider,amountSliderSelected}
})=>({
  pair,side,amountInput,priceInput,amountPercentage,amountSlider,amountSliderSelected
}))(HelperOfAmount)



