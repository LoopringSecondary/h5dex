import React from 'react'
import { Icon } from 'antd'
import { Button } from 'antd-mobile'
import config from 'common/config'
import intl from 'react-intl-universal'
import * as orderFormatter from 'modules/orders/formatters'
import Notification from 'LoopringUI/components/Notification'
import QRCode from 'qrcode.react'
import { Page, Pages } from 'LoopringUI/components/Pages'
import { connect } from 'dva'
import moment from 'moment'
import { toHex, toFixed } from 'LoopringJS/common/formatter'
import storage from 'modules/storage'
import { signOrder, signTx } from '../common/utils/signUtils'
import eachOfLimit from 'async/eachOfLimit'

const OrderMetaItem = (props) => {
  const {label, value} = props
  return (
    <div className="row ml0 mr0 pl0 pr0 zb-b-t no-gutters" style={{padding: '7px 0px'}}>
      <div className="col">
        <div className="fs14 color-black-1 lh25 text-left">{label}</div>
      </div>
      <div className="col-auto text-right">
        <div className="fs14 color-black-2 text-wrap lh25 text-left">{value}</div>
      </div>
    </div>
  )
}

function PlaceOrderSteps (props) {
  const {p2pOrder, balance, settings, marketcap, pendingTx, dispatch} = props
  const gasPrice = 10
  const {tokenS, tokenB, amountS, amountB, count = 1} = p2pOrder
  const validSince = p2pOrder.validSince || moment()
  const validUntil = p2pOrder.validUntil || moment().add(1, 'months')
  const price = toFixed(amountS / amountB, 4)

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
  const next = async (page) => {
    const tradeInfo = {}
    tradeInfo.amountB = amountB
    tradeInfo.amountS = amountS
    tradeInfo.tokenB = tokenB
    tradeInfo.tokenS = tokenS
    tradeInfo.validSince = validSince.unix()
    tradeInfo.validUntil = validUntil.unix()
    tradeInfo.marginSplit = 0
    tradeInfo.milliLrcFee = 0
    tradeInfo.lrcFee = 0
    tradeInfo.delegateAddress = config.getDelegateAddress()
    tradeInfo.protocol = settings.trading.contract.address
    tradeInfo.gasLimit = config.getGasLimitByType('approve').gasLimit
    tradeInfo.gasPrice = toHex(Number(gasPrice) * 1e9)
    tradeInfo.orderType = 'p2p_order'
    try {
      await orderFormatter.p2pVerification(balance, tradeInfo, pendingTx ? pendingTx.items : [], gasPrice)
    } catch (e) {
      Notification.open({
        message: intl.get('notifications.title.place_order_failed'),
        description: e.message,
        type: 'error'
      })
      dispatch({type: 'p2pOrder/loadingChange', payload: {loading: false}})
      return
    }
    if (tradeInfo.error) {
      tradeInfo.error.map(item => {
        if (item.value.symbol === 'ETH') {
          Notification.open({
            message: intl.get('notifications.title.place_order_failed'),
            description: intl.get('notifications.message.eth_is_required_when_place_order', {required: item.value.required}),
            type: 'error',
            actions: (
              <div>
                <Button className="alert-btn mr5" onClick={() => dispatch({
                  type: 'layers/showLayer',
                  payload: {id: 'receiveToken', symbol: 'ETH'}
                })}>
                  {`${intl.get('actions.receive')} ETH`}
                </Button>
              </div>
            )
          })
        } else if (item.value.symbol === 'LRC') {
          Notification.open({
            message: intl.get('notifications.title.place_order_failed'),
            description: intl.get('notifications.message.lrcfee_is_required_when_place_order', {required: item.value.required}),
            type: 'error',
            actions: (
              <div>
                <Button className="alert-btn mr5" onClick={() => dispatch({
                  type: 'layers/showLayer',
                  payload: {id: 'receiveToken', symbol: 'LRC'}
                })}>
                  {`${intl.get('actions.receive')} LRC`}
                </Button>
              </div>
            )
          })
        }
      })
      dispatch({type: 'p2pOrder/loadingChange', payload: {loading: false}})
      return
    }
    try {
      const {order, unsigned} = await orderFormatter.signP2POrder(tradeInfo, (window.Wallet && window.Wallet.address) || storage.wallet.getUnlockedAddress())
      const signResult = await signOrder(order)
      if (signResult.error) {
        Notification.open({
          message: intl.get('notifications.title.place_order_failed'),
          description: signResult.error.message,
          type: 'error'
        })
        return
      }
      const signedOrder = {...order, ...signResult.result}
      signedOrder.powNonce = 100
      let failed = false
      eachOfLimit(unsigned.filter(item => item.type = 'tx'), 1, async (item) => {
        signTx(item.data).then(res => {
          if (res.result) {
            window.ETH.sendRawTransaction(res.result).then(resp => {
              if (resp.result) {
                window.RELAY.account.notifyTransactionSubmitted({
                  txHash: resp.result,
                  rawTx: item.data,
                  from: window.Wallet.address
                })
              }
            })
          }
        })
      }, function (e) {
        if (e) {
          failed = true
          Notification.open({
            message: intl.get('notifications.title.place_order_failed'),
            description: e.message,
            type: 'error'
          })
        }
      })

      if (failed) {
        return
      }
      const response = await window.RELAY.order.placeOrder(signedOrder)
      // console.log('...submit order :', response)
      if (response.error) {
        Notification.open({
          message: intl.get('notifications.title.place_order_failed'),
          description: response.error.message,
          type: 'error'
        })
      } else {
        Notification.open({
          message: intl.get('notifications.title.place_order_success'),
          description: 'successfully submit order',
          type: 'info'
        })
        signedOrder.orderHash = response.result
        dispatch({type: 'p2pOrder/loadingChange', payload: {loading: false}})

        const unsignedOrder = unsigned.find(item => item.type === 'order')
        storage.orders.storeP2POrder({
          authPrivateKey: unsignedOrder.completeOrder.authPrivateKey,
          orderHash: signedOrder.orderHash,
          count
        })
        const qrcode = JSON.stringify({
          type: 'p2p_order',
          value: {authPrivateKey: unsignedOrder.completeOrder.authPrivateKey, orderHash: signedOrder.orderHash, count}
        })
        dispatch({type: 'p2pOrder/qrcodeChange', payload: {qrcode}})
        page.gotoPage({id: 'qrcode'})

      }
    } catch (e) {
      Notification.open({
        message: intl.get('notifications.title.place_order_failed'),
        description: e.message,
        type: 'error'
      })
    }
  }
  return (
    <div className="">
      <Pages active="order">
        <Page id="order" render={({page}) =>
          <div>
            <div className="p15 color-black-1 fs18 zb-b-b text-center">
              <div className="row">
                <div className="col-auto text-left" onClick={hideLayer.bind(this, {id: 'face2FaceConfirm'})}>
                  <Icon type="close"/>
                </div>
                <div className="col">Place Order</div>
                <div className="col-auto color-white">
                  <Icon type="close"/>
                </div>
              </div>
            </div>
            <div className="p20 bg-white">
              <div className="pb20 row ml0 mr0 no-gutters align-items-center justify-content-center">
                <div className="col-auto">
                  <div className=" color-black-1 text-center" style={{
                    width: '40px',
                    height: '40px',
                    lineHeight: '38px',
                    borderRadius: '50em',
                    border: '1px solid #000'
                  }}>
                    <i className={`icon-${tokenS} fs24`}/>
                  </div>
                </div>
                <div className="col-auto pl25 pr25 text-center">
                  <Icon type="swap" className={`color-black-1 fs20`}/>
                </div>
                <div className="col-auto">
                  <div className="color-black-1 text-center" style={{
                    width: '40px',
                    height: '40px',
                    lineHeight: '38px',
                    borderRadius: '50em',
                    border: '1px solid #000'
                  }}>
                    <i className={`icon-${tokenB} fs24`}/>
                  </div>
                </div>
              </div>
              <OrderMetaItem label="价格" value={`${price} ${tokenS}/${tokenB}`}/>
              <OrderMetaItem label="订单有效期"
                             value={`${validSince.format('MM-DD HH:mm')} ~ ${validUntil.format('MM-DD HH:mm')}`}/>
              <Button type="" className="bg-grey-900 color-white mt15" onClick={next.bind(this, page)}>签名</Button>
            </div>
          </div>
        }/>
        <Page id="qrcode" render={({page}) =>
          <div className="div">
            <div className="p15 color-black-1 fs18 zb-b-b text-center no-gutters">
              <div className="row">
                <div className="col-auto text-left pl20 pr20" onClick={page.gotoPage.bind(this, {id: 'order'})}>
                  <Icon type="left"/>
                </div>
                <div className="col">Qrcode</div>
                <div className="col-auto color-white pl20 pr20">
                  <Icon type="left"/>
                </div>
              </div>
            </div>
            <div className="bg-white p15">
              <QRCode value={p2pOrder.qrcode} size={240} level='H'/>
            </div>
          </div>
        }/>
      </Pages>
    </div>
  )
}

function mapToProps (state) {
  return {
    p2pOrder: state.p2pOrder,
    balance: state.sockets.balance.items,
    marketcap: state.sockets.marketcap.items,
    tokens: state.tokens.items,
    settings: state.settings,
    pendingTx: state.pendingTx
  }
}

export default connect(mapToProps)(PlaceOrderSteps)
