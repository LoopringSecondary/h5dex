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
    <div className="bg-white no-underline">
      <Tabs tabs={[
        { title: intl.get('order_detail.tabs_basic') },
        { title: intl.get('order_detail.tabs_fills') },
      ]}
            initialPage={0}
      >
        <div className="bg-white" style={{maxHeight:'75vh',overflow:'auto'}}>
          <div className="divider 1px zb-b-t"></div>
          <div className="">
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
            <OrderMetaItem label={intl.get('order.status')} value={orderStatus(order)}/>
            <OrderMetaItem label={intl.get('order.filled')} value={`${orderFm.getFilledPercent()}%`}/>
            <OrderMetaItem label={intl.get('order.price')} value={`${orderFm.getPrice()} ${orderFm.getMarketPair()}`}/>
            <OrderMetaItem label={intl.get('common.sell')} value={orderFm.getSell()}/>
            <OrderMetaItem label={intl.get('common.buy')} value={orderFm.getBuy()}/>
            <OrderMetaItem label={intl.get('order.LRCFee')} value={orderFm.getLRCFee()}/>
            <OrderMetaItem label={intl.get('common.ttl')} value={orderFm.getValidTime()}/>
          </div>
        </div>
        <div className="bg-white" style={{maxHeight:'75vh',overflow:'auto'}}>
          <div className="divider 1px zb-b-t"></div>
          <DetailFills order={order}/>
        </div>
      </Tabs>



        <div hidden className="pt15 pl20 pr20 bg-white text-left">
          <div className="pt15 pb0">
            <div className="text-left pt20 pb35 zb-b-b">
             <Steps direction="horizontal" size="" current={1}>
                 <Steps.Step description={<div className="color-black-3 fs14">06-10 10:00</div>} title={<div className="font-weight-normal fs18">Submited</div>} />
                 <Steps.Step description={<div className="color-black-3 fs14">80% filled</div>} title={<div className="font-weight-normal fs18">Matching</div>} />
                 <Steps.Step description={<div className="color-black-3 fs14">Wating</div>} title={<div className="font-weight-normal fs18">Completed</div>} />
             </Steps>
            </div>
          </div>

          <WebSteps progressDot direction="vertical" size="small" current={4}>
              <WebSteps.Step description="2018-06-10 10:00" title="Submited Successfully" />
              <WebSteps.Step description="2018-06-10 18:00" title="Match Successfully" />
              <WebSteps.Step description="2018-06-10 20:00" title="Transfer Starts" />
              <WebSteps.Step description="2018-06-10 21:00" title="Transfer Successfully" />
              { false && <WebSteps.Step title="2018-06-10 22:00" description="Canceled" /> }
              { false && <WebSteps.Step title="2018-06-10 24:00" description="Expired" /> }
          </WebSteps>
          {
            false &&
            <WebSteps progressDot direction="vertical" size="small" current={5}>
                <WebSteps.Step title="Submited Successfully" description="2018-06-10 10:00:00" />
                <WebSteps.Step title="Matching" description={
                  <div>
                    <div className="mb5">Miners are searching matched order</div>
                    <div className="color-error mt5">
                      <Icon type="exclamation-circle-o" /> <span className="">LRC balance is not sufficient .</span>
                    </div>
                    <div className="color-error mt5">
                      <Icon type="exclamation-circle-o" /> <span className="">WETH balance is not sufficient .</span>
                    </div>
                    <Button className="mt5 mr5 d-inline-block" type="warning" size="small">Cancel Order</Button>
                    <Button className="mt5 mr5 d-inline-block" type="warning" size="small">Cancel Order</Button>
                  </div>
                } />
                <WebSteps.Step title="Matched Failed" description={
                  <div>
                    <Icon type="exclamation-circle-o" /> <span className="">Tokens are not enabled to trade.</span>
                  </div>
                } />
                <WebSteps.Step title="Matched Successfully" description={
                  <div>
                    <div className="mb5">Miners found matched order</div>
                  </div>
                } />
                <WebSteps.Step title="Transfering" description={
                  <div>
                    <div className="mb5">Miner is transfering token to your address</div>
                  </div>
                } />
                <WebSteps.Step title="Transfered Successfully" description={
                  <div>
                    <div className="mb5">Your Order is </div>
                  </div>
                } />
                { false && <WebSteps.Step title="Matched Successfully" description="2018-06-15 10:02:23" /> }
                { false && <WebSteps.Step title="Transfer tokens starts" description="2018-06-15 10:04:00" /> }
                { false && <WebSteps.Step title="ETH Network is slow" status="error" description={<div className="fs18">
                </div>} /> }
            </WebSteps>
          }
        </div>
    </div>
  )
}
export default connect()(OrderDetail)
