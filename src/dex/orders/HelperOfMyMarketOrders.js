import React from 'react'
import { Button, Modal, Toast, NoticeBar } from 'antd-mobile'
import { Icon as WebIcon } from 'antd'
import { connect } from 'dva'
import intl from 'react-intl-universal'
import { OrderFm } from 'modules/orders/OrderFm'
import { getTokensByMarket } from 'modules/formatter/common'
import config from 'common/config'
import { toBig, toFixed } from 'LoopringJS/common/formatter'
import moment from 'moment'
import storage from 'modules/storage'
import { signMessage } from '../../common/utils/signUtils'
import TokenFm from '../../modules/tokens/TokenFm'
import routeActions from 'common/utils/routeActions'
import { keccakHash } from 'LoopringJS/common/utils'

class HelperOfMyOrders extends React.Component {

  state={

  }
  componentWillReceiveProps (newProps) {
    const {auth} = newProps
    const {hash} = this.state
    if (hash === auth.hash && auth.status === 'accept') {
      Modal.alert(intl.get('notifications.title.cancel_suc', {type: intl.get('common.order')}))
      this.setState({hash: ''})
    }
  }

  render () {
    const {orders = {}, dispatch} = this.props
    const market = orders.filters.market
    const tokens = getTokensByMarket(market)
    const showLayer = (payload = {}) => {
      dispatch({
        type: 'layers/showLayer',
        payload: {
          ...payload
        }
      })
    }
    const hideLayer = (payload = {}) => {
      dispatch({
        type: 'layers/hideLayer',
        payload: {
          ...payload
        }
      })
    }
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

    const cancelBythirdParty = (data) => {

      const {timestamp} = data
      const hash = keccakHash(timestamp)
      const _this = this
      window.RELAY.order.setTempStore(hash, JSON.stringify(data)).then(res => {
        _this.setState({hash})
        if (!res.error) {
          dispatch({
            type: 'sockets/queryChange',
            payload: {id: 'circulrNotify', extra: {hash}}
          })
          showLayer({id: 'helperOfSign', type: 'cancelOrder', data: {type: 'cancelOrder', value: hash}})
        }
      })
    }

    const cancelOrder = (item, e) => {
      e.stopPropagation()
      const tokenb = item.originalOrder.tokenB
      const tokens = item.originalOrder.tokenS
      let description = ''
      if (item.originalOrder.side.toLowerCase() === 'sell') {
        const tf = new TokenFm({symbol: tokens})
        description = `${intl.get('common.sell')} ${tf.toPricisionFixed(tf.getUnitAmount(item.originalOrder.amountS))} ${tokens}`
      } else {
        const tf = new TokenFm({symbol: tokens})
        description = `${intl.get('common.buy')} ${tf.toPricisionFixed(tf.getUnitAmount(item.originalOrder.amountB))} ${tokenb}`
      }

      Modal.alert(intl.get('order_cancel.cancel_title'), description, [
        {text: intl.get('order_cancel.confirm_no'), onPress: () => {}, style: 'default'},
        {
          text: intl.get('order_cancel.confirm_yes'), onPress: () => {
            const timestamp = Math.floor(moment().valueOf() / 1e3).toString()
            const data = {
              orderHash: item.originalOrder.hash,
              type: 1,
              timestamp
            }
            const owner = storage.wallet.getUnlockedAddress()
            if (owner) {
              data.owner = storage.wallet.getUnlockedAddress()
            }
            cancelBythirdParty(data)
          }
        },
      ])
    }
    const cancelOrderByTokenPair = (e) => {
      e.stopPropagation()
      if (orders.items && orders.items.find(item => item.status === 'ORDER_OPENED')) {
        const openOrders = orders.items.filter(item => item.status === 'ORDER_OPENED')
        Modal.alert(intl.get('order_cancel.cancel_all_title', {market}), intl.get('order_cancel.cancel_all_mes', {
          amount: openOrders.length,
          market
        }), [
          {text: intl.get('order_cancel.confirm_no'), onPress: () => {}, style: 'default'},
          {
            text: intl.get('order_cancel.confirm_yes'), onPress: () => {
              const timestamp = Math.floor(moment().valueOf() / 1e3).toString()
              const tokens = market.split('-')
              const tokenS = config.getTokenBySymbol(tokens[0]).address
              const tokenB = config.getTokenBySymbol(tokens[1]).address
              const data = {
                tokenB,
                tokenS,
                type: 4,
                timestamp
              }
              const owner = storage.wallet.getUnlockedAddress()
              if (owner) {
                data.owner = storage.wallet.getUnlockedAddress()
              }
              cancelBythirdParty(data)

            }
          },
        ])
      } else {
        Toast.info(intl.get('order_cancel.no_open_orders'), 3, null, false)
      }
    }
    const orderStatus = (item) => {
      if (item.status === 'ORDER_OPENED') {
        return <Button onClick={cancelOrder.bind(this, item)} type="primary"
                       style={{height: '24px', lineHeight: '24px'}}
                       className="d-inline-block ml5" size="small">{intl.get('common.cancel')}</Button>
      }
      if (item.status === 'ORDER_FINISHED') {
        return <span className="color-success"><WebIcon type="check-circle"/></span>
      }
      if (item.status === 'ORDER_CANCELLED') {
        return <span className="color-black-4">{intl.get('order_status.canceled')}</span>
      }
      if (item.status === 'ORDER_CUTOFF') {
        return <span className="color-black-4">{intl.get('order_status.canceled')}</span>
      }
      if (item.status === 'ORDER_EXPIRE') {
        return <span className="color-black-4">{intl.get('order_status.expired')}</span>
      }
      if (item.status === 'ORDER_PENDING') {
        return <span className="color-black-1">{intl.get('order_status.pending')}</span>
      }
      if (item.status === 'ORDER_CANCELLING') {
        return <span className="color-black-1">{intl.get('order_status.canceling')}</span>
      }
    }
    const gotoAll = () => {}
    return (
      <div className="">
        <table className="w-100 fs13" style={{overflow: 'auto'}}>
          <thead>
          <tr className="">
            <th className="text-left pt10 pb10 pl10 pr5 font-weight-normal color-black-3 zb-b-b">
              {intl.get('common.side')}
              <span hidden className="color-black-4 ml5 fs10">{tokens.right}</span>
            </th>
            <th className="text-left pt10 pb10 pl5 pr5 font-weight-normal color-black-3 zb-b-b">
              {intl.get('common.price')}<span className="fs10">/{tokens.right}</span>
            </th>
            <th className="text-left pt10 pb10 pl5 pr5 font-weight-normal color-black-3 zb-b-b">
              {intl.get('common.amount')}<span className="fs10">/{tokens.left}</span>
            </th>
            <th hidden className="text-right pt10 pb10 pl5 pr5 font-weight-normal color-black-3 zb-b-b">Fee</th>
            <th
              className="text-left pt10 pb10 pl5 pr5 font-weight-normal color-black-3 zb-b-b">{intl.get('order.filled')}</th>
            <th className="text-center pl10 pr10 pt5 pb5 font-weight-normal color-black-3 zb-b-b text-nowrap">
              {
                orders.items && orders.items.length > 0 &&
                <Button onClick={cancelOrderByTokenPair.bind(this)} type="primary"
                        style={{height: '24px', lineHeight: '24px'}} className="d-inline-block ml5" size="small">
                  {intl.get('common.cancel')}
                </Button>
              }
              {
                orders.items && orders.items.length === 0 && intl.get('common.status')
              }
            </th>
          </tr>
          </thead>
          <tbody>
          {
            orders.items && orders.items.map((item, index) => {
              const orderFm = new OrderFm(item)
              return (
                <tr key={index} className="color-black-2 hover-default" onClick={() => gotoDetail(item)}>
                  <td className="zb-b-b pt10 pb10 pl10 pr5 text-left">
                    {orderFm.getSide() === 'buy' && <span className="color-success">{intl.get('common.buy')}</span>}
                    {orderFm.getSide() === 'sell' && <span className="color-error">{intl.get('common.sell')}</span>}
                  </td>
                  <td className="zb-b-b pt10 pb10 pl5 pr5 text-left">
                    {orderFm.getPrice()}
                  </td>
                  <td className="zb-b-b pt10 pb10 pl5 pr5 text-left text-nowrap">{orderFm.getAmount()}</td>
                  <td hidden className="zb-b-b pt10 pb10 pl5 pr5 text-right text-nowrap">{orderFm.getLRCFee()}</td>
                  <td className="zb-b-b pt10 pb10 pl5 pr5 text-left text-nowrap">{orderFm.getFilledPercent()}%</td>
                  <td className="zb-b-b pt10 pb10 pl5 pr5 text-center">
                    {orderStatus(item)}
                  </td>
                </tr>
              )
            })
          }
          {
            orders.items && orders.items.length === 0 &&
            <tr>
              <td className="zb-b-b pt10 pb10 pl5 pr5 text-center color-black-3 fs13" colSpan='100'>
                {intl.get('common.list.no_data')}
              </td>
            </tr>
          }
          </tbody>
        </table>
        <div className="">
          <div className="" onClick={routeActions.gotoPath.bind(this, '/dex/usercenter/orders')}>
            <div className="row color-black-3 fs13 ml0 mr0 no-gutters pl10 pr10 pt10 pb10 align-items-center">
              <div className="col text-center">
                <WebIcon className="mr5" type="exclamation-circle-o"/>
                <span>当前仅显示您的{market}订单</span>
                <span className="text-primary ml5">{intl.get('common.all')}</span>
              </div>
            </div>
          </div>
          <div className="divider 1px zb-b-t"></div>
        </div>
      </div>

    )
  }

}

function mapStateToProps (state) {

  return {
    tickers: state.sockets.tickers,
    orders: state.sockets.orders,
    auth: state.sockets.circulrNotify.item
  }

}

export default connect(mapStateToProps)(HelperOfMyOrders)

