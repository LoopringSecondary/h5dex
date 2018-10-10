import React from 'react'
import { Icon } from 'antd'
import { NavBar } from 'antd-mobile'
import intl from 'react-intl-universal'
import { connect } from 'dva'
import { OrderFm } from 'modules/orders/OrderFm'
import Worth from 'modules/settings/Worth'
import storage from 'modules/storage'

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
function OrderDetail(props) {
  const {p2pOrderDetail,dispatch} = props
  const {order} = p2pOrderDetail;
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

  const showQR = (order) => {
   const p2pOrder = storage.orders.getP2POrder(order.originalOrder.hash)
    showLayer({id:'orderQrcode',order:p2pOrder})
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
    if (item.status === 'ORDER_WAIT_SUBMIT_RING') {
      return intl.get("order_status.waiting")
    }
  }
  const tokens = orderFm.getTokens()
  return (
    <div className="bg-fill position-relative" style={{height:"100%"}}>
      <div className="position-absolute w-100" style={{zIndex:'1000'}}>
        <NavBar
          className="bg-white"
          mode="light"
          onLeftClick={()=>hideLayer({id:'p2pOrderDetail'})}
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
          <div className='row'>
          <div className="fs14 text-primary text-left mb5 col">{intl.get('order_detail.tabs_basic')}</div>
            {(order.status === "ORDER_OPENED" || order.status ==="ORDER_WAIT_SUBMIT_RING") && storage.orders.getP2POrder(order.originalOrder.hash) &&  <div onClick={()=>showQR(order)} className="fs14 text-primary text-right mb5 col">qrcode</div>}
          </div>
          <div className="bg-white " style={{borderRadius:'0.4rem'}}>
            <OrderMetaItem label={intl.get('order.status')} value={orderStatus(order)}/>
            <OrderMetaItem label={intl.get('order.filled')} value={`${orderFm.getFilledPercent()}%`}/>
            <OrderMetaItem label={intl.get('order.price')} value={
              <div>
                <span className="color-black-4 pr5"><Worth amount={orderFm.getPrice()} symbol={tokens.right}/></span> {orderFm.getPrice()} { tokens.right }
              </div>
            }/>
            <OrderMetaItem label={intl.get('common.sell')} value={orderFm.getSell()}/>
            <OrderMetaItem label={intl.get('common.buy')} value={orderFm.getBuy()}/>
            <OrderMetaItem label={intl.get('order.LRCFee')} value={orderFm.getLRCFee()}/>
            <OrderMetaItem label={intl.get('common.ttl')} value={orderFm.getValidTime()}/>
          </div>
        </div>
      </div>
    </div>
  )
}
export default connect()(OrderDetail)
