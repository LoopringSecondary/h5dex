import React from 'react'
import Imtoken from './Imtoken'
import {Icon as WebIcon} from 'antd'
import {Toast, Button,NavBar} from 'antd-mobile'
import routeActions from 'common/utils/routeActions'
import {connect} from 'dva'

class AuthByImtoken extends React.Component {

  componentDidMount () {
    Toast.loading('Loading configs...', 0, () => {
      Toast.success('Load complete !!!')
    })
    const _props = this.props
    if (window.imToken) {
      window.Wallet = new Imtoken(window.imToken)
      window.Wallet.setConfigs().then(res => {
        let language = 'en-US'
        let currency = 'USD'
        if(window.Wallet.language.indexOf('zh') !== -1){
          language = 'zh-CN'
        }
        if(window.Wallet.currency === 'CNY'){
          currency = 'CNY'
        }
        _props.dispatch({type:'locales/setLocale', payload:{locale:language}});
        _props.dispatch({type:'settings/preferenceChange',payload:{language,currency}})
        _props.dispatch({type: 'sockets/unlocked'});
        Toast.hide()
      })
    } else {
      window.addEventListener('sdkReady', function () {
        window.Wallet = new Imtoken(window.imToken)
        window.Wallet.setConfigs().then(res => {
          let language = 'en-US'
          let currency = 'USD'
          if(window.Wallet.language.indexOf('zh') !== -1){
            language = 'zh-CN'
          }
          if(window.Wallet.currency === 'CNY'){
            currency = 'CNY'
          }
          _props.dispatch({type:'locales/setLocale', payload:{locale:language}});
          _props.dispatch({type:'settings/preferenceChange',payload:{language,currency}})
          _props.dispatch({type: 'sockets/unlocked'});
         Toast.hide()
        })
      })
    }
  }

  goToDex = () => {
    routeActions.gotoPath('/dex');
  }
  goToFace2Face = () => {
    routeActions.gotoPath('/face2face');
  }
  render () {
    return (
      <div>
        <NavBar
          className=""
          mode="light"
          leftContent={null &&[
            <span onClick={()=>{}} className="color-black-1" key="1"><WebIcon type="left" /></span>,
          ]}
          rightContent={null && [
            <span className="color-black-1" key="1"  onClick={()=>{}}><WebIcon type="question-circle-o" /></span>
          ]}
        >
          <div>
            Auth By Imtoken
          </div>
        </NavBar>
        <div className="p15"></div>
        <Button type="primary"  onClick={this.goToDex}>进入DEX</Button>
        <Button type="primary"  onClick={this.goToFace2Face}>Face2Face</Button>
      </div>
    )
  }

}

export default connect()(AuthByImtoken)
