import React from 'react';
import { connect } from 'dva';
import { Tabs,Slider,Icon } from 'antd-mobile';
import { Icon as WebIcon } from 'antd';
import intl from 'react-intl-universal';
import {toBig, toNumber, toFixed} from 'LoopringJS/common/formatter'
import {getTokensByMarket} from 'modules/formatter/common'
import Worth from 'modules/settings/Worth'
import {calculateGas} from 'LoopringJS/common/utils'

function HelperOfGas(props) {
  const tabs = [
    { title: <div className="text-center">Balance</div> },
    { title: <div className="text-center">Depth</div> },
  ]
  const {gas,helperOfGas,dispatch} = props
  const {gasLimit} = helperOfGas
  const gasPriceStore = gas.gasPrice

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

  const gasShow = (gasPrice, title) => {
    if(gasPrice && gasLimit) {
      const gas = calculateGas(gasPrice, gasLimit);
      return (
        <div>
          <div className="">
            <span className="mr10">{title}</span>
            {`${gas.toString(10)} ETH`} ≈ <Worth amount={gas} symbol="ETH"/>
          </div>
          <div className="fs14 color-black-3">{`Gas(${toNumber(gasLimit)}) * Gas Price(${gasPrice} Gwei)`}</div>
        </div>
      )
    }
    return <div>{`${title} 无`}</div>
  }

  return (
    <div className="">
      <div className="pt10 pb10 fs18 color-black-1 zb-b-b text-center">Set Gas</div>
      <div className="bg-grey-100">
        <div className="row p15 ml0 mr0 zb-b-b">
          <div className="col color-black-1 text-left pl15" onClick={tabChanged.bind(this, 'estimate')}>
            {gasShow(gasPriceStore.estimate, '推荐Gas')}
          </div>
          {gas.tabSelected === 'estimate' && <div className="col-auto fs18 color-black-1"><WebIcon type="check-circle-o" /></div>}
        </div>
        <div className="p15 pb35" onClick={tabChanged.bind(this, 'custom')}>
          <div className="color-black-1 pl15 pb25 text-left">
            {gasShow(gasPriceStore.current, '自定义Gas')}
          </div>
          <Slider
            className="ml15 mr10"
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



