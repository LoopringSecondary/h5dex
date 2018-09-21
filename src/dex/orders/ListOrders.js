import React from 'react';
import { Button,WingBlank, Tabs, NavBar, Icon,Modal, Toast, PullToRefresh,Pagination } from 'antd-mobile';
import { Icon as WebIcon,Spin } from 'antd';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import Containers from 'modules/containers';
import UiContainers from 'LoopringUI/containers'
import routeActions from 'common/utils/routeActions'
import commonFm from 'modules/formatter/common'
import intl from 'react-intl-universal'
import {OrderFm} from 'modules/orders/OrderFm'
import Worth from 'modules/settings/Worth'
import moment from 'moment'
import storage from 'modules/storage'
import TokenFm from "../../modules/tokens/TokenFm";
import {signMessage} from "../../common/utils/signUtils";
import ReactDOM from 'react-dom'
import config from 'common/config'
import ListPagination from 'LoopringUI/components/ListPagination'

async function fetchOrders(page) {
  let filter = {}
  filter.pageIndex = 1
  filter.pageSize = 10
  if(page){
    filter.pageIndex = page.current
    filter.pageSize = page.size
  }
  filter.delegateAddress = config.getDelegateAddress();
  filter.owner = storage.wallet.getUnlockedAddress();
  return window.RELAY.order.getOrders(filter).then(res=> {
    if (!res.error && res.result.data) {
      return {
        items: res.result.data,
        page: {
          current: res.result.pageIndex,
          size: res.result.pageSize,
          total: res.result.total,
        }
      }
    }
  })
}

