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
  const {gas,dispatch} = props
  const gasPriceStore = gas.gasPrice
  console.log(11111, props)

  const tabChanged = (tab) => {
    switch(tab) {
      case 'estimate':
        dispatch({type:'gas/tabChange', payload:{'tabSelected':'estimate'}})
        break;
      case 'custom':
        dispatch({type:'gas/tabChange', payload:{'tabSelected':'custom'}})
        break;
    }
  }

  const sliderChanged = (value) => {
    dispatch({type:'gas/tabChange', payload:{'tabSelected':'custom'}})
    dispatch({type:'gas/currentGasChange', payload:{'gasPrice':value}})
  }
  return (
    <div className="">
      <div className="pt15 pb15 fs18 color-black-1 zb-b-b text-center">Set Gas</div>
      <div className="bg-grey-100">
        <div className="row pt15 pb15 ml0 mr0 zb-b-b">
          <div className="col color-black-1 text-left pl10" onClick={tabChanged.bind(this, 'estimate')}>
            <span className="d-inline-block">推荐Gas</span>
            <span className="color-black-3 ml25">{gasPriceStore.estimate}ETH ≈ $1.5</span>
          </div>
          {gas.tabSelected === 'estimate' && <div className="col-auto fs18 color-black-1"><WebIcon type="check-circle-o" /></div>}
        </div>
        <div className="pt15 pb35" onClick={tabChanged.bind(this, 'custom')}>
          <div className="color-black-1 pl10 pb25 text-left">
            自定义Gas
            <span className="color-black-3 ml25">{gasPriceStore.current}ETH ≈ $1.5</span>
          </div>
          <Slider
            className="ml15 mr15"
            defaultValue={gasPriceStore.current}
            min={1}
            max={100}
            onChange={sliderChanged}
            onAfterChange={()=>{}}
          />
        </div>
      </div>
    </div>
  )
}
export default connect(({
  gas,
})=>({
  gas
}))(HelperOfGas)



