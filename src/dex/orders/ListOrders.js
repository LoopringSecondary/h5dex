import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch,Steps } from 'antd-mobile';
import { Icon as WebIcon,Switch as WebSwitch } from 'antd';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import Containers from 'modules/containers';
import UiContainers from 'LoopringUI/containers'
import routeActions from 'common/utils/routeActions'

export const OpenOrderList = ({})=>{
  const gotoOrderDetail = ()=>{}
  return (
    <table className="w-100 fs13">
      <thead>
        <tr>
          <th hidden className="text-center pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Side</th>
          <th className="text-left pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Price</th>
          <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Amount</th>
          <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Filled</th>
          <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Fee</th>
          <th className="text-center pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Status</th>
        </tr>
      </thead>
      <tbody>
        {
          [1,2,3,4,5,6,7,8,9].map((item,index)=>
            <tr key={index} className="color-black-2" onClick={gotoOrderDetail}>
              <td hidden className="zb-b-b p10 text-center">
                {index%2 == 0 && <span className="color-green-500">Buy</span>}
                {index%2 == 1 && <span className="color-red-500">Sell</span>}
              </td>
              <td className="zb-b-b p10 pl10 text-left">
                {index%2 == 0 && <span className="color-green-500">0.00095000</span>}
                {index%2 == 1 && <span className="color-red-500">0.00095000</span>}
              </td>
              <td className="zb-b-b p10 text-right">1000.0000</td>
              <td className="zb-b-b p10 text-right">80%</td>
              <td className="zb-b-b p10 text-right">2.5 LRC</td>
              <td className="zb-b-b p10 text-center">
                { index <=2 && <WebIcon className="zb-b-b color-red-500" type="exclamation-circle" /> }
                { index >=3 && index <=5 &&<WebIcon className="zb-b-b color-blue-500" type="clock-circle" /> }
                { index >=6 && <WebIcon className="zb-b-b color-green-500" type="check-circle" /> }
              </td>
            </tr>
          )
        }
        <tr hidden className="color-black-2">
          <td colSpan={10} className="zb-b-b p15 text-center">
              <Button className="color-grey-600">All Orders</Button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
export const HistoryOrderList = ()=>{
  return (
    <table className="w-100 fs16">
      <thead>
        <tr>
          <th hidden className="text-center pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Side</th>
          <th className="text-left pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Price</th>
          <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Amount</th>
          <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Filled</th>
          <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Fee</th>
          <th className="text-center pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Status</th>
        </tr>
      </thead>
      <tbody>
        {
          [1,2,3,4,5,6,7,8,9].map((item,index)=>
            <tr key={index} className="color-black-2">
              <td hidden className="zb-b-b p10 text-center">
                {index%2 == 0 && <span className="color-green-500">Buy</span>}
                {index%2 == 1 && <span className="color-red-500">Sell</span>}
              </td>
              <td className="zb-b-b p10 pl10 text-left">
                {index%2 == 0 && <span className="color-green-500">0.00095000</span>}
                {index%2 == 1 && <span className="color-red-500">0.00095000</span>}
              </td>
              <td className="zb-b-b p10 text-right">1000.0000</td>
              <td className="zb-b-b p10 text-right">80%</td>
              <td className="zb-b-b p10 text-right">2.5 LRC</td>
              <td className="zb-b-b p10 text-center">
                { index%3 === 0 && <WebIcon className="zb-b-b color-green-500" type="check-circle" /> }
                { index%3 === 1 && <WebIcon className="zb-b-b color-black-4" type="close-circle" /> }
                { index%3 === 2 && <WebIcon className="zb-b-b color-black-4" type="clock-circle" /> }
              </td>
            </tr>
          )
        }
        <tr hidden className="color-black-2">
          <td colSpan={10} className="zb-b-b p15 text-center">
              <Button className="color-grey-600">All Orders</Button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
