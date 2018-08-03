import React from 'react'
import Imtoken from './Imtoken'
import { Icon as WebIcon } from 'antd'
import { Toast, Button, NavBar, Modal } from 'antd-mobile'
import routeActions from 'common/utils/routeActions'
import { connect } from 'dva'
import storage from 'modules/storage'
import intl from 'react-intl-universal'

class AuthByImtoken extends React.Component {

  componentDidMount () {
    const _props = this.props
    const address = storage.wallet.getUnlockedAddress()
    if (address) {
      Toast.loading('Loading configs...', 0, () => {
        Toast.success('Load complete !!!')
      }, false)
      const handler = async () => {
        window.removeEventListener('sdkReady', handler)
        window.Wallet = new Imtoken(window.imToken)
        await window.Wallet.setConfigs()
        if (address.toLowerCase() !== window.Wallet.address.toLowerCase()) {
          storage.wallet.storeUnlockedAddress('imtoken', window.Wallet.address)
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
      // Modal.alert('handler start :imtoken not exsits')
      // window.addEventListener('sdkReady', handler)
      setTimeout(() => {
        if (window.imToken) {
          handler()
        } else {
          window.addEventListener('sdkReady', handler)
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
    if (window.imToken) {
      window.Wallet = new Imtoken(window.imToken)
      window.Wallet.setConfigs().then(res => {
        if (!window.Wallet.currency) { window.Wallet.currency = 'CNY'}
        if (!window.Wallet.language) { window.Wallet.language = 'zh-CN'}
        storage.wallet.storeUnlockedAddress('imtoken', window.Wallet.address)
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
    } else {
      window.addEventListener('sdkReady', function () {
        window.Wallet = new Imtoken(window.imToken)
        window.Wallet.setConfigs().then(res => {
          if (!window.Wallet.currency) { window.Wallet.currency = 'CNY'}
          if (!window.Wallet.language) { window.Wallet.language = 'zh-CN'}
          storage.wallet.storeUnlockedAddress('imtoken', window.Wallet.address)
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
      })
    }

  }
  goToFace2Face = () => {
    routeActions.gotoPath('/face2face')
  }

  render () {
    const address = storage.wallet.getUnlockedAddress()

    return (
      <div>
        {
          false &&
          <NavBar
            className=""
            mode="light"
            leftContent={null && [
              <span onClick={() => {}} className="color-black-1" key="1"><WebIcon type="left"/></span>,
            ]}
            rightContent={null && [
              <span className="color-black-1" key="1" onClick={() => {}}><WebIcon type="question-circle-o"/></span>
            ]}
          >
          </NavBar>
        }
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

export default connect()(AuthByImtoken)
