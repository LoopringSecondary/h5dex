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
          <div className="col color-black-1 text-left">
            Last Price
          </div>
          <div className="col-auto color-black-2">
            <span className="color-black-4 mr5">￥8.52</span>0.0001500 ETH
          </div>
        </div>
      </div>
      <table className="w-100">
        <thead>
          <tr className="">
            <th className="text-left bg-grey-100 pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Amount</th>
            <th className="text-right bg-grey-100 pl10 pr5 pt5 pb5 font-weight-normal color-black-3">Buy</th>
            <th className="text-left bg-grey-100 pl5 pr10 pt5 pb5 font-weight-normal color-black-3">Sell</th>
            <th className="text-right bg-grey-100 pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Amount</th>
          </tr>
        </thead>
        <tbody>
            {
              [1,2,3,4,5].map((item,index)=>
                <tr key={index}>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left align-middle">
                    1000.00
                  </td>
                  <td className="pl10 pr5 pt10 pb10 zb-b-b text-right text-up align-middle">
                    0.0001500
                    <div className="fs12 color-black-4 mr5">￥8.52</div>
                  </td>
                  <td className="pl5 pr10 pt10 pb10 zb-b-b text-left text-down align-middle">
                    0.0001500
                    <div className="fs12 color-black-4 mr5">￥8.52</div>
                  </td>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-right align-middle">
                    1000.00
                  </td>
                </tr>
              )
            }
        </tbody>
      </table>
    </div>
  )
}
export default PlaceOrderPriceHelper
