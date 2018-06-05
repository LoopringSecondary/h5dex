import React from 'react';
import { Input,Icon } from 'antd';
import { Modal,List,Button,Tabs,Badge } from 'antd-mobile';
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
            <span className="color-black-4 mr5 fs14">￥8.96</span>0.0001650 ETH
          </div>
        </div>
        <div className="row pt15 pb15 ml0 mr0 zb-b-b align-items-center">
          <div className="col color-black-1 text-left pl10">
            Last Price
          </div>
          <div className="col-auto color-black-2">
            <span className="color-black-4 mr5 fs14">￥8.52</span>0.0001500 ETH
          </div>
        </div>
        <DepthList />
      </div>

    </div>
  )
}
export default PlaceOrderPriceHelper
