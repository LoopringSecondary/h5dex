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
    { title: <div className="text-center d-block w-100 pl10">Percentage</div> },
    { title: <div className="text-center d-block w-100 pr10">MarketDepth</div> },
  ];
  return (
    <div className="">
      <div className="pt15 pb15 fs24 color-black-1 zb-b-b text-center">Amount Helper</div>
      <Tabs tabs={tabs}
        tabBarUnderlineStyle={{}}
        swipeable={false}
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

export const DepthList = ({depth={},maxRows=5})=>{
  if(depth && depth.items){

  }else{
    depth.items=  [1,2,3,4,5]
  }
  const maxHeight = (60*maxRows+32) + 'px'
  return (
    <div style={{maxHeight,overflow:'auto'}}>
      <table className="w-100">
        <thead>
          <tr className="">
            <th className="zb-b-b bg-grey-100 text-left pl10 pr10 pt5 pb5 font-weight-normal color-black-3 fs16">Amount</th>
            <th className="zb-b-b bg-grey-100 text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 fs16">Buy</th>
            <th className="zb-b-b bg-grey-100 text-left pl10 pr10 pt5 pb5 font-weight-normal color-black-3 fs16">Sell</th>
            <th className="zb-b-b bg-grey-100 text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 fs16">Amount</th>
          </tr>
        </thead>
        <tbody>
            {
              depth.items.map((item,index)=>
                <tr key={index}>
                  <td className="fs18 pl10 pr10 pt15 pb15 zb-b-b color-black-2 text-left align-middle">
                    1000.0000
                  </td>
                  <td className="fs18 pl10 pr5 pt15 pb15 zb-b-b text-right color-green-500 align-middle">
                    0.00015000
                    <div hidden className="fs12 color-black-4 mr5">￥8.52</div>
                  </td>
                  <td className="fs18 pl10 pr5 pt15 pb15 zb-b-b text-left color-red-500 align-middle">
                    0.00015000
                    <div hidden className="fs12 color-black-4 mr5">￥8.52</div>
                  </td>
                  <td className="fs18 pl10 pr10 pt15 pb15 zb-b-b color-black-2 text-right align-middle">
                    1000.0000
                  </td>
                </tr>
              )
            }
        </tbody>
      </table>
    </div>

  )
}
export const FillList = ({fill={},maxRows=5})=>{
  if(fill && fill.items){

  }else{
    fill.items=  [1,2,3,4,5]
  }
  const maxHeight = (60*maxRows+32) + 'px'
  return (
    <div style={{maxHeight,overflow:'auto'}}>
      <table className="w-100">
        <thead>
          <tr className="">
            <th className="zb-b-b bg-grey-100 text-left pl10 pr10 pt5 pb5 font-weight-normal color-black-3 fs16">Price</th>
            <th className="zb-b-b bg-grey-100 text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 fs16">Amount</th>
            <th className="zb-b-b bg-grey-100 text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 fs16">LRC Fee</th>
            <th className="zb-b-b bg-grey-100 text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 fs16">Time</th>
          </tr>
        </thead>
        <tbody>
            {
              fill.items.map((item,index)=>
                <tr key={index}>
                  {
                    index%2===0 &&
                    <td className="fs18 pl10 pr5 pt15 pb15 zb-b-b text-left align-middle color-green-500">
                      0.00015000
                    </td>
                  }
                  {
                    index%2===1 &&
                    <td className="fs18 pl10 pr5 pt15 pb15 zb-b-b text-left align-middle color-red-500">
                      0.00015000
                    </td>
                  }
                  <td className="fs18 pl10 pr10 pt15 pb15 zb-b-b color-black-2 text-right align-middle">
                    1000.0000
                  </td>
                  <td className="fs18 pl10 pr5 pt15 pb15 zb-b-b text-right color-black-2 align-middle">
                    2.55 LRC
                    <div hidden className="fs12 color-black-4 mr5">￥8.52</div>
                  </td>
                  <td className="fs18 pl10 pr10 pt15 pb15 zb-b-b color-black-2 text-right align-middle">
                    06-10 10:00
                  </td>
                </tr>
              )
            }
        </tbody>
      </table>
    </div>

  )
}

