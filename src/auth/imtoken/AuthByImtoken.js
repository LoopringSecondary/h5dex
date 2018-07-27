import React from 'react'
import Imtoken from './Imtoken'
import { Icon as WebIcon } from 'antd'
import { Toast, Button, NavBar, Modal } from 'antd-mobile'
import routeActions from 'common/utils/routeActions'
import { connect } from 'dva'
import storage from 'modules/storage'

class AuthByImtoken extends React.Component {

  componentWillMount () {
    console.log('this.props',this.props)
    const address = storage.wallet.getUnlockedAddress()
    if (address) {
      Toast.loading('Loading configs...', 0, () => {
        Toast.success('Load complete !!!')
      },false)
      const _props = this.props
      const handler = () => {
        // Modal.alert('handler 1')
        window.removeEventListener('sdkReady',handler)
        window.Wallet = new Imtoken(window.imToken)
        // Modal.alert('handler 2')
        window.Wallet.setConfigs().then(res => {
          if(!window.Wallet.currency){ window.Wallet.currency = 'CNY'}
          if(!window.Wallet.language){ window.Wallet.language = 'zh-CN'}

          // Modal.alert('setConfigs res',res.address + ' - ' +res.language)
          if (address.toLowerCase() !== window.Wallet.address.toLowerCase()) {
            storage.wallet.storeUnlockedAddress('imtoken', window.Wallet.address)
            window.RELAY.account.register(window.Wallet.address)
          }
          // Modal.alert('handler 3')
          _props.dispatch({type: 'sockets/unlocked'})
          // Modal.alert('handler 4')
          // const payload = {}
          // const pref = storage.settings.get().preference

          // if (pref.currency.toLowerCase() !== window.Wallet.currency.toLowerCase()) {
          //   payload.currency = window.Wallet.currency
          // }

          // if (pref.language.toLowerCase() !== window.Wallet.language.toLowerCase()) {
          //   payload.language = window.Wallet.language
          //   _props.dispatch({type: 'locales/setLocale', payload: {locale: window.Wallet.language}})
          // }
          // Modal.alert('handler 5')
          // if(payload.currency || payload.language){
          //   _props.dispatch({type: 'settings/preferenceChange', payload})
          // }
          // Modal.alert('handler 6')
          Toast.hide()
          routeActions.gotoPath('/dex')
        })
      }

      if (window.imToken) {
        // Modal.alert('handler start : imtoken  exsits')
        handler()
      } else {
        // Modal.alert('handler start :imtoken not exsits')
        window.addEventListener('sdkReady', handler)
      }
    }
  }

  goToDex = () => {
    Toast.loading('Loading configs...', 0, () => {
      Toast.success('Load complete !!!')
    },false)
    const _props = this.props
    if (window.imToken) {
      window.Wallet = new Imtoken(window.imToken)
      window.Wallet.setConfigs().then(res => {
        if(!window.Wallet.currency){ window.Wallet.currency = 'CNY'}
        if(!window.Wallet.language){ window.Wallet.language = 'zh-CN'}
        storage.wallet.storeUnlockedAddress('imtoken', window.Wallet.address)
        window.RELAY.account.register(window.Wallet.address)
        _props.dispatch({
          type: 'settings/preferenceChange',
          payload: {language: window.Wallet.language, currency: window.Wallet.currency}
        })
        _props.dispatch({type: 'sockets/unlocked'})
        this.props.dispatch({type: 'locales/setLocale', payload: {locale: window.Wallet.language}})
        Toast.hide()
        routeActions.gotoPath('/dex')
      })
    } else {
      window.addEventListener('sdkReady', function () {
        window.Wallet = new Imtoken(window.imToken)
        window.Wallet.setConfigs().then(res => {
          if(!window.Wallet.currency){ window.Wallet.currency = 'CNY'}
          if(!window.Wallet.language){ window.Wallet.language = 'zh-CN'}
          storage.wallet.storeUnlockedAddress('imtoken', window.Wallet.address)
          window.RELAY.account.register(window.Wallet.address)
          _props.dispatch({
            type: 'settings/preferenceChange',
            payload: {language: window.Wallet.language, currency: window.Wallet.currency}
          })
          _props.dispatch({type: 'sockets/unlocked'})
          this.props.dispatch({type: 'locales/setLocale', payload: {locale: window.Wallet.language}})
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
              <div className="color-black-1 fs20 pt20 pb20">欢迎来到 路印 去中心化交易所</div>
              <div className="color-black-2 fs14 pl20 pr20">
                您即将进入的dApp是一个运行在以太坊区块链上去中心化交易所。
                通过点击"我同意"，即表示您同意我们的
                <a onClick={() => routeActions.gotoPath('/auth/terms')} className="text-primary"> 用户服务协议 </a> 和 <a
                onClick={() => routeActions.gotoPath('/auth/privacy')} className="text-primary"> 用户隐私政策 </a>
                。
              </div>
              <Button className="m20" type="primary" onClick={this.goToDex}>我同意</Button>
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
