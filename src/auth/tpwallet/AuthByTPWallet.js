import React from 'react'
import TPWallet from './TPWallet'
import { Icon as WebIcon } from 'antd'
import { Toast, Button, NavBar } from 'antd-mobile'
import routeActions from 'common/utils/routeActions'
import { connect } from 'dva'
import storage from 'modules/storage'
import intl from 'react-intl-universal'

class AuthByTPWallet extends React.Component {

  componentDidMount () {
    const _props = this.props
    const address = storage.wallet.getUnlockedAddress()
    if (address) {
      Toast.loading('Loading configs...', 0, () => {
        Toast.success('Load complete !!!')
      }, false)
      const load = setInterval(async () => {
        if (window.TPWallet) {
          clearInterval(load)
          window.Wallet = new TPWallet(window.wallet)
          await window.Wallet.setConfigs()
          if (address.toLowerCase() !== window.Wallet.address.toLowerCase()) {
            storage.wallet.storeUnlockedAddress('tpwallet', window.Wallet.address)
            window.RELAY.account.register(window.Wallet.address)
          }
          _props.dispatch({type: 'sockets/unlocked'})
          _props.dispatch({
            type: 'settings/preferenceChange',
            payload: {language: window.Wallet.language, currency: window.Wallet.currency}
          })
          _props.dispatch({type: 'locales/setLocale', payload: {locale: window.Wallet.language}})
          Toast.hide()
          routeActions.gotoPath('/dex')
        }
      }, 1000)
    } else {
      const location = _props.location
      const language = location.search.replace(`?locale=`, '')
      _props.dispatch({type: 'locales/setLocale', payload: {locale: language}})
    }
  }

  goToDex = () => {
    Toast.loading('Loading configs...', 0, () => {
      Toast.success('Load complete !!!')
    }, false)
    const _props = this.props
    const load = setInterval(() => {
      if (window.TPWallet) {
        clearInterval(load)
        window.Wallet = new TPWallet(window.TPWallet)
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

    },1000)

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
              <div className="color-black-1 fs20 pt20 pb20">{intl.get("imtoken.welcome")}</div>
              <div className="color-black-2 fs14 pl20 pr20">
                {intl.get("imtoken.description_1")}
                <a onClick={() => routeActions.gotoPath('/auth/terms')} className="text-primary"> {intl.get("imtoken.description_2")} </a> {intl.get("imtoken.description_3")} <a
                onClick={() => routeActions.gotoPath('/auth/privacy')} className="text-primary"> {intl.get("imtoken.description_4")} </a>
                。
              </div>
              <Button className="m20" type="primary" onClick={this.goToDex}>{intl.get("imtoken.agree")}</Button>
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