export class PullRefreshOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      height: document.documentElement.clientHeight,
      data: {
        items:[],
        page:{
          current: 1,
          size: 10,
          total: 0,
        },
      }, // {items:[], page:{}}
    };
  }
  componentDidMount() {
    // const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    // setTimeout(() => this.setState({
    //   height: hei,
    //   data: genData(),
    // }), 0);
    this.setState({ refreshing:true})
    fetchOrders().then(res=> {
      this.setState({ data: res ,refreshing:false })
      // this.setState({ data: res , height: hei,refreshing:false })
    })
  }

  render() {
    const {dispatch} = this.props
    const gotoDetail= (item)=>{
      dispatch({
        type:'layers/showLayer',
        payload:{
          id:'orderDetail',
          order:item,
        }
      })
    }
    const cancelOrder = (item) => {
      const tokenb = item.originalOrder.tokenB
      const tokens = item.originalOrder.tokenS
      let description = ''
      if(item.originalOrder.side.toLowerCase() ==='sell' ){
        const tf = new TokenFm({symbol:tokens})
        description = `${intl.get('common.sell')} ${tf.toPricisionFixed(tf.getUnitAmount(item.originalOrder.amountS))} ${tokens}`
      }else{
        const tf = new TokenFm({symbol:tokens})
        description = `${intl.get('common.buy')} ${tf.toPricisionFixed(tf.getUnitAmount(item.originalOrder.amountB))} ${tokenb}`
      }
      Modal.alert(intl.get('order_cancel.cancel_title'), description, [
        {text: intl.get('order_cancel.confirm_no'), onPress: () => {}, style: 'default'},
        {
          text: intl.get('order_cancel.confirm_yes'), onPress: () => {
            const timestamp = Math.floor(moment().valueOf() / 1e3).toString()
            signMessage(timestamp).then(res => {
              if (res.result) {
                const sig = res.result
                window.RELAY.order.cancelOrder({
                  sign: {...sig, timestamp, owner: storage.wallet.getUnlockedAddress()},
                  orderHash:item.originalOrder.hash,
                  type:1
                }).then(response => {
                  if (response.error) {
                    Toast.fail(`${intl.get('notifications.title.cancel_fail',{type:intl.get('common.order')})}:${response.error.message}`, 3, null, false)
                  } else {
                    Toast.success(intl.get('notifications.title.cancel_suc',{type:intl.get('common.order')}), 3, null, false)
                  }
                })
              } else {
                Toast.fail(`${intl.get('notifications.title.cancel_fail',{type:intl.get('common.order')})}:${res.error.message}`, 3, null, false)
              }
            })
          }
        },
      ])
    }
    return (
      <div>
        <Spin  spinning={this.state.refreshing}>
          <table className="w-100 fs13" style={{overflow:'auto'}}>
            <thead>
            <tr>
              <th hidden className="text-left pl5 pr5 pt10 pb10 font-weight-normal color-black-4 zb-b-b hover-default" colSpan="1" onClick={()=>{}}>
              </th>
              <th className="text-left pl5 pr5 pt10 pb10 font-weight-normal color-black-4 zb-b-b hover-default" colSpan="2" onClick={()=>{}}>
                {intl.get('common.market')}
                <WebIcon hidden className="text-primary" type="filter" />
              </th>
              <th className="text-left pl5 pr5 pt10 pb10 font-weight-normal color-black-4 zb-b-b">{intl.get('common.price')}</th>
              <th className="text-left pl5 pr5 pt10 pb10 font-weight-normal color-black-4 zb-b-b">{intl.get('order.filled_total')}</th>
              <th hidden className="text-right pl10 pr10 pt10 pb10 font-weight-normal color-black-4 zb-b-b">{intl.get('common.lrc_fee')}</th>
              <th className="text-center pl10 pr10 pt10 pb10 font-weight-normal color-black-4 zb-b-b hover-default" onClick={()=>{}}>
                {intl.get('common.status')}
                <WebIcon hidden className="text-primary" type="filter" />
              </th>
            </tr>
            </thead>
            <tbody>
            {this.state.data && this.state.data.items && this.state.data.items.map((item, index) => {
              const orderFm = new OrderFm(item)
              const tokens = orderFm.getTokens()
              const market = orderFm.getMarketPair()
              return (
                <tr key={index} className="color-black-2" onClick={gotoDetail.bind(this,item)}>
                  <td className="zb-b-b pt10 pb10 pl5 pr5 text-left">
                    {orderFm.getSide() === 'buy' &&
                    <span className="bg-success color-white d-inline-block text-center" style={{width:'18px',height:'18px',lineHeight:'18px',borderRadius:'50em',fontSize:'10px'}}>{intl.get(`common.buy_short`)}</span>
                    }
                    {orderFm.getSide() === 'sell' &&
                    <span className="bg-error color-white d-inline-block text-center" style={{width:'18px',height:'18px',lineHeight:'18px',borderRadius:'50em',fontSize:'10px'}}> {intl.get(`common.sell_short`)}</span>
                    }
                  </td>
                  <td className="zb-b-b pt10 pb10 pl0 pr5 text-left align-top">
                    <div className="">
                      <span className="font-weight-bold">{tokens.left}</span>-{tokens.right}
                    </div>
                    <div className="color-black-3 fs12">
                      <span className="">{orderFm.getCreateTime()}</span>
                    </div>
                  </td>
                  <td className="zb-b-b pt10 pb10 pl5 pr5 text-left text-nowrap align-top">
                    <div>{orderFm.getPrice()}</div>
                    <div className="color-black-3 fs12"><Worth amount={orderFm.getPrice()} symbol={tokens.right}/></div>
                  </td>
                  <td className="zb-b-b pt10 pb10 pl5 pr5 text-left text-nowrap align-top">
                    <div>{orderFm.getFilledAmount()}</div>
                    <div className="color-black-3 fs12">{orderFm.getAmount()}</div>
                  </td>
                  <td hidden className="zb-b-b p10 text-right text-nowrap">{orderFm.getFilledPercent()}%</td>
                  <td hidden className="zb-b-b p10 text-right text-nowrap">{orderFm.getLRCFee()}</td>
                  <td className="zb-b-b p10 text-center">
                    {renders.status(orderFm,item.originalOrder,cancelOrder.bind(this, item))}
                  </td>
                </tr>
              )
            })}
            {
              !this.state.refreshing &&  this.state.data.items && this.state.data.items.length === 0 &&
              <tr><td colSpan='100'><div className="text-center pt10 pb10 color-black-4 fs12">{intl.get('common.list.no_data')}</div></td></tr>
            }
            </tbody>
          </table>
        </Spin>
        {
          this.state.data.items && this.state.data.items.length > 0 &&
          <div className="p5">
            <Pagination className="fs14 s-small custom-pagination" total={Math.ceil(this.state.data.page.total/this.state.data.page.size)} current={this.state.data.page.current} onChange={(page)=>{
              this.setState({ refreshing: true });
              fetchOrders({
                current:page,
                size:10
              }).then(res=> {
                this.setState({ data: res, refreshing: false })
              })
            }} />
          </div>
        }
        {
          false &&
          <PullToRefresh
            damping={200}
            ref={el => this.ptr = el}
            style={{
              height: this.state.height,
              overflow: 'auto',
            }}
            indicator={{}}
            direction={'down'}
            refreshing={this.state.refreshing}
            onRefresh={() => {
              this.setState({ refreshing: true });
              fetchOrders().then(res=> {
                this.setState({ data: res, refreshing: false })
              })
            }}
          >
          </PullToRefresh>
        }
        
        
    </div>);
  }
}

