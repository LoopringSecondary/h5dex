import React from 'react'
import Mock from './mock'
import {Icon as WebIcon} from 'antd'
import {Toast, Button,NavBar} from 'antd-mobile'
import routeActions from 'common/utils/routeActions'
import {connect} from 'dva'

class AuthByMock extends React.Component {
  componentDidMount () {
    Toast.loading('Loading configs...', 0, () => {
      Toast.success('Load complete !!!')
    })
    const _props = this.props
    window.Wallet = new Mock()
    window.Wallet.setConfigs().then(res => {
      console.log('after setConfigs',window.Wallet)
      let language = 'en-US'
      let currency = 'USD'
      if(window.Wallet.language.indexOf('zh')){
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
            Auth By Mock
          </div>
        </NavBar>
        <div className="p15">
          <Button type="primary"  onClick={this.goToDex}>进入DEX</Button>
          <Button type="primary"  onClick={this.goToFace2Face}>Face2Face</Button>
        </div>
      </div>
    )
  }

}

export default connect()(AuthByMock)
