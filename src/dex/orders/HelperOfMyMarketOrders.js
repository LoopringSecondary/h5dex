import React from 'react';
import { Button } from 'antd-mobile';
import { Icon as WebIcon } from 'antd';
import { connect } from 'dva';
import routeActions from 'common/utils/routeActions'
import intl from 'react-intl-universal'
import {OrderFm} from 'modules/orders/OrderFm'
import {getTokensByMarket} from 'modules/formatter/common'
import {renders} from './ListOrders'
const HelperOfMyOrders = ({orders={},dispatch})=>{
  const market = orders.filters.market
  const tokens = getTokensByMarket(market)
  const gotoDetail= (item)=>{
      dispatch({
        type:'layers/showLayer',
        payload:{
          id:'orderDetail',
          order:item,
        }
      })
  }
  const gotoAll = ()=>{

  }
  return (
    <div>
      <table className="w-100 fs13" style={{overflow:'auto'}}>
        <thead>
          <tr>
            <th className="text-left pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Price</th>
            <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Amount</th>
            <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Filled</th>
            <th className="text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Fee</th>
            <th className="text-center pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.items && orders.items.map((item,index)=>{
              const orderFm = new OrderFm(item)
              return (
                <tr key={index} className="color-black-2" onClick={gotoDetail.bind(this,item)}>
                  <td className="zb-b-b p10 pl10 text-left">
                    { orderFm.getSide() === 'buy' && <span className="color-green-500">{orderFm.getPrice()}</span>}
                    { orderFm.getSide() === 'sell' && <span className="color-red-500">{orderFm.getPrice()}</span>}
                  </td>
                  <td className="zb-b-b p10 text-right text-nowrap">{orderFm.getAmount()}</td>
                  <td className="zb-b-b p10 text-right text-nowrap">{orderFm.getFilledPercent()}%</td>
                  <td className="zb-b-b p10 text-right text-nowrap">{orderFm.getLRCFee()}</td>
                  <td className="zb-b-b p10 text-center">
                    {renders.status(orderFm,item.originalOrder)}
                  </td>
                </tr>
              )
            })
          }
          {
            orders.items && orders.items.length == 0 &&
            <tr><td colSpan='100'><div className="text-center pt10 pb10 color-black-3 fs12">
            no open {tokens.right} orders
            </div></td></tr>
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
      <div className="p10 zb-b-t mb15">
        <Button onClick={gotoAll} type="" size="small" style={{height:"36px",lineHeight:'36px'}}className="d-block w-100 fs14 bg-none">View All Orders</Button>
      </div>
    </div>

  )
}

export default connect(({
  sockets:{tickers},
  orders,
})=>({
 orders:orders.MyOpenOrders
}))(HelperOfMyOrders)