export const OpenOrderList = ({orders={},dispatch})=>{
  const gotoDetail= (item)=>{
      dispatch({
        type:'layers/showLayer',
        payload:{
          id:'orderDetail',
          order:item,
        }
      })
  }
  const cancelOrder = (item) => {
    const tokenb = item.originalOrder.tokenB
    const tokens = item.originalOrder.tokenS
    let description = ''
    if(item.originalOrder.side.toLowerCase() ==='sell' ){
      const tf = new TokenFm({symbol:tokens})
      description = `${intl.get('common.sell')} ${tf.toPricisionFixed(tf.getUnitAmount(item.originalOrder.amountS))} ${tokens}`
    }else{
      const tf = new TokenFm({symbol:tokens})
      description = `${intl.get('common.buy')} ${tf.toPricisionFixed(tf.getUnitAmount(item.originalOrder.amountB))} ${tokenb}`
    }
    Modal.alert(intl.get('order_cancel.cancel_title'), description, [
      {text: intl.get('order_cancel.confirm_no'), onPress: () => {}, style: 'default'},
      {
        text: intl.get('order_cancel.confirm_yes'), onPress: () => {
          const timestamp = Math.floor(moment().valueOf() / 1e3).toString()
          signMessage(timestamp).then(res => {
            if (res.result) {
              const sig = res.result
              window.RELAY.order.cancelOrder({
                sign: {...sig, timestamp, owner: storage.wallet.getUnlockedAddress()},
                orderHash:item.originalOrder.hash,
                type:1
              }).then(response => {
                if (response.error) {
                  Toast.fail(`${intl.get('notifications.title.cancel_fail',{type:intl.get('common.order')})}:${response.error.message}`, 3, null, false)
                } else {
                  Toast.success(intl.get('notifications.title.cancel_suc',{type:intl.get('common.order')}), 3, null, false)
                }
              })
            } else {
              Toast.fail(`${intl.get('notifications.title.cancel_fail',{type:intl.get('common.order')})}:${res.error.message}`, 3, null, false)
            }
          })
        }
      },
    ])
  }
  return (
    <table className="w-100 fs13" style={{overflow:'auto'}}>
      <thead>
        <tr>
          <th className="text-left pl5 pr5 pt10 pb10 font-weight-normal color-black-4 zb-b-b hover-default" colSpan="1" onClick={()=>{}}>
            
          </th>
          <th className="text-left pl0 pr5 pt10 pb10 font-weight-normal color-black-4 zb-b-b hover-default" colSpan="1" onClick={()=>{}}>
            {intl.get('common.market')}
            <WebIcon className="text-primary" type="filter" />
          </th>
          <th className="text-left pl5 pr5 pt10 pb10 font-weight-normal color-black-4 zb-b-b">{intl.get('common.price')}</th>
          <th className="text-left pl5 pr5 pt10 pb10 font-weight-normal color-black-4 zb-b-b">{intl.get('order.filled')}</th>
          <th hidden className="text-right pl10 pr10 pt10 pb10 font-weight-normal color-black-4 zb-b-b">{intl.get('common.lrc_fee')}</th>
          <th className="text-center pl10 pr10 pt10 pb10 font-weight-normal color-black-4 zb-b-b hover-default" onClick={()=>{}}>
            {intl.get('common.status')}
            <WebIcon className="text-primary" type="filter" />
          </th>
        </tr>
      </thead>
      <tbody>
        {
          orders.items && orders.items.map((item,index)=>{
            const orderFm = new OrderFm(item)
            const tokens = orderFm.getTokens()
            const market = orderFm.getMarketPair()
            return (
              <tr key={index} className="color-black-2" onClick={gotoDetail.bind(this,item)}>
                <td className="zb-b-b pt10 pb10 pl5 pr5 text-left">
                  {orderFm.getSide() === 'buy' &&
                      <span className="bg-success color-white d-inline-block text-center" style={{width:'18px',height:'18px',lineHeight:'18px',borderRadius:'50em',fontSize:'10px'}}>{intl.get(`common.buy_short`)}</span>
                  }
                  {orderFm.getSide() === 'sell' &&
                    <span className="bg-error color-white d-inline-block text-center" style={{width:'18px',height:'18px',lineHeight:'18px',borderRadius:'50em',fontSize:'10px'}}> {intl.get(`common.sell_short`)}</span>
                  }
                </td>
                <td className="zb-b-b pt10 pb10 pl0 pr5 text-left align-top">
                  <div className="">
                    <span className="font-weight-bold">{tokens.left}</span>-{tokens.right}
                  </div>
                  <div className="color-black-3 fs12">
                    <span className="">{orderFm.getCreateTime()}</span>
                  </div>
                </td>

                <td className="zb-b-b pt10 pb10 pl5 pr5 text-left text-nowrap align-top">
                 <div>{orderFm.getPrice()}</div>
                 <div className="color-black-3 fs12"><Worth amount={orderFm.getPrice()} symbol={tokens.right}/></div>
                </td>
                <td className="zb-b-b pt10 pb10 pl5 pr5 text-left text-nowrap align-top">
                  <div>{orderFm.getFilledAmount()}</div>
                  <div className="color-black-3 fs12">{orderFm.getAmount()}</div>
                </td>
                <td hidden className="zb-b-b p10 text-right text-nowrap">{orderFm.getFilledPercent()}%</td>
                <td hidden className="zb-b-b p10 text-right text-nowrap">{orderFm.getLRCFee()}</td>
                <td className="zb-b-b p10 text-center">
                  {renders.status(orderFm,item.originalOrder,cancelOrder.bind(this, item))}
                </td>
              </tr>
            )
          })
        }
        {
          orders.items && orders.items.length === 0 &&
          <tr><td colSpan='100'><div className="text-center pt10 pb10 color-black-4 fs12">{intl.get('common.list.no_data')}</div></td></tr>
        }
        {
          false &&
          <tr hidden className="color-black-2">
            <td colSpan={10} className="zb-b-b p15 text-center">
                <Button className="color-grey-600">All Orders</Button>
            </td>
          </tr>
        }

      </tbody>
    </table>
  )
}
export const HistoryOrderList = ()=>{
  return (
    <table className="w-100 fs16">
      <thead>
        <tr>
          <th hidden className="text-center pl10 pr10 pt5 pb5 font-weight-normal color-black-4 zb-b-b">Side</th>
          <th className="text-left pl10 pr10 pt5 pb5 font-weight-normal color-black-4 zb-b-b">Price</th>
          <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-4 zb-b-b">Amount</th>
          <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-4 zb-b-b">Filled</th>
          <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-4 zb-b-b">Fee</th>
          <th className="text-center pl10 pr10 pt5 pb5 font-weight-normal color-black-4 zb-b-b">Status</th>
        </tr>
      </thead>
      <tbody>
        {
          [1,2,3,4,5,6,7,8,9].map((item,index)=>
            <tr key={index} className="color-black-2">
              <td hidden className="zb-b-b p10 text-center">
                {index%2 === 0 && <span className="color-success">Buy</span>}
                {index%2 === 1 && <span className="color-error">Sell</span>}
              </td>
              <td className="zb-b-b p10 pl10 text-left">
                {index%2 === 0 && <span className="color-success">0.00095000</span>}
                {index%2 === 1 && <span className="color-error">0.00095000</span>}
              </td>
              <td className="zb-b-b p10 text-right">1000.0000</td>
              <td className="zb-b-b p10 text-right">80%</td>
              <td className="zb-b-b p10 text-right">2.5 LRC</td>
              <td className="zb-b-b p10 text-center">
                { index%3 === 0 && <WebIcon className="zb-b-b color-success" type="check-circle" /> }
                { index%3 === 1 && <WebIcon className="zb-b-b color-black-4" type="close-circle" /> }
                { index%3 === 2 && <WebIcon className="zb-b-b color-black-4" type="clock-circle" /> }
              </td>
            </tr>
          )
        }
        {
          [].length === 0 &&
          <tr><td colSpan='100'><div className="text-center pt10 pb10 color-black-4 fs12">{intl.get('common.list.no_data')}</div></td></tr>
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

export const renders = {
  hash: (fm, actions) => (
    <a className="text-primary"
       onCopy={null}
       onClick={actions && actions.gotoDetail}
    >
      {commonFm.getShortAddress(fm.getOrderHash())}
    </a>
  ),
  side: (fm) => (
    <div>
      {fm.getSide() === 'buy' &&
      <span className="text-success">{intl.get(`common.${fm.getSide()}`)}</span>
      }
      {fm.getSide() === 'sell' &&
      <span className="text-error">{intl.get(`common.${fm.getSide()}`)}</span>
      }
    </div>
  ),
  status: (fm, order, cancelOrder) => {
    const status = fm.getStatus();
    if (status === 'ORDER_OPENED') {
      if(cancelOrder) {
        return <Button type="primary" style={{height:'24px',lineHeight:'24px'}} className="d-inline-block" size="small" onClick={(e) =>{e.stopPropagation();cancelOrder()}}>{intl.get('common.cancel')}</Button>
        // return <a className="fs12" onClick={(e) =>{e.stopPropagation();cancelOrder()}}>{intl.get("common.cancel")}</a>
      } else {
        return <span className="text-primary">{intl.get("order_status.opened")}</span>
      }
    }
    if (status === 'ORDER_FINISHED') {
      return <span className="color-success"><WebIcon type="check-circle" /></span>
    }
    if (status === 'ORDER_CANCELLED') {
      return <span className="color-black-4">{intl.get("order_status.canceled")}</span>
    }
    if (status === 'ORDER_CUTOFF') {
      return <span className="color-black-4">{intl.get("order_status.canceled")}</span>
    }
    if (status === 'ORDER_EXPIRE') {
      return <span className="color-black-4">{intl.get("order_status.expired")}</span>
    }
    if (status === 'ORDER_PENDING') {
      return <span className="color-black-1">{intl.get("order_status.pending")}</span>
    }
    if (status === 'ORDER_CANCELLING') {
      return <span className="color-black-1">{intl.get("order_status.canceling")}</span>
    }
  },
}
