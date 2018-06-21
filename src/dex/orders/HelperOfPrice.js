import React from 'react';
import {connect} from 'dva';
import { Input,Icon } from 'antd';
import { Modal,List,Button,Tabs,Badge,Switch } from 'antd-mobile';
import {toBig, toHex, clearHexPrefix} from 'LoopringJS/common/formatter'
import config from 'common/config'
import intl from 'react-intl-universal';
import * as datas from 'common/config/data'
import eachLimit from 'async/eachLimit';
import * as orderFormatter from 'modules/orders/formatters'
import Notification from 'LoopringUI/components/Notification'
import {createWallet} from 'LoopringJS/ethereum/account';
import {getTokensByMarket} from 'modules/formatter/common'
import * as fm from 'LoopringJS/common/formatter'
import QRCode from 'qrcode.react';
import Alert from 'LoopringUI/components/Alert'

import ListDepth from './ListDepth'

export const MenuItem = (props)=>{
  const { left, right,middle,label,value,extra } = props
  return (
    <div className="row pt15 pb15 ml0 mr0 zb-b-b align-items-center">
      <div className="col color-black-1 text-left pl10">
        {label}
      </div>
      <div className="col-auto color-black-2">
        {value}
      </div>
    </div>
  )
}

const Advance = (
  <div className="row align-items-center ml0 mr0 mb15 mt10">
    <div className="col color-grey-400 fs20 pl0">Advanced</div>
    <div className="col-auto color-black-3 fs16 pr0"><Switch size="" /></div>
  </div>
)

function PlaceOrderPriceHelper(props) {
  const {dispatch,pair} = props
  const tokens = getTokensByMarket(pair)
  const changePrice = (value)=>{
    dispatch({
      type:'placeOrder/priceChange',
      payload:{
        price:value
      }
    })
  }
  const lastPrice = "0.0001500"
  return (
    <div className="tabs-no-border">
      <div hidden className="pt15 pb15 fs18 color-black-1 zb-b-b">Price Helper</div>
      <div className="zb-b-t">
        <div className="row pt15 pb15 ml0 mr0 zb-b-b align-items-center">
          <div className="col color-black-1 text-left pl10">
            Last Price
          </div>
          <div className="col-auto color-black-2" onClick={changePrice.bind(this,lastPrice)}>
            <span className="color-black-4 mr5">￥8.52</span>{lastPrice} {tokens.right}
          </div>
        </div>
        <div className="bg-grey-100" style={{maxHeight:'50vh',overflow:'auto'}}>
          <ListDepth />
        </div>
      </div>
    </div>
  )
}
export default connect(({
  sockets:{trades},
  placeOrder:{pair}
})=>({
  pair,trades
}))(PlaceOrderPriceHelper)
