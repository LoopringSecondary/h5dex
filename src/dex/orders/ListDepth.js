import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch,Steps } from 'antd-mobile';
import { Icon as WebIcon,Switch as WebSwitch } from 'antd';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import Containers from 'modules/containers';
import UiContainers from 'LoopringUI/containers'
import routeActions from 'common/utils/routeActions'

const ListDepth = ({depth={},maxRows=5})=>{
  if(depth && depth.items){

  }else{
    depth.items=  [1,2,3,4,5]
  }
  const maxHeight = (60*maxRows+32) + 'px'
  return (
    <div style={{maxHeight,overflow:'auto'}}>
      <table className="w-100 fs13">
        <thead>
          <tr className="">
            <th className="zb-b-b text-left pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Amount</th>
            <th className="zb-b-b text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Buy</th>
            <th className="zb-b-b text-left pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Sell</th>
            <th className="zb-b-b text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Amount</th>
          </tr>
        </thead>
        <tbody>
            {
              depth.items.map((item,index)=>
                <tr key={index}>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left align-middle">
                    1000.0000
                  </td>
                  <td className="pl10 pr5 pt10 pb10 zb-b-b text-right color-green-500 align-middle">
                    0.00015000
                    <div hidden className="fs12 color-black-4 mr5">￥8.52</div>
                  </td>
                  <td className="pl10 pr5 pt10 pb10 zb-b-b text-left color-red-500 align-middle">
                    0.00015000
                    <div hidden className="fs12 color-black-4 mr5">￥8.52</div>
                  </td>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-right align-middle">
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

export default ListDepth
