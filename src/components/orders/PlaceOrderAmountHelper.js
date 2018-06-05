import React from 'react';
import { Input,Icon } from 'antd';
import { Modal,List,Button,Tabs,Badge,Slider } from 'antd-mobile';
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

function PlaceOrderAmountHelper(props) {
  const tabs = [
    { title: <Badge >Qucik</Badge> },
    { title: <Badge >Market Depth</Badge> },
  ];
  return (
    <div className="">
      <div className="pt15 pb15 fs24 color-black-1 zb-b-b">Amount Helper</div>
      <Tabs tabs={tabs}
        initialPage={0}
        onChange={(tab, index) => { console.log('onChange', index, tab); }}
        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
      >
        <div className="">
          <div className="row pt15 pb15 ml0 mr0 zb-b-b">
            <div className="col color-black-1 text-left pl15">
              100%
            </div>
            <div className="col-auto color-black-3 pr15">
              1500.00 LRC
            </div>
          </div>
          <div className="row pt15 pb15 ml0 mr0 zb-b-b">
            <div className="col color-black-1 text-left pl15">
              75%
            </div>
            <div className="col-auto color-black-3 pr15">
              1125.00 LRC
            </div>
          </div>
          <div className="row pt15 pb15 ml0 mr0 zb-b-b">
            <div className="col color-black-1 text-left pl15">
              50%
            </div>
            <div className="col-auto color-black-3 pr15">
              750.00 LRC
            </div>
          </div>
          <div className="row pt15 pb15 ml0 mr0 zb-b-b">
            <div className="col color-black-1 text-left pl15">
              25%
            </div>
            <div className="col-auto color-black-3 pr15">
              375.00 LRC
            </div>
          </div>
          <div className="row pt15 pb15 ml0 mr0">
            <div className="col color-black-1 text-left pl15">
              自定义
              <span className="ml5">10%</span>
            </div>
            <div className="col-auto color-black-3 pr15">
              0.00 LRC
            </div>
          </div>
          <div className="mt15 pb35">
            <Slider
              className="ml15 mr15"
              defaultValue={10}
              min={0}
              max={100}
              onChange={()=>{}}
              onAfterChange={()=>{}}
            />
          </div>
        </div>
        <div className="">
          <DepthList />
        </div>
      </Tabs>


    </div>
  )
}
export default PlaceOrderAmountHelper

export const DepthList = ()=>{
  return (
    <table className="w-100">
      <thead>
        <tr className="">
          <th className="zb-b-b text-left pl10 pr10 pt5 pb5 font-weight-normal color-black-3 fs16">Amount</th>
          <th className="zb-b-b text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 fs16">Buy</th>
          <th className="zb-b-b text-left pl10 pr10 pt5 pb5 font-weight-normal color-black-3 fs16">Sell</th>
          <th className="zb-b-b text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 fs16">Amount</th>
        </tr>
      </thead>
      <tbody>
          {
            [1,2,3,4,5].map((item,index)=>
              <tr key={index}>
                <td className="fs16 pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left align-middle">
                  1000.0000
                </td>
                <td className="fs16 pl10 pr10 pt10 pb10 zb-b-b text-right text-up align-middle">
                  0.00015000
                  <div className="fs12 color-black-4 mr5">￥8.52</div>
                </td>
                <td className="fs16 pl10 pr10 pt10 pb10 zb-b-b text-left text-down align-middle">
                  0.00015000
                  <div className="fs12 color-black-4 mr5">￥8.52</div>
                </td>
                <td className="fs16 pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-right align-middle">
                  1000.0000
                </td>
              </tr>
            )
          }
      </tbody>
    </table>
  )
}
