import React from 'react'
import { connect } from 'dva'
import { NavBar, Slider } from 'antd-mobile'
import { Icon as WebIcon } from 'antd'
import { toNumber } from 'LoopringJS/common/formatter'
import Worth from 'modules/settings/Worth'
import { calculateGas } from 'LoopringJS/common/utils'
import intl from 'react-intl-universal'

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
    return <div>{`${title} ${intl.get('gas_setting.none')}`}</div>
  }
  const hideLayer = (payload = {}) => {
    dispatch({
      type: 'layers/hideLayer',
      payload: {
        ...payload
      }
    })
  }
  return (
    <div className="bg-white">
      <NavBar
        className="zb-b-b bg-white"
        mode="light"
        onLeftClick={()=>hideLayer({id:'helperOfGas'})}
        leftContent={[
          <span key='1' className=""><WebIcon type="close"/></span>,
        ]}
        rightContent={null && [
          <WebIcon key="1" type="question-circle-o"/>,
        ]}
      >
        <div className="color-black">{intl.get('gas_setting.title')}</div>
      </NavBar>
      <div className="divider 1px zb-b-t"></div>
      <div className="bg-white">
        <div className="row p15 ml0 mr0 zb-b-b">
          <div className="col color-black-1 text-left pl25" onClick={tabChanged.bind(this, 'estimate')}>
            {gasShow(gasPriceStore.estimate, intl.get('gas_setting.mode_easy_title'))}
          </div>
          {gas.tabSelected === 'estimate' && <div className="col-auto fs18 color-black-1"><WebIcon type="check-circle-o" /></div>}
        </div>
        <div className="p15 pb35" onClick={tabChanged.bind(this, 'custom')}>
          <div className="color-black-1 pl25 pb25 text-left">
            {gasShow(gasPriceStore.current, intl.get('gas_setting.gas_selector_custom'))}
          </div>
          <Slider
            className="ml25 mr25"
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
export default connect(({gas,})=>({gas}))(HelperOfGas)



