import React from 'react';
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
import * as uiFormatter from 'modules/formatter/common'
import * as fm from 'LoopringJS/common/formatter'
import QRCode from 'qrcode.react';
import Alert from 'LoopringUI/components/Alert'

import {DepthList} from './PlaceOrderAmountHelper'

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
  const tabs = [
    { title: <Badge >Qucik</Badge> },
    { title: <Badge >Market Depth</Badge> },
  ];
  return (
    <div className="">
      <div className="pt15 pb15 fs24 color-black-1 zb-b-b">Price Helper</div>
      <div className="">
        <div className="row pt15 pb15 ml0 mr0 zb-b-b align-items-center">
          <div className="col color-black-1 text-left pl10">
            Current Price
          </div>
          <div className="col-auto color-black-2">
            <span className="color-black-4 mr5">￥8.96</span>0.0001650 ETH
          </div>
        </div>
        <div className="row pt15 pb15 ml0 mr0 zb-b-b align-items-center">
          <div className="col color-black-1 text-left pl10">
            Last Price
          </div>
          <div className="col-auto color-black-2">
            <span className="color-black-4 mr5">￥8.52</span>0.0001500 ETH
          </div>
        </div>
        <DepthList />
      </div>
    </div>
  )
}
export default PlaceOrderPriceHelper
