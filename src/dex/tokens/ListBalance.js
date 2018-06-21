import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch,Grid,NoticeBar } from 'antd-mobile';
import { Icon as WebIcon,Switch as WebSwitch } from 'antd';
import { connect } from 'dva';
import Containers from 'modules/containers';
import UiContainers from 'LoopringUI/containers'
import routeActions from 'common/utils/routeActions'
const Item = List.Item;
const Brief = Item.Brief;

const TokenListComp = (props)=>{
  const {dispatch} = props
  const showLayer = (payload={})=>{
    dispatch({
      type:'layers/showLayer',
      payload:{
        ...payload
      }
    })
  }
  const tokens = [
    {
      symbol:"LRC",
      name:"Loopring",
      balance:12680.0001,
      required:15000.0001,
    },
    {
      symbol:"WETH",
      name:"Wrap ETH",
      balance:21.3652,
      required:20.1278,
    },
    {
      symbol:"ETH",
      name:"Ethereum",
      balance:85.0001,
      required:0.0001,
    },
  ]
  return (
    <div className="fs20">
      <table className="w-100 fs13">
        <thead>
          <tr className="">
            <th className="text-left zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Token</th>
            <th className="text-left zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Balance</th>
            <th className="text-right zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Actions</th>
          </tr>
        </thead>
        <tbody>
            {
              tokens.map((token,index)=>
                <tr key={index} onClick={showLayer.bind(this,{id:'tokenNotEnough'})}>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left">
                    {token.symbol}
                    <span hidden className="color-black-3 ml5">{token.name}</span>
                  </td>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left">{token.balance}</td>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-right">
                    {
                      false && token.symbol === 'ETH' &&
                      <a href="">Convert</a>
                    }
                    {
                      token.symbol === 'WETH' &&
                      <a href="">Convert</a>
                    }
                    {
                      token.symbol !== 'WETH' &&
                      <a href="">Receive</a>
                    }
                  </td>
                </tr>
              )
            }
        </tbody>
      </table>
    </div>
  )
}
export default connect()(TokenListComp)





