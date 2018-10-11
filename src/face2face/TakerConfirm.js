import React from 'react'
import config from '../common/config'
import { toHex, toBig, toFixed } from 'LoopringJS/common/formatter'
import monent from 'moment'
import { Icon } from 'antd'
import { Button } from 'antd-mobile'
import storage from 'modules/storage'
import Contracts from 'LoopringJS/ethereum/contracts/Contracts'
import { connect } from 'dva'
import { signTx } from '../common/utils/signUtils'
import { Toast } from 'antd-mobile/lib/index'
import intl from 'react-intl-universal'

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

class TakerConfirm extends React.Component {

  render () {

    const {dispatch, takerConfirm, gas} = this.props
    const {makerOrder} = takerConfirm
    const validSince = monent()
    const validUntil = validSince.add(1, 'days')
    const order = {}
    order.delegateAddress = makerOrder.originalOrder.delegateAddress
    order.protocol = makerOrder.originalOrder.protocol
    order.owner = (window.Wallet && window.Wallet.getAddress()) || storage.wallet.getUnlockedAddress()
    order.tokenB = makerOrder.originalOrder.tokenS
    order.tokenS = makerOrder.originalOrder.tokenB
    order.amountB = toHex(toBig(makerOrder.originalOrder.amountS).idiv(makerOrder.count))
    let amountS = toBig(makerOrder.originalOrder.amountB).div(makerOrder.count)
    if (!amountS.isInteger()) {
      amountS = toBig(makerOrder.originalOrder.amountB).idiv(makerOrder.count).plus(1)
    }
    order.amountS = toHex(amountS)
    order.lrcFee = '0x0'
    order.validSince = toHex(Math.ceil(validSince.valueOf() / 1e3))
    order.validUntil = toHex(Math.ceil(validUntil.valueOf() / 1e3))
    order.marginSplitPercentage = 0
    order.buyNoMoreThanAmountB = true
    order.walletAddress = config.getWalletAddress()

    const price = toFixed(order.amountS / order.amountB, 4)
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

    const submitRing = async () => {
      const address = (window.Wallet && window.Wallet.getAddress()) || storage.wallet.getUnlockedAddress()
      const gasPrice = toHex(toBig(gas.tabSelected === 'estimate' ? gas.gasPrice.estimate : gas.gasPrice.current).times(1e9))
      const tx = {
        value: '0x0',
        gasLimit: config.getGasLimitByType('submitRing').gasLimit,
        chainId: config.getChainId(),
        to: order.protocol,
        gasPrice,
        nonce:toHex((await window.RELAY.account.getNonce(address)).result),
        data:Contracts.LoopringProtocol.encodeSubmitRing([order,makerOrder.originalOrder],config.getWalletAddress())
      }
      signTx(tx).then(res => {
        if (res.result) {
          window.RELAY.ring.submitRingForP2P({makerOrderHash:makerOrder.originalOrder.hash,rawTx:res.result,takerOrderHash:window.RELAY.order.getOrderHash(order)}).then(resp => {
            if (resp.result) {
              Toast.success(intl.get('notifications.title.submit_ring_suc'), 3, null, false)
              hideLayer({id: 'takerConfirm'})
            } else {
              Toast.fail(intl.get('notifications.title.submit_ring_fail') + ':' + resp.error.message, 3, null, false)
            }
          })
        } else {
          Toast.fail(intl.get('notifications.title.submit_ring_fail') + ':' + res.error.message, 3, null, false)
        }
      })

    }

    return (
      <div>
        <div className="p15 color-black-1 fs18 zb-b-b text-center">
          <div className="row">
            <div className="col-auto text-left" onClick={hideLayer.bind(this, {id: 'takerConfirm'})}>
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
                <i className={`icon-${order.tokenS} fs24`}/>
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
                <i className={`icon-${order.tokenB} fs24`}/>
              </div>
            </div>
          </div>
          <OrderMetaItem label="价格" value={`${price} ${order.tokenS}/${order.tokenB}`}/>
          <OrderMetaItem label="订单有效期"
                         value={`${validSince.format('MM-DD HH:mm')} ~ ${validUntil.format('MM-DD HH:mm')}`}/>
          <Button type="" className="bg-grey-900 color-white mt15" onClick={() => {submitRing()}}>签名</Button>
        </div>
      </div>
    )
  }

}

function mapStatetoProps (state) {

  return {
    gas: state.gas
  }
}

export default connect()(TakerConfirm)
