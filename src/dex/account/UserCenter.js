import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch,Grid,NoticeBar } from 'antd-mobile';
import { Icon as WebIcon,Switch as WebSwitch } from 'antd';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import Containers from 'modules/containers';
import UiContainers from 'LoopringUI/containers'
import routeActions from 'common/utils/routeActions'
import LayoutDexHome from '../../layout/LayoutDexHome'
import {OpenOrderList} from '../orders/ListOrders';
import ListBalance from '../tokens/ListBalance';
import ListMyFills from '../fills/ListMyFills';

const Item = List.Item;
const Brief = Item.Brief;

class UserCenter extends React.Component {
  render() {
    const dispatch = this.props.dispatch
    const showLayer = (payload={})=>{
      dispatch({
        type:'layers/showLayer',
        payload:{
          ...payload
        }
      })
    }
    const hideLayer = (payload={})=>{
      dispatch({
        type:'layers/hideLayer',
        payload:{
          ...payload
        }
      })
    }
    const OrderStatus = [
      {
        icon: <Badge text="3"><WebIcon type="exclamation-circle-o" className="fs22 color-black-1 mb5" /></Badge>,
        text: <div className="fs14 color-black-2">Error</div>,
      },
      {
        icon: <WebIcon type="clock-circle-o" className="fs20 color-black-1 mb5" />,
        text: <div className="fs14 color-black-2">Open</div>,
      },
      {
        icon: <WebIcon type="pay-circle-o" className="fs20 color-black-1 mb5" />,
        text: <div className="fs14 color-black-2">Matched</div>,
      },
      {
        icon: <WebIcon type="check-circle-o" className="fs20 color-black-1 mb5" />,
        text: <div className="fs14 color-black-2">Completed</div>,
      },
      {
        icon: <WebIcon type="close-circle-o" className="fs20 color-black-1 mb5" />,
        text: <div className="fs14 color-black-2">Closed</div>,
      },
    ]
    const txStatus = [
      {
        icon: <WebIcon type="clock-circle-o" className="fs20 color-black-2 mb5" />,
        text: <div className="fs14 color-black-2">Pending</div>,
      },
      {
        icon: <WebIcon type="check-circle-o" className="fs20 color-black-2 mb5" />,
        text: <div className="fs14 color-black-2">Success</div>,
      },
      {
        icon: <WebIcon type="close-circle-o" className="fs20 color-black-2 mb5" />,
        text: <div className="fs14 color-black-2">Failed</div>,
      },
    ]
    return (
      <LayoutDexHome {...this.props}>
        <div className="bg-grey-100">
          <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }} className="color-back-1" >
                Notice: Loopr is in Beta phase, traing fee is free for every order when total is over 1.0 WETH
          </NoticeBar>
          <NavBar
            className=""
            mode="light"
            onLeftClick={() => routeActions.gotoPath('/wallet/trade')}
            leftContent={[
              <span className="color-black-1" key="1"><WebIcon type="home" /></span>,
            ]}
            rightContent={[
              <span className="color-black-1" key="1" onClick={()=>{}}><WebIcon type="setting" /></span>
            ]}
          >
          My Dex
          </NavBar>
          <div className="pt40 pb40 text-left bg-grey-900">
            <div className="row align-items-center ml0 mr0 no-gutters">
              <div className="col">
                <div className="text-left color-white-1 fs16 pl15" style={{width:'240px',wordBreak:'break-all'}}>
                  0xeba7136a36da0f5e16c6bdbc739c716bb5b65a00
                  <div className="fs14 color-white-3 mt5">
                    Switch Wallet <WebIcon type="right" />
                  </div>
                </div>
              </div>
              <div className="col-auto">
              </div>
            </div>
          </div>
          <div className="no-underline">
            <Tabs
              tabs={
                [
                  { title: <Badge className="pl10 pt10 pb10 text-center d-block w-100">My Assets</Badge> },
                  { title: <Badge className="pl10 pt10 pb10 text-center d-block w-100">My Orders</Badge> },
                  { title: <Badge className="text-center pt10 pb10 d-block w-100">My Fills</Badge> },
                ]
              }
              tabBarBackgroundColor="#fff"
              tabBarActiveTextColor={"#000"}
              tabBarInactiveTextColor={"#999"}
              initialPage={0}
              swipeable={false}
              onChange={(tab, index) => { console.log('onChange', index, tab); }}
              onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
            >
              <div>
                <ListBalance />
              </div>
              <div>
                <Containers.Orders id="MyOpenOrders" alias="orders" initState={{}}>
                  <OpenOrderList />
                </Containers.Orders>
              </div>
              <div>
                <Containers.Fills id="MyFills" alias="fills" initState={{}}>
                  <ListMyFills />
                </Containers.Fills>
              </div>
            </Tabs>
            <div className="pb50"></div>
          </div>
          <div hidden>
            <div onClick={routeActions.gotoPath.bind(this,'/orders')} className="row ml0 mr0 p10 mt0 bg-white align-items-center no-gutters">
              <div className="col fs16 color-black-1">
                My Orders
              </div>
              <div className="col-auto fs14 color-black-3 pl20">
                Order & Fills <WebIcon type="right" />
              </div>
            </div>
            <Grid onClick={routeActions.gotoPath.bind(this,'/dex/myOrders')} className="my-dex-grid" data={OrderStatus} square={false} activeStyle={false} carouselMaxRow={1} isCarousel={true} />
          </div>
          <div hidden className="bg-white mt15">
            <div className="row ml0 mr0 p10 align-items-center no-gutters zb-b-t">
              <div className="col fs16 color-black-1">My Assets</div>
              <div className="col-auto fs14 color-black-3 pl20">
                All <WebIcon type="right" />
              </div>
            </div>
            <div className="zb-b-t">
              <TokenList />
            </div>
          </div>
          <div hidden className="bg-white mt15">
            <div className="row ml0 mr0 p10 align-items-center no-gutters zb-b-t">
              <div className="col fs20 color-black-1">
                My Transactions
                <span hidden className="color-black-3 ml10 fs16">ETH</span>
              </div>
              <div className="col-auto fs18 color-black-3 pl20">
                All <WebIcon type="right" />
              </div>
            </div>
            <Grid className="my-dex-grid" data={txStatus} square={false} activeStyle={false} columnNum={4}/>
          </div>
          <div className="pb50"></div>
        </div>
      </LayoutDexHome>

    );
  }
}
export default UserCenter
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
            <th className="text-right zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Balance</th>
            <th className="text-right zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Estimate</th>
            <th hidden className="text-right zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Selling</th>
            <th hidden className="text-right zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Lack</th>
          </tr>
        </thead>
        <tbody>
            {
              tokens.map((token,index)=>
                <tr key={index} onClick={showLayer.bind(this,{id:'tokenNotEnough'})}>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-1 text-left">
                    {token.symbol}
                    <span className="color-black-3 ml5">{token.name}</span>
                  </td>
                  <td className="pl10 pr10 pt15 pb15 zb-b-b color-black-2 text-right">{token.balance}</td>
                  <td className="pl10 pr10 pt15 pb15 zb-b-b color-black-2 text-right">$ 23647.57</td>
                  <td hidden className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-right">{token.required}</td>
                  <td hidden className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-right">{
                      Number(token.balance - token.required).toFixed(4)>0 ? '0.0000' :
                      <span className="color-red-500">
                        <WebIcon type="exclamation-circle mr5" />
                        {Number(token.required - token.balance).toFixed(4)}
                      </span>
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
export const TokenList = connect()(TokenListComp)





