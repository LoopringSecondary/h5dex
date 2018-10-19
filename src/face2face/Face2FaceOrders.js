import React from 'react'
import { Modal, Toast, Pagination } from 'antd-mobile'
import {Spin} from 'antd'
import { connect } from 'dva'
import { OrderFm } from 'modules/orders/OrderFm'
import config from 'common/config'
import moment from 'moment'
import { signMessage } from '../common/utils/signUtils'
import storage from 'modules/storage'
import intl from 'react-intl-universal'
import TokenFm from 'modules/tokens/TokenFm'
import { renders } from '../dex/orders/ListOrders'
import Worth from 'modules/settings/Worth'

class Face2FaceOrders extends React.Component {

  state = {
    orders: [],
    pageIndex: 1,
    pageSize: 10,
    total: 0,
    loading: true
  }

  componentDidMount () {
    const {pageIndex, pageSize} = this.state
    const owner = (window.Wallet && window.Wallet.address) || storage.wallet.getUnlockedAddress()
    window.RELAY.order.getOrders({
      owner,
      pageIndex,
      pageSize,
      delegateAddress: config.getDelegateAddress(),
      orderType:"p2p_order"
    }).then(res => {
      if (res.result) {
        const total = res.result.total / pageSize + res.result.total % pageSize ? 1 : 0
        this.setState({orders: res.result.data, total, loading: false})
      } else {
        this.setState({loading: false})
      }
    })
  }

  pageChange = (page) => {
    this.setState({loading:true})
    const {pageSize} = this.state
    const pageIndex = page.current
    const owner = (window.Wallet && window.Wallet.address) || storage.wallet.getUnlockedAddress()
    window.RELAY.order.getOrders({
      owner,
      pageIndex,
      pageSize,
      delegateAddress: config.getDelegateAddress(),
      orderType:"p2p_order"
    }).then(res => {
      if (res.result) {
        const total = res.result.total / pageSize + res.result.total % pageSize ? 1 : 0
        this.setState({orders: res.result.data, total, pageIndex: pageIndex + 1,loading:false})
      }else{
        this.setState({loading:false})
      }
    })
  }

  render () {
    const {dispatch} = this.props
    const {orders, pageIndex, total} = this.state

    const gotoDetail = (item) => {
      console.log('detail')
      dispatch({
        type: 'layers/showLayer',
        payload: {
          id: 'p2pOrderDetail',
          order: item,
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
            signMessage(timestamp).then(res => {
              if (res.result) {
                const sig = res.result
                window.RELAY.order.cancelOrder({
                  sign: {...sig, timestamp, owner: storage.wallet.getUnlockedAddress()},
                  orderHash: item.originalOrder.hash,
                  type: 1
                }).then(response => {
                  if (response.error) {
                    Toast.fail(`${intl.get('notifications.title.cancel_fail', {type: intl.get('common.order')})}:${response.error.message}`, 3, null, false)
                  } else {
                    Toast.success(intl.get('notifications.title.cancel_suc', {type: intl.get('common.order')}), 3, null, false)
                  }
                })
              } else {
                Toast.fail(`${intl.get('notifications.title.cancel_fail', {type: intl.get('common.order')})}:${res.error.message}`, 3, null, false)
              }
            })
          }
        },
      ])
    }

    return (
      <div>
        <Spin spinning={this.state.loading}>
          <table className="w-100 fs13" style={{overflow: 'auto'}}>
            <thead>
            <tr>
              <th className="text-left pl5 pr5 pt10 pb10 font-weight-normal color-black-4 zb-b-b hover-default"
                  colSpan="1" onClick={() => {}}>

              </th>
              <th className="text-left pl0 pr5 pt10 pb10 font-weight-normal color-black-4 zb-b-b hover-default"
                  colSpan="1" onClick={() => {}}>
                {intl.get('common.market')}
              </th>
              <th
                className="text-left pl5 pr5 pt10 pb10 font-weight-normal color-black-4 zb-b-b">{intl.get('common.price')}</th>
              <th
                className="text-left pl5 pr5 pt10 pb10 font-weight-normal color-black-4 zb-b-b">{intl.get('order.filled')}</th>
              <th hidden
                  className="text-right pl10 pr10 pt10 pb10 font-weight-normal color-black-4 zb-b-b">{intl.get('common.lrc_fee')}</th>
              <th className="text-center pl10 pr10 pt10 pb10 font-weight-normal color-black-4 zb-b-b hover-default"
                  onClick={() => {}}>
                {intl.get('common.status')}
              </th>
            </tr>
            </thead>
            <tbody>
            {
              orders && orders.map((item, index) => {
                const orderFm = new OrderFm(item)
                const tokens = orderFm.getTokens()
                return (
                  <tr key={index} className="color-black-2" onClick={() => gotoDetail(item)}>
                    <td className="zb-b-b pt10 pb10 pl5 pr5 text-left">
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
                      <div className="color-black-3 fs12"><Worth amount={orderFm.getPrice()} symbol={tokens.right}/>
                      </div>
                    </td>
                    <td className="zb-b-b pt10 pb10 pl5 pr5 text-left text-nowrap align-top">
                      <div>{orderFm.getFilledAmount()}</div>
                      <div className="color-black-3 fs12">{orderFm.getAmount()}</div>
                    </td>
                    <td hidden className="zb-b-b p10 text-right text-nowrap">{orderFm.getFilledPercent()}%</td>
                    <td hidden className="zb-b-b p10 text-right text-nowrap">{orderFm.getLRCFee()}</td>
                    <td className="zb-b-b p10 text-center">
                      {renders.status(orderFm, item.originalOrder, cancelOrder.bind(this, item))}
                    </td>
                  </tr>
                )
              })
            }
            {
              orders && orders.length === 0 &&
              <tr>
                <td colSpan='100'>
                  <div className="text-center pt10 pb10 color-black-4 fs12">{intl.get('common.list.no_data')}</div>
                </td>
              </tr>
            }
            </tbody>
          </table>
          {
          orders && orders.length > 0 &&
          <div className="p5">
          <Pagination className="fs14 s-small custom-pagination" total={total} current={pageIndex}
          onChange={this.pageChange}/>
          </div>
          }
        </Spin>
      </div>
    )
  }
}

export default connect(({
                          sockets: {tickers},
                          orders,
                        }) => ({
  orders: orders.MyOpenOrders
}))(Face2FaceOrders)


