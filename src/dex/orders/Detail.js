import React from 'react';
import { Input,Icon,Button as WebButton,Steps as WebSteps,Badge} from 'antd';
import { Modal,List,Button,Accordion,Steps,Tabs,NoticeBar,NavBar} from 'antd-mobile';
import config from 'common/config'
import intl from 'react-intl-universal';
import * as orderFormatter from 'modules/orders/formatters'
import {createWallet} from 'LoopringJS/ethereum/account';
import * as uiFormatter from 'modules/formatter/common'
import * as fm from 'LoopringJS/common/formatter'
import {Pages,Page} from 'LoopringUI/components/Pages'
import {connect} from 'dva'
import routeActions from 'common/utils/routeActions'
import {OrderFm} from 'modules/orders/OrderFm';
import DetailFills from './DetailFills'

const OrderMetaItem = (props) => {
  const {label, value} = props
  return (
    <div className="row ml0 mr0 pt10 pb10 pl15 pr15 zb-b-b no-gutters align-items-center" style={{padding:'7px 0px'}}>
      <div className="col">
        <div className="fs14 color-black-1 text-left">{label}</div>
      </div>
      <div className="col-auto text-right">
        <div className="fs14 color-black-2 text-wrap text-left">{value}</div>
      </div>
    </div>
  )
}
const Tips = ()=>{
  return (
    <div>
      { false &&
      <NoticeBar onClick={routeActions.gotoPath.bind(this,'/dex/todos')} className="text-left t-error s-lg" icon={<Icon type="close-circle"/>} mode="link" marqueeProps={{ loop: true}} action={<span>Enable Order<Icon type="right" /></span>}>
        订单无法进行撮合
      </NoticeBar>
      }
      { false &&
      <NoticeBar onClick={routeActions.gotoPath.bind(this,'/dex/todos')} className="text-left t-error s-lg" icon={<Icon type="close-circle"/>} mode="link" marqueeProps={{ loop: true}} action={<span>Enable Order<Icon type="right" /></span>}>
        余额为0，订单无法进行撮合
      </NoticeBar>
      }
      {
        false &&
        <NoticeBar  onClick={routeActions.gotoPath.bind(this,'/dex/todos')} className="text-left t-error s-lg" icon={<Icon type="exclamation-circle"/>} mode="link" marqueeProps={{ loop: true}} action={<span>查看详情<Icon type="right" /></span>}>
          余额不足，订单无法全部被撮合
        </NoticeBar>
      }
      {
        false &&
        <NoticeBar  onClick={routeActions.gotoPath.bind(this,'/dex/todos')} className="text-left t-info s-lg" mode="link" marqueeProps={{ loop: true}} action={<span>查看日志<Icon type="right" /></span>}>
          该订单正在进行撮合
        </NoticeBar>
      }
      {
        false &&
        <NoticeBar  className="text-left t-info s-lg" icon={<Icon type="question-circle"/>} mode="link" marqueeProps={{ loop: true}} action={<span>查看原因<Icon type="right" /></span>}>
          为什么订单没有撮合成交？
        </NoticeBar>
      }
    </div>
  )
}
function OrderDetail(props) {
  const {orderDetail,dispatch} = props
  const {order} = orderDetail;
  if(!order){
    return null
  }
  const orderFm = new OrderFm(order);

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
  const orderStatus = (item) => {
    if (item.status === 'ORDER_OPENED') {
      return intl.get("order_status.opened")
    }
    if (item.status === 'ORDER_FINISHED') {
      return intl.get("order_status.completed")
    }
    if (item.status === 'ORDER_CANCELLED') {
      return intl.get("order_status.canceled")
    }
    if (item.status === 'ORDER_CUTOFF') {
      return intl.get("order_status.canceled")
    }
    if (item.status === 'ORDER_EXPIRE') {
      return intl.get("order_status.expired")
    }
    if (item.status === 'ORDER_PENDING') {
      return intl.get("order_status.pending")
    }
    if (item.status === 'ORDER_CANCELLING') {
      return intl.get("order_status.canceling")
    }
  }
  return (
    <div className="bg-fill position-relative" style={{height:"100%"}}>
      <div className="position-absolute w-100" style={{zIndex:'1000'}}>
        <NavBar
          className="bg-fill"
          mode="light"
          onLeftClick={()=>hideLayer({id:'orderDetail'})}
          leftContent={[
            <span key='1' className=""><Icon type="close"/></span>,
          ]}
          rightContent={null && [
            <Icon key="1" type="question-circle-o"/>,
          ]}
        >
          <div className="color-black">{intl.get('common.order')}</div>
        </NavBar>
        <div className="divider 1px zb-b-t"></div>
      </div>
      <div style={{overflow:'auto',paddingTop:'4.5rem',paddingBottom:'3rem',height:'100%'}}>
        <div className="ml10 mr10 mb15 mt15">
          <div className="fs14 color-black-3 text-left mb5">{intl.get('order_detail.tabs_basic')}</div>
          <div className="bg-white" style={{borderRadius:'0.4rem'}}>
            <OrderMetaItem label={intl.get('order.status')} value={orderStatus(order)}/>
            <OrderMetaItem label={intl.get('order.filled')} value={`${orderFm.getFilledPercent()}%`}/>
            <OrderMetaItem label={intl.get('order.price')} value={`${orderFm.getPrice()} ${orderFm.getMarketPair()}`}/>
            <OrderMetaItem label={intl.get('common.sell')} value={orderFm.getSell()}/>
            <OrderMetaItem label={intl.get('common.buy')} value={orderFm.getBuy()}/>
            <OrderMetaItem label={intl.get('order.LRCFee')} value={orderFm.getLRCFee()}/>
            <OrderMetaItem label={intl.get('common.ttl')} value={orderFm.getValidTime()}/>
          </div>
        </div>
        <div className="ml10 mr10 mb15">
          <div className="fs14 color-black-3 text-left mb5">{intl.get('order_detail.tabs_fills')}</div>
          <div className="bg-white" style={{borderRadius:'0.4rem'}}>
            <DetailFills order={order}/>  
          </div>
        </div>
      </div>
    </div>
  )
}
export default connect()(OrderDetail)