import React from 'react'
import { Button, Modal, Toast } from 'antd-mobile'
import { connect } from 'dva'
import { OrderFm } from 'modules/orders/OrderFm'
import { getTokensByMarket } from 'modules/formatter/common'
import config from 'common/config'
import { toBig, toFixed } from 'LoopringJS/common/formatter'
import moment from 'moment'
import { signMessage } from '../common/utils/signUtils'
import storage from 'modules/storage'

const Face2FaceOrders = ({orders = {}, dispatch}) => {
  const market = orders.filters.market
  const tokens = getTokensByMarket(market)
  const changePrice = (item) => {
    const tokenB = config.getTokenBySymbol(item.originalOrder.tokenB)
    const tokenS = config.getTokenBySymbol(item.originalOrder.tokenS)
    const market = config.getMarketBySymbol(item.originalOrder.tokenB, item.originalOrder.tokenS)
    const price = item.originalOrder.side.toLowerCase() === 'buy' ? toBig(item.originalOrder.amountS).div('1e' + tokenS.digits).div(toBig(item.originalOrder.amountB).div('1e' + tokenB.digits)).toFixed(market.pricePrecision) : toBig(item.originalOrder.amountB).div('1e' + tokenB.digits).div(toBig(item.originalOrder.amountS).div('1e' + tokenS.digits)).toFixed(market.pricePrecision)
    Toast.info('Price has changed', 1, null, false)
    dispatch({
      type: 'placeOrder/priceChangeEffects',
      payload: {
        price
      }
    })
  }
  const changeAmount = (item) => {
    const side = item.originalOrder.side.toLowerCase()
    let token = side === 'buy' ? config.getTokenBySymbol(item.originalOrder.tokenB) : config.getTokenBySymbol(item.originalOrder.tokenS)
    token = token || {digits: 18, precision: 6}
    const amount = side === 'buy' ? item.originalOrder.amountB : item.originalOrder.amountS
    const amountInput = toFixed(toBig(amount).div('1e' + token.digits), token.precision)
    Toast.info('Amount has changed', 1, null, false)
    dispatch({
      type: 'placeOrder/amountChange',
      payload: {
        amountInput
      }
    })
  }
  const gotoDetail = (item) => {
    dispatch({
      type: 'layers/showLayer',
      payload: {
        id: 'orderDetail',
        order: item,
      }
    })
  }
  const cancelOrder = (item, e) => {
    e.stopPropagation()
    Modal.alert('确认取消当前订单？', 'Buy 100.00 LRC ', [
      {text: 'No', onPress: () => {}, style: 'default'},
      {
        text: 'Yes', onPress: () => {
        const timestamp = Math.floor(moment().valueOf() / 1e3).toString()
        signMessage(timestamp).then(res => {
          if (res.result) {
            const sig = res.result
            window.RELAY.order.cancelOrder({
              sign: {...sig, timestamp, owner: storage.wallet.getUnlockedAddress()},
              orderHash: item.originalOrder.hash,
              type: 1
            }).then(response => {
              if (response.error) {
                Toast.fail(`relay cancel failed:${response.error.message}`, 3, null, false)
              } else {
                Toast.success(`succeed to cancel order`, 3, null, false)
              }
            })
          } else {
            Toast.fail(`sign cancel failed:${res.error.message}`, 3, null, false)
          }
        })
      }
      },
    ])
  }
  const cancelOrderByTokenPair = (e) => {
    e.stopPropagation()
    if (orders.items && orders.items.length > 0 && orders.items.find(item => item.status === 'open')) {
      const openOrders = orders.items.filter(item => item.status === 'open')
      Modal.alert(`取消全部${market}订单？`, `${openOrders.length} open orders of LRC-WETH will be canceled`, [
        {text: 'No', onPress: () => {}, style: 'default'},
        {
          text: 'Yes', onPress: () => {
          const timestamp = Math.floor(moment().valueOf() / 1e3).toString()
          signMessage(timestamp).then(res => {
            if (res.result) {
              const sig = res.result
              const tokens = market.split('-')
              const tokenS = config.getTokenBySymbol(tokens[0]).address
              const tokenB = config.getTokenBySymbol(tokens[1]).address
              window.RELAY.order.cancelOrder({
                sign: {...sig, timestamp, owner: storage.wallet.getUnlockedAddress()},
                type: 4,
                tokenS,
                tokenB
              }).then(response => {
                if (response.error) {
                  Toast.fail(`cancel failed:${response.error.message}`, 3, null, false)
                } else {
                  Toast.success(`succeed to cancel ${openOrders.length} ${market} orders`, 3, null, false)
                }
              })
            } else {
              Toast.fail(`cancel failed:${res.error.message}`, 3, null, false)
            }
          })
        }
        },
      ])
    } else {
      Modal.alert('No open orders to cancel')
    }
  }
  const gotoAll = () => {}
  return (
    <div className="zb-b-t">
      <table className="w-100 fs13" style={{overflow: 'auto'}}>
        <thead>
        <tr>
          <th className="text-left pt10 pb10 pl5 pr5 font-weight-normal color-black-3 zb-b-b">
            Price
            <span hidden className="color-black-4 ml5 fs10">{tokens.right}</span>
          </th>
          <th className="text-right pt10 pb10 pl5 pr5 font-weight-normal color-black-3 zb-b-b">
            <span hidden className="color-black-4 mr5 fs10">{tokens.left}</span>
            Amount
          </th>
          <th className="text-right pt10 pb10 pl5 pr5 font-weight-normal color-black-3 zb-b-b">Fee</th>
          <th className="text-right pt10 pb10 pl5 pr5 font-weight-normal color-black-3 zb-b-b">Filled</th>
          <th className="text-center pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b text-nowrap">
            {
              orders.items && orders.items.length > 0 &&
              <a className="fs12" onClick={cancelOrderByTokenPair.bind(this)}>Cancel All</a>
            }
            {
              orders.items && orders.items.length == 0 && 'Status'
            }
          </th>
        </tr>
        </thead>
        <tbody>
        {
          orders.items && orders.items.map((item, index) => {
            const orderFm = new OrderFm(item)
            return (
              <tr key={index} className="color-black-2" onClick={() => Modal.alert('Select Your Options', <div></div>, [
                {text: 'Fill Price', onPress: () => changePrice(item)},
                {text: 'Fill Amount', onPress: () => changeAmount(item)},
                {text: 'Order Detail', onPress: () => gotoDetail(item)},
              ])
              }>
                <td className="zb-b-b pt10 pb10 pl5 pr5 text-left">
                  {orderFm.getSide() === 'buy' && <span className="color-green-500">{orderFm.getPrice()}</span>}
                  {orderFm.getSide() === 'sell' && <span className="color-red-500">{orderFm.getPrice()}</span>}
                </td>
                <td className="zb-b-b pt10 pb10 pl5 pr5 text-right text-nowrap">{orderFm.getAmount()}</td>
                <td className="zb-b-b pt10 pb10 pl5 pr5 text-right text-nowrap">{orderFm.getLRCFee()}</td>
                <td className="zb-b-b pt10 pb10 pl5 pr5 text-right text-nowrap">{orderFm.getFilledPercent()}%</td>
                <td className="zb-b-b pt10 pb10 pl5 pr5 text-center">
                  <a className="fs12" onClick={cancelOrder.bind(this, item)}>Cancel</a>
                </td>
              </tr>
            )
          })
        }
        {
          orders.items && orders.items.length == 0 &&
          <tr>
            <td className="zb-b-b pt10 pb10 pl5 pr5 text-center color-black-3 fs12" colSpan='100'>
              no open orders of {market}
            </td>
          </tr>
        }
        </tbody>
      </table>
      <div hidden className="p10 mb15">
        <Button onClick={gotoAll} type="" size="small" style={{height: '36px', lineHeight: '36px'}}
                className="d-block w-100 fs14 bg-none">View all orders</Button>
      </div>
    </div>

  )
}

export default connect(({
                          sockets: {tickers},
                          orders,
                        }) => ({
  orders: orders.MyOpenOrders
}))(Face2FaceOrders)


