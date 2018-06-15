import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch,Grid,NoticeBar } from 'antd-mobile';
import { Icon as WebIcon,Switch as WebSwitch } from 'antd';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import Containers from 'modules/containers';
import UiContainers from 'LoopringUI/containers'
import routeActions from 'common/utils/routeActions'

const Item = List.Item;
const Brief = Item.Brief;

class DApps extends React.Component {
  state = {
    type: 'money',
    side: 'buy',
  }
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
    const gotoConfirm= ()=>{

    }
    const showPriceHelper= ()=>{
      showLayer({id:'placeOrderPriceHelper'})
    }
    const { type } = this.state;

    const {side} = this.state
    const tabChange = (side)=>{
      this.setState({
        side
      })
    }
    const gotoTrade = ()=>{

    }
    const OrderStatus = [
      {
        icon: <WebIcon type="api" className="fs24 color-black-1 mb5" />,
        text: <div className="fs14 color-black-1">去中心化交易</div>,
        onClick:(item)=> routeActions.gotoPath('/dapp/dex')
      },
      {
        icon: <WebIcon type="team" className="fs24 color-black-1 mb5" />,
        text: <div className="fs14 color-black-1">面对面交易</div>,
        onClick:(item)=> routeActions.gotoPath('/dapp/face2face')
      },
      {
        icon: <i className="icon-WETH fs24 color-black-1 mb5" />,
        text: <div className="fs14 color-black-1">WETH转换</div>,
        onClick:(item)=> routeActions.gotoPath('/dapp/convert')
      },
      {
        icon: <WebIcon type="pay-circle-o" className="fs24 color-black-1 mb5" />,
        text: <div className="fs14 color-black-1">一键购买</div>,
        onClick:(item)=>routeActions.gotoPath('/todo'),
      },
      {
        icon: <WebIcon type="qrcode" className="fs24 color-black-1 mb5" />,
        text: <div className="fs14 color-black-1">扫码收款</div>,
        onClick:(item)=>routeActions.gotoPath('/todo'),
      },
      {
        icon: <WebIcon type="ellipsis" className="fs24 color-black-1 mb5" />,
        text: <div className="fs14 color-black-1">更多</div>,
        onClick:(item)=>routeActions.gotoPath('/todo'),
      },

    ]
    return (
      <div className="bg-grey-100">
        {
          false &&
          <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }} className="color-back-1" >
                Notice: Loopr is in Beta phase, traing fee is free for every order when total is over 1.0 WETH
          </NoticeBar>
        }
        <NavBar
          className=""
          mode="light"
          onLeftClick={() => {}}
          leftContent={null && [
            <span className="color-black-1"><WebIcon key="1" type="left" /></span>,
          ]}
          rightContent={null && [
            <span className="color-black-1 " onClick={()=>{}}><WebIcon key="1" type="info-circle-o" /></span>
          ]}
        >
        Trade DApps
        </NavBar>
        <div className="bg-white">
          <div className="pt50 pb50 text-left zb-b-t">
            <div className="row align-items-center ml0 mr0 no-gutters">
              <div className="col">
                <div className="text-center color-black-1 fs20 pl15" style={{wordBreak:'break-all'}}>
                  Loopring Dex EcoSystem
                  <div className="fs16 color-black-3 mt5">
                    让交易更安全更简单
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div hidden onClick={routeActions.gotoPath.bind(this,'/orders')} className="row ml0 mr0 p10 mt0 bg-white align-items-center no-gutters">
          <div className="col fs20 color-black-1">
            My Orders
            <span hidden className="color-black-3 ml10 fs16">Order & Fills</span>
          </div>
          <div className="col-auto fs18 color-black-3 pl20">
            Order & Fills <WebIcon type="right" />
          </div>
        </div>
        <Grid className="my-dex-grid" data={OrderStatus} square={false} activeStyle={false} carouselMaxRow={1} isCarousel={false} columnNum={2}
          renderItem={(item,index)=>{
            return (
              <div onClick={item.onClick.bind(this,item)}>
                {item.icon}
                {item.text}
              </div>
            )
          }}
        />
        <div className="pb50"></div>
      </div>
    );
  }
}
export default DApps





