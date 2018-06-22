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
  const gotoAll = ()=>{}
  return (
    <div className="zb-b-t">
      <table className="w-100 fs13" style={{overflow:'auto'}}>
        <thead>
          <tr>
            <th className="text-left pt10 pb10 pl5 pr5 font-weight-normal color-black-3 zb-b-b">
              Price
              <span className="color-black-4 ml5 fs10">{tokens.right}</span>
            </th>
            <th className="text-right pt10 pb10 pl5 pr5 font-weight-normal color-black-3 zb-b-b">
              <span hidden className="color-black-4 mr5 fs10">{tokens.left}</span>
              Amount
            </th>
            <th className="text-right pt10 pb10 pl5 pr5 font-weight-normal color-black-3 zb-b-b">Fee</th>
            <th className="text-right pt10 pb10 pl5 pr5 font-weight-normal color-black-3 zb-b-b">Filled</th>
            <th className="text-center pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b">
              <a className="fs12" onClick={()=>{}}>Cancel All</a>
            </th>

          </tr>
        </thead>
        <tbody>
          {
            orders.items && orders.items.map((item,index)=>{
              const orderFm = new OrderFm(item)
              return (
                <tr key={index} className="color-black-2" onClick={gotoDetail.bind(this,item)}>
                  <td className="zb-b-b pt10 pb10 pl5 pr5 text-left">
                    { orderFm.getSide() === 'buy' && <span className="color-green-500">{orderFm.getPrice()}</span>}
                    { orderFm.getSide() === 'sell' && <span className="color-red-500">{orderFm.getPrice()}</span>}
                  </td>
                  <td className="zb-b-b pt10 pb10 pl5 pr5 text-right text-nowrap">{orderFm.getAmount()}</td>
                  <td className="zb-b-b pt10 pb10 pl5 pr5 text-right text-nowrap">{orderFm.getLRCFee()}</td>
                  <td className="zb-b-b pt10 pb10 pl5 pr5 text-right text-nowrap">{orderFm.getFilledPercent()}%</td>
                  <td className="zb-b-b pt10 pb10 pl5 pr5 text-center">
                    <a className="fs12" onClick={()=>{}}>Cancel</a>
                  </td>
                </tr>
              )
            })
          }
          {
            orders.items && orders.items.length == 0 &&
            <tr><td className="zb-b-b pt10 pb10 pl5 pr5 text-center color-black-3 fs12" colSpan='100'><div className="">
            no open {market} orders
            </div></td></tr>
          }
        </tbody>
      </table>
      <div className="p10 mb15">
        <Button onClick={gotoAll} type="" size="small" style={{height:"36px",lineHeight:'36px'}}className="d-block w-100 fs14 bg-none">View all orders</Button>
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

