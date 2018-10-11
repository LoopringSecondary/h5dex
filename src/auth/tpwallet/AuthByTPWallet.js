import React from 'react'
import TPWallet from './TPWallet'
import { Toast, Button, Modal } from 'antd-mobile'
import routeActions from 'common/utils/routeActions'
import { connect } from 'dva'
import storage from 'modules/storage'
import intl from 'react-intl-universal'
import { isTPWalletReady } from './bridge'
import { store } from '../../index'
import {toBig} from 'LoopringJS/common/formatter'


class AuthByTPWallet extends React.Component {

  componentDidMount () {
    const address = storage.wallet.getUnlockedAddress()
    if (address) {
      Toast.loading('Loading configs...', 0, () => {
        Toast.success('Load complete !!!')
      }, false)
      const _this = this
      const load = setInterval(() => {
        if (isTPWalletReady()) {
          clearInterval(load)
          window.Wallet = new TPWallet()
          window.Wallet.setConfigs().then(res => {
            if (address.toLowerCase() !== window.Wallet.address.toLowerCase()) {
              storage.wallet.storeUnlockedAddress('loopr', window.Wallet.address)
              window.RELAY.account.register(window.Wallet.address)
            }
            _this.props.dispatch({
              type: 'settings/preferenceChange',
              payload: {language: window.Wallet.language, currency: window.Wallet.currency}
            })
            _this.props.dispatch({type: 'sockets/unlocked'})
            _this.props.dispatch({type: 'locales/setLocale', payload: {locale: window.Wallet.language}})
            window.handleP2POrder = ({hash, authPrivateKey, count}) => {
              const dispatch = this.props.dispatch
              window.RELAY.order.getOrderByHash({orderHash: hash}).then(res => {
                if (res.error) {
                  Toast.fail(res.error.message)
                } else {
                  const order = res.result
                  if (order.status === 'ORDER_OPENED' || order.status === 'ORDER_WAIT_SUBMIT_RING') {
                    dispatch({
                      type: 'layers/showLayer',
                      payload: {
                        id:'takerConfirm',
                        makerOrder:{
                          authPrivateKey, count,
                          originalOrder:order.originalOrder
                        }
                      }
                    })
                  }else{
                    Toast.fail('This Order is completed, canceled or expired')
                  }
                }
              })
            }
            Toast.hide()
          })
        }
      }, 1000)
      routeActions.gotoPath('/dex')
    }
  }

  goToDex = () => {
    Toast.loading('Loading configs...', 0, () => {
      Toast.success('Load complete !!!')
    }, false)
    const _props = this.props
    const load = setInterval(() => {
      if (isTPWalletReady()) {
        clearInterval(load)
        window.Wallet = new TPWallet()
        window.Wallet.setConfigs().then(res => {
          if (!window.Wallet.currency) { window.Wallet.currency = 'CNY'}
          if (!window.Wallet.language) { window.Wallet.language = 'zh-CN'}
          storage.wallet.storeUnlockedAddress('tpwallet', window.Wallet.address)
          window.RELAY.account.register(window.Wallet.address)
          _props.dispatch({
            type: 'settings/preferenceChange',
            payload: {language: window.Wallet.language, currency: window.Wallet.currency}
          })
          _props.dispatch({type: 'sockets/unlocked'})
          _props.dispatch({type: 'locales/setLocale', payload: {locale: window.Wallet.language}})
          Toast.hide()
          routeActions.gotoPath('/dex')
        })
      }
    }, 1000)
  }
  goToFace2Face = () => {
    routeActions.gotoPath('/face2face')
  }

  render () {
    const address = storage.wallet.getUnlockedAddress()

    return (
      <div>
        {!address && <div className="bg-white">
          <div className="pt40 pb20 text-center">
            <div className="d-inline-block color-black-1 text-center" style={{
              width: '60px',
              height: '60px',
            }}>
              <img style={{borderRadius: '50em'}} width="100%" src={require('../../assets/images/loopr.png')} alt=""/>
            </div>
            <div className="text-center">
              <div className="color-black-1 fs20 pt20 pb20">{intl.get('imtoken.welcome')}</div>
              <div className="color-black-2 fs14 pl20 pr20">
                {intl.get('imtoken.description_1')}
                <a onClick={() => routeActions.gotoPath('/auth/terms')}
                   className="text-primary"> {intl.get('imtoken.description_2')} </a> {intl.get('imtoken.description_3')}
                <a
                  onClick={() => routeActions.gotoPath('/auth/privacy')}
                  className="text-primary"> {intl.get('imtoken.description_4')} </a>
                。
              </div>
              <Button className="m20" type="primary" onClick={this.goToDex}>{intl.get('imtoken.agree')}</Button>
            </div>
          </div>
          <div className="divider 1px zb-b-t"></div>
        </div>
        }
      </div>
    )
  }

}

export default connect()(AuthByTPWallet)
